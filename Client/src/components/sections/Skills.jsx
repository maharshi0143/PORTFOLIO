import { useEffect, useState } from "react";
import SectionHeading from "../ui/SectionHeading";
import SkillCard from "../ui/SkillCard";
import FadeContent from "../../reactbits/FadeContent";
import { getSkills } from "../../api/api";

const hardcodedSkills = [
  { id: 1, name: "HTML", icon: "html5-plain colored" },
  { id: 2, name: "CSS", icon: "css3-plain colored" },
  { id: 3, name: "JavaScript", icon: "javascript-plain colored" },
  { id: 4, name: "React.js", icon: "react-original colored" },
  { id: 5, name: "Node.js", icon: "nodejs-plain colored" },
  { id: 6, name: "Express.js", icon: "express-original" },
  { id: 7, name: "PostgreSQL", icon: "postgresql-plain colored" },
  { id: 8, name: "MongoDB", icon: "mongodb-plain colored" },
  { id: 9, name: "Machine Learning", icon: "python-plain colored" },
  { id: 10, name: "Deep Learning", icon: "tensorflow-original colored" },
  { id: 11, name: "PyTorch", icon: "pytorch-original" },
  { id: 12, name: "Git & GitHub", icon: "git-plain colored" },
  { id: 13, name: "Docker", icon: "docker-plain colored" },
  { id: 14, name: "LLMs", icon: "python-plain colored" },
  { id: 15, name: "Java", icon: "java-plain colored" },
  { id: 16, name: "Python3", icon: "python-plain colored" },
];

const Skills = () => {
  const [skills, setSkills] = useState(hardcodedSkills);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await getSkills();
        if (response.data && response.data.length > 0) {
          setSkills(response.data);
        }
      } catch (error) {
        console.log("Using hardcoded skills");
      }
    };
    fetchSkills();
  }, []);

  return (
    <section className="relative z-10 w-full min-h-screen py-24 px-8 md:px-20 pointer-events-auto" id="skills">
      <SectionHeading
        title="My"
        highlight="Skills"
        subtitle="Tools, frameworks, and research stacks I use to ship production-grade apps and AI systems."
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-7">
        {skills.map((skill, i) => (
          <FadeContent key={skill.id || i} delay={i * 0.05}>
            <SkillCard skill={skill} />
          </FadeContent>
        ))}
      </div>
    </section>
  );
};

export default Skills;
