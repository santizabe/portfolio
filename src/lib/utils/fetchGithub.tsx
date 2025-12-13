import { Octokit } from "@octokit/core";
import { restEndpointMethods } from "@octokit/plugin-rest-endpoint-methods";


export async function fetchGithubProjects(username: string): Promise<any[]> {
  const MyOctokit = Octokit.plugin(restEndpointMethods);
  const octokit = new MyOctokit();

  const repos = await octokit.rest.repos.listForUser({
    type: "all",
    username
  });
  // console.log(repos);
  const projects = repos.data;
  return projects;
}
