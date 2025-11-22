export interface GithubProject {
  name: string;
  description: string | null;
  html_url: string;
  languages: string[]; // updated
  topics: string[];
  created_at: string;
  updated_at: string;
}

export async function fetchGithubProjects(username: string): Promise<GithubProject[]> {
  const response = await fetch(`https://api.github.com/users/${username}/repos`, {
    headers: {
      Accept: "application/vnd.github+json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch projects for user ${username}`);
  }

  const repos = await response.json();

  // Fetch languages for each repo
  const projects = await Promise.all(
    repos.map(async (repo: any) => {
      const langRes = await fetch(repo.languages_url);
      const langData = langRes.ok ? await langRes.json() : {};

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
