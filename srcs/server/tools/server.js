const Fastify = require('fastify');
const { Octokit } = require('octokit');
const fastifyMongo = require('@fastify/mongodb');

const fastify = Fastify({ logger: true });

// 1. Register MongoDB Plugin
fastify.register(fastifyMongo, {
  forceClose: true,
  url: process.env.MONGO_URI
});

// 2. Initialize Octokit
const octokit = new Octokit({ 
  auth: process.env.GH_TOKEN 
});

// Helper function to fetch README safely
async function getReadmeContent(owner, repo) {
  try {
    const { data } = await octokit.rest.repos.getReadme({
      owner,
      repo,
    });
    
    // GitHub API returns content in Base64, we must decode it
    return Buffer.from(data.content, 'base64').toString('utf-8');
  } catch (error) {
    // If 404, the repo has no README. Return null.
    if (error.status === 404) return null;
    throw error;
  }
}

// 3. Define the Sync Route
fastify.get('/sync', async (request, reply) => {
	const client = fastify.mongo.client;
	const db = client.db("gh-repos");
  	const collection = db.collection('repositories');

	if (!collection)
	{
		console.log("no collection found");
		return;
	}
  
  request.log.info('Starting GitHub sync...');

  try {
    // A. Fetch ALL repositories (handles pagination automatically)
    // Change 'listForAuthenticatedUser' to 'listForOrg' if you need an org's repos
    const repos = await octokit.paginate(octokit.rest.repos.listForAuthenticatedUser, {
      per_page: 100, // Maximize page size to reduce requests
      type: 'owner'
    });

    request.log.info(`Found ${repos.length} repositories. Fetching READMEs...`);

    // B. Prepare data (Fetch Readmes)
    // We process in parallel, but be careful with rate limits if you have 1000+ repos
    const processedData = await Promise.all(repos.map(async (repo) => {
      const readme = await getReadmeContent(repo.owner.login, repo.name);

      return {
        github_id: repo.id,
        name: repo.name,
        full_name: repo.full_name,
        description: repo.description,
        url: repo.html_url,
        language: repo.language,
        stars: repo.stargazers_count,
        readme: readme || "NO_README_FOUND",
        last_synced: new Date()
      };
    }));

    // C. Save to MongoDB using bulkWrite (Upsert)
    // This ensures we update existing docs instead of creating duplicates
    if (processedData.length > 0) {
      const bulkOps = processedData.map(doc => ({
        updateOne: {
          filter: { github_id: doc.github_id },
          update: { $set: doc },
          upsert: true
        }
      }));

      const result = await collection.bulkWrite(bulkOps);
      request.log.info(`Sync complete. Matched: ${result.matchedCount}, Modified: ${result.modifiedCount}, Upserted: ${result.upsertedCount}`);
      
      return { 
        status: 'success', 
        message: `Synced ${processedData.length} repositories`,
        db_result: result
      };
    } else {
      return { status: 'success', message: 'No repositories found to sync.' };
    }

  } catch (err) {
    request.log.error(err);
    reply.code(500).send({ error: 'Failed to sync repositories', details: err.message });
  }
});

fastify.get('/repos', async (request, reply) => {
  try {
    const collection = fastify.mongo.client.db('gh-repos').collection('repositories');

    const data = await collection.find({}).toArray();
    
    return {
      count: data.length,
      data: data
    };
  } catch (err) {
    request.log.error(err);
    return reply.code(500).send({ error: 'Could not fetch repositories' });
  }
});

// Run the server
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();