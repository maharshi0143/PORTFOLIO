import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./components/auth/LoginPage";
import DashboardLayout from "./components/layout/DashboardLayout";
import DashboardOverview from "./components/dashboard/DashboardOverview";
import ProjectsSection from "./components/projects/ProjectsSection";
import SkillsSection from "./components/skills/SkillsSection";
import ExperienceSection from "./components/experience/ExperienceSection";
import ResumeSection from "./components/resume/ResumeSection";
import MessagesSection from "./components/messages/MessagesSection";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/admin/login" replace />} />
      <Route path="/admin/login" element={<LoginPage />} />
      <Route path="/admin/dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardOverview />} />
        <Route path="projects" element={<ProjectsSection />} />
        <Route path="skills" element={<SkillsSection />} />
        <Route path="experience" element={<ExperienceSection />} />
        <Route path="resume" element={<ResumeSection />} />
        <Route path="messages" element={<MessagesSection />} />
      </Route>
      <Route path="*" element={<Navigate to="/admin/login" replace />} />
    </Routes>
  );
}

export default App;
