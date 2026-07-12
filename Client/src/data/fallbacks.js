export const fallbackSkills = [
  { id: 1, name: "HTML", icon: "html5-plain colored" },
  { id: 2, name: "CSS", icon: "css3-plain colored" },
  { id: 3, name: "JavaScript", icon: "javascript-plain colored" },
  { id: 4, name: "React.js", icon: "react-original colored" },
  { id: 5, name: "Node.js", icon: "nodejs-plain colored" },
  { id: 6, name: "Express.js", icon: "express-original" },
  { id: 7, name: "PostgreSQL", icon: "postgresql-plain colored" },
  { id: 8, name: "MongoDB", icon: "mongodb-plain colored" },
  { id: 9, name: "Python", icon: "python-plain colored" },
  { id: 10, name: "TensorFlow", icon: "tensorflow-original colored" },
  { id: 11, name: "PyTorch", icon: "pytorch-original" },
  { id: 12, name: "Git", icon: "git-plain colored" },
  { id: 13, name: "Docker", icon: "docker-plain colored" },
  { id: 14, name: "Java", icon: "java-plain colored" },
  { id: 15, name: "LLMs", icon: "python-plain colored" },
  { id: 16, name: "REST APIs", icon: "nodejs-plain colored" },
];

export const fallbackExperiences = [
  {
    id: 1,
    title: "AI Research Intern",
    duration: "May 2026 — June 2026",
    highlights: [
      "Designed and built a domain-specific question-answering system over internal documents using NLP pipelines and retrieval strategies",
      "Implemented data preprocessing, chunking, and embedding workflows that reduced response latency while maintaining accuracy",
      "Ran baseline experiments across multiple prompting strategies, documented findings, and presented results to stakeholders",
    ],
  },
  {
    id: 2,
    title: "Gen AI Intern",
    duration: "May 2025 — June 2025",
    highlights: [
      "Developed and tested prompt templates for LLM-driven features, building evaluation sets to measure response quality systematically",
      "Collaborated with engineering team to integrate a retrieval-augmented generation (RAG) workflow into the existing product pipeline",
      "Contributed to improving response relevance by iteratively refining prompts based on domain-specific evaluation criteria",
    ],
  },
];

export const fallbackProjects = [
  {
    id: 1,
    title: "Bank Account Management API",
    description:
      "A financial systems API built with Event Sourcing and CQRS, featuring immutable event logs, projection rebuilds, snapshotting, and time-travel balance queries.",
    techstack: ["Node.js", "Express.js", "PostgreSQL", "CQRS", "Event Sourcing"],
    github_link: "https://github.com/maharshi0143/Bank-Account-Management-API",
  },
  {
    id: 2,
    title: "Library Management API",
    description:
      "A RESTful backend for library operations with CRUD flows, borrowing tracking, automated overdue fine calculation, and state-machine-driven book lifecycle.",
    techstack: ["Node.js", "Express.js", "PostgreSQL", "REST API"],
    github_link: "https://github.com/maharshi0143/Library-Management-API",
  },
  {
    id: 3,
    title: "Local LLM Chatbot",
    description:
      "An offline customer support chatbot using Ollama and Llama 3.2 (3B), comparing zero-shot and one-shot prompting while logging responses for evaluation.",
    techstack: ["Python", "Ollama", "Llama 3.2", "Prompt Engineering"],
    github_link: "https://github.com/maharshi0143/local-llm-chatbot",
  },
];
