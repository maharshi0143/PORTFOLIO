import { useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import queryClient from "./lib/queryClient";
import useScrollSpy from "./hooks/useScrollSpy";
import useMousePosition from "./hooks/useMousePosition";
import { personal } from "./config";

import SmoothScroll from "./components/layout/SmoothScroll";
import CustomCursor from "./components/layout/CustomCursor";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import SpaceBackground from "./components/background/SpaceBackground";
import AuroraGradient from "./components/background/AuroraGradient";
import NoiseOverlay from "./components/background/NoiseOverlay";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Skills from "./components/sections/Skills";
import Experience from "./components/sections/Experience";
import Projects from "./components/sections/Projects";
import Contact from "./components/sections/Contact";
import ProjectModal from "./components/sections/ProjectModal";

function SectionDivider() {
  return <div className="section-divider" />;
}

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);

  useScrollSpy(personal.navLinks.map((l) => l.href));
  useMousePosition();

  return (
    <QueryClientProvider client={queryClient}>
      <SmoothScroll>
        <CustomCursor />
        <SpaceBackground />
        <AuroraGradient />
        <NoiseOverlay />

        <Navbar />

        <main id="main">
          <Hero />
          <SectionDivider />
          <About />
          <SectionDivider />
          <Skills />
          <SectionDivider />
          <Experience />
          <SectionDivider />
          <Projects onOpenModal={setSelectedProject} />
          <SectionDivider />
          <Contact />
        </main>

        <Footer />

        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />

        <ToastContainer
          position="bottom-right"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
          theme="dark"
          toastStyle={{
            background: "#14141e",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "10px",
            fontSize: "13px",
          }}
        />
      </SmoothScroll>
    </QueryClientProvider>
  );
}
