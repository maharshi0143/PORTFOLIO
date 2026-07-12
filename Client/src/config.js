export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export const personal = {
  name: "Maharshi",
  fullName: "Maharshi Denuvakonda",
  role: "Full Stack Developer",
  secondaryRole: "& AI Researcher",
  greeting: "Hey, I'm",
  description:
    "Full-stack developer and AI researcher building systems that are intelligent, reliable, and worth shipping.",
  email: "maharshi.dv.kld@gmail.com",
  location: "Andhra Pradesh, India",
  resumeUrl:
    "https://drive.google.com/file/d/1pcy_v5iHKDzZWoIUbRa7GcD-ZTapr_Nf/view?usp=sharing",
  resumeDownloadUrl:
    "https://drive.google.com/uc?export=download&id=1pcy_v5iHKDzZWoIUbRa7GcD-ZTapr_Nf",
  socials: [
    {
      label: "GitHub",
      url: "https://github.com/maharshi0143",
      icon: "github",
    },
    {
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/denuvakonda-maharshi-4a6195292/",
      icon: "linkedin",
    },
    {
      label: "LeetCode",
      url: "https://leetcode.com/u/Maharshi_dv/",
      icon: "code",
    },
  ],
  education: {
    school: "Aditya University",
    degree: "B.Tech in AI & Machine Learning",
    period: "2024 — 2027",
    description:
      "Pursuing B.Tech in AI & ML at Aditya University with focus on applied machine learning, systems design, and production engineering.",
  },
  strengths: [
    "Ship full-stack features end-to-end — React frontends, Node/Express backends, and PostgreSQL/MongoDB data layers",
    "Apply AI/ML research to real product problems, not just notebooks",
    "Write clean architecture and iterate fast without cutting corners",
  ],
  exploring:
    "Agentic workflows, LLM evaluation, RAG systems, Intelligent automation, Developer tooling that scales",
  currentWork: {
    title: "Project Genesis AI Labs",
    role: "AI/ML Research Collaborator",
    bullets: [
      "Applied AI/ML research & prototyping",
      "Evaluation-driven workflows for LLMs",
      "Automation & intelligent tooling",
    ],
  },
  heroTechNodes: [
    "React",
    "Node.js",
    "Python",
    "PostgreSQL",
    "TypeScript",
    "Docker",
  ],
  navLinks: [
    { label: "Home", href: "home" },
    { label: "About", href: "about" },
    { label: "Skills", href: "skills" },
    { label: "Experience", href: "experience" },
    { label: "Projects", href: "projects" },
    { label: "Contact", href: "contact" },
  ],
};
