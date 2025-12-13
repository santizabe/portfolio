import { useEffect, useState } from "react";
import { fetchGithubProjects } from "../utils/fetchGithub";

const getRepoLanguages = async (projects: any[]) => {
    const result = [];
    
    for (const repo of projects) {
        const res = await fetch(repo.languages_url);
        const languages = await res.json();

        result.push({
        ...repo,
        languages
        });
    }

  return result;
}

export function useGithubProjects(username: string)
{
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        fetchGithubProjects(username)
        .then(async (repos) => {
            const res = await getRepoLanguages(repos);
            setProjects(res);
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }, [username]);

    return { projects, loading}
}