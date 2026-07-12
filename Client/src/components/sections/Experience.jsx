import { useEffect, useState } from "react";
import SectionHeading from "../ui/SectionHeading";
import TimelineItem from "../ui/TimelineItem";
import { getExperiences } from "../../api/api";

const hardcodedExperiences = [
  {
    id: 1,
    title: "AI Research Intern at Project Genesis AI Labs Pvt. Ltd",
    duration: "May 2026 - June 2026",
    description:
      "Conducted applied research in NLP and built a question-answering prototype over domain documents. Designed a clean data pipeline, ran baseline experiments, and documented findings for stakeholder review. Tools: Python, PyTorch, Hugging Face, Git.",
  },
  {
    id: 2,
    title: "Gen AI Intern at BrainOVison",
    duration: "May 2025 - June 2025",
    description:
      "Built prompt templates and evaluation sets for LLM-driven features and summarized results for the team. Collaborated with engineers to integrate a retrieval workflow and improve response relevance. Tools: Python, LangChain, vector search, REST APIs.",
  },
];

const Experience = () => {
  const [experiences, setExperiences] = useState(hardcodedExperiences);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await getExperiences();
        if (response.data && response.data.length > 0) {
          setExperiences(response.data);
        }
      } catch (error) {
        console.log("Using hardcoded experiences");
      }
    };
    fetchExperiences();
  }, []);

  return (
    <section className="relative z-10 w-full min-h-screen py-24 px-8 md:px-20 pointer-events-auto" id="experience">
      <SectionHeading
        title="My"
        highlight="Experience"
        subtitle="My journey through internships, research, and projects in AI and software development."
      />

      <div className="relative max-w-[900px] mx-auto">
        <div className="absolute left-[22px] top-0 w-1 h-full bg-primary" />
        {experiences.map((exp, i) => (
          <TimelineItem key={exp.id || i} experience={exp} index={i} />
        ))}
      </div>
    </section>
  );
};

export default Experience;
