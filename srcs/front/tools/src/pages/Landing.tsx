import { Card, CardHeader, CardTitle, CardContent } from "../components/Card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useGithubProjects } from "../lib/hooks/useGithubProjects";
import { Loading } from "../components/Loading";
import type { GithubProject } from "@/lib/_utils/fetchGithub";
import { useState } from "react";


export default function LandingPage() {
  const { projects, loading } = useGithubProjects("santizabe");

  const [selectedProject, setSelectedProject] = useState<GithubProject>();
  const [readme, setReadme] = useState("");
  const [structure, setStructure] = useState([]);
  const [modalLoading, setModalLoading] = useState(false);

  async function handleSelectProject(project: GithubProject) {
    setSelectedProject(project);
    setModalLoading(true);

    try {
      // Fetch README
      const readmeRes = await fetch(
        `https://api.github.com/repos/${project.full_name}/readme`
      );
      if (readmeRes.ok) {
        const readmeData = await readmeRes.json();
        const decoded = atob(readmeData.content || "");
        setReadme(decoded);
      }

      // Fetch file structure
      const structureRes = await fetch(
        `https://api.github.com/repos/${project.full_name}/contents`
      );
      if (structureRes.ok) {
        const structureData = await structureRes.json();
        setStructure(structureData);
      }
    } catch (err) {
      console.error(err);
    }

    setModalLoading(false);
  }
  return (
    <>
      <div className="min-h-screen bg-gray-50 flex flex-col items-center py-16 px-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-10 text-gray-800"
        >
          My Projects
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card className="rounded-2xl shadow-md hover:shadow-lg transition-all"
			  	onClick={() => handleSelectProject(project)}>
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-gray-900">
                    {project.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.languages.map((lang: any, idx: any) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-gray-200 text-sm rounded-full text-gray-700"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        {/* Modal */}
        <Dialog
          open={!!selectedProject}
          onOpenChange={() => setSelectedProject(null)}
        >
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedProject?.name}</DialogTitle>
            </DialogHeader>

            <h3 className="text-lg font-semibold mt-4">Project Structure</h3>
            <ul className="bg-gray-100 p-4 rounded-lg text-sm mb-4">
              {structure.map((item) => (
                <li key={item.path}>
                  {item.type === "dir" ? "📁" : "📄"} {item.name}
                </li>
              ))}
            </ul>

            <h3 className="text-lg font-semibold mt-4">README</h3>
            <pre className="bg-gray-900 text-gray-200 p-4 rounded-lg text-sm whitespace-pre-wrap">
              {readme}
            </pre>

            <DialogFooter className="flex gap-3 mt-4">
              {selectedProject?.homepage && (
                <Button asChild>
                  <a
                    href={selectedProject.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit Website
                  </a>
                </Button>
              )}

              <Button asChild variant="secondary">
                <a
                  href={selectedProject?.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Repo
                </a>
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      {loading && <Loading message="Loading projects..." />}
    </>
  );
}
