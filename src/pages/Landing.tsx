import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../components/Card";
import { motion } from "framer-motion";
import { useGithubProjects } from "../lib/hooks/useGithubProjects";
import { Loading } from "../components/Loading";


export default function LandingPage() {
  const {projects, loading} = useGithubProjects("santizabe");
  console.log(projects);
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
              <Card className="rounded-2xl shadow-md hover:shadow-lg transition-all">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-gray-900">
                    {project.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {/* {project.media.endsWith(".mp4") ? (
                    <video
                      src={project.media}
                      controls
                      className="w-full h-48 rounded-lg object-cover mb-4"
                    />
                  ) : (
                    <img
                      src={project.media}
                      alt={project.title}
                      className="w-full h-48 rounded-lg object-cover mb-4"
                    />
                  )} */}

                  <div className="flex flex-wrap gap-2">
                    {Object.keys(project.languages).map((lang: any, idx: any) => (
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
      </div>
      {loading && <Loading message="Loading projects..." />}
    </>
  );
}
