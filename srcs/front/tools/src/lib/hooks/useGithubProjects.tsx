import { useEffect, useState } from "react";
import { fetchGithubProjects } from "../_utils/fetchGithub";
import type { GithubProject } from "../_utils/fetchGithub";




export function useGithubProjects(username: string)
{
    const [projects, setProjects] = useState<GithubProject[]>([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        fetchGithubProjects(username)
        .then(setProjects)
        .catch(console.error)
        .finally(() => setLoading(false));
    }, [username]);

    return { projects, loading}
}