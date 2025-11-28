export interface GithubProject {
  _id: string,
  github_id: Number,
  description: string | null,
  full_name: string,
  language: string | null,
  last_synced: string,
  name: string,
  readme: string,
  stars: number,
  url: string
}

export interface GhResponse {
	count: number,
	data: Array<Object>
}

export async function fetchGithubProjects(username: string): Promise<GhResponse[]> {
  const response = await fetch(`http://localhost:3000/repos`, {
    headers: {
      Accept: "application/vnd.github+json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch projects for user ${username}`);
  }

  const data = await response.json();

  // Fetch languages for each repo
  const projects = await Promise.all(
    data?.data.map(async (repo: any) => {

      return {
        name: repo.name,
        description: repo.description,
        html_url: repo.html_url,
        languages: Object.keys(langData), // convert to array
        topics: repo.topics ?? [],
        created_at: repo.created_at,
        updated_at: repo.updated_at,
      };
    })
  );

  return projects;
}
