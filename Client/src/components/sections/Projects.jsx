import { useEffect, useState } from "react";
import SectionHeading from "../ui/SectionHeading";
import ProjectCard from "../ui/ProjectCard";
import FadeContent from "../../reactbits/FadeContent";
import { getProjects } from "../../api/api";

const hardcodedProjects = [
  {
    id: 1,
    title: "Bank Account Management API",
    description: "A financial systems API built with Event Sourcing and CQRS, featuring immutable event logs, projection rebuilds, snapshotting, idempotent transactions, and time-travel balance queries.",
    techstack: ["Node.js", "Express.js", "PostgreSQL", "CQRS", "Event Sourcing"],
    github_link: "https://github.com/maharshi0143/Bank-Account-Management-API",
  },
  {
    id: 2,
    title: "Library Management API",
    description: "A RESTful backend for library operations with complete CRUD flows, borrowing and return tracking, automated overdue fine calculation, and state-machine-driven book lifecycle management.",
    techstack: ["Node.js", "Express.js", "PostgreSQL", "REST API", "Business Rules"],
    github_link: "https://github.com/maharshi0143/Library-Management-API",
  },
  {
    id: 3,
    title: "Local LLM Chatbot",
    description: "An offline customer support chatbot workflow using Ollama and Llama 3.2 (3B), designed to compare zero-shot and one-shot prompting while logging responses for structured evaluation.",
    techstack: ["Python", "Ollama", "Llama 3.2", "Prompt Engineering", "Evaluation"],
    github_link: "https://github.com/maharshi0143/local-llm-chatbot",
  },
];

const Projects = () => {
  const [projects, setProjects] = useState(hardcodedProjects);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await getProjects();
        if (response.data && response.data.length > 0) {
          setProjects(response.data);
        }
      } catch (error) {
        console.log("Using hardcoded projects");
      }
    };
    fetchProjects();
  }, []);

  return (
    <section className="relative z-10 w-full min-h-screen py-24 px-8 md:px-20 pointer-events-auto" id="projects">
      <SectionHeading
        title="My"
        highlight="Projects"
        subtitle="Work shaped by engineering discipline and research thinking."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        {projects.map((project, i) => (
          <FadeContent key={project.id || i} delay={i * 0.1}>
            <ProjectCard project={project} />
          </FadeContent>
        ))}
      </div>
    </section>
  );
};

export default Projects;
