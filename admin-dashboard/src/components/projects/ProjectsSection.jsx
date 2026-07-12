import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Modal from "../ui/Modal";
import Toast from "../ui/Toast";
import FadeContent from "../../reactbits/FadeContent";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../../api/api";

const ProjectsSection = () => {
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [toast, setToast] = useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    tech: "",
    github: "",
    live: "",
    image: "",
  });

  const fetchProjects = async () => {
    try {
      const res = await getProjects();
      setProjects(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const openModal = (project = null) => {
    if (project) {
      setEditingId(project.id);
      setForm({
        title: project.title,
        description: project.description,
        tech: (project.techstack || []).join(","),
        github: project.github_link || "",
        live: project.live_link || "",
        image: project.image_url || "",
      });
    } else {
      setEditingId(null);
      setForm({ title: "", description: "", tech: "", github: "", live: "", image: "" });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      title: form.title,
      description: form.description,
      techstack: form.tech.split(",").map((s) => s.trim()).filter(Boolean),
      github_link: form.github,
      live_link: form.live,
      image_url: form.image,
    };

    try {
      if (editingId) {
        await updateProject(editingId, data);
        setToast({ message: "Project updated!", type: "success" });
      } else {
        await createProject(data);
        setToast({ message: "Project created!", type: "success" });
      }
      setIsModalOpen(false);
      fetchProjects();
    } catch (error) {
      setToast({ message: "Something went wrong", type: "error" });
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this project?")) return;
    try {
      await deleteProject(id);
      setToast({ message: "Project deleted!", type: "success" });
      fetchProjects();
    } catch (error) {
      setToast({ message: "Failed to delete", type: "error" });
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5 mb-9">
        <div>
          <h2 className="text-[34px] font-bold text-white mb-2">Projects Management</h2>
          <p className="text-[#bdbdbd] text-sm">Manage all your projects dynamically</p>
        </div>
        <motion.button
          onClick={() => openModal()}
          className="py-3.5 px-5 rounded-[14px] bg-gradient-to-br from-primary to-accent text-white font-bold text-[15px] cursor-pointer border-none flex items-center gap-2.5"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <i className="fa-solid fa-plus" /> Add Project
        </motion.button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
        {projects.map((project, i) => (
          <FadeContent key={project.id} delay={i * 0.08}>
            <motion.div
              className="bg-white/[0.05] border border-white/[0.08] rounded-3xl overflow-hidden max-w-[420px] w-full"
              whileHover={{ y: -6, borderColor: "rgba(255,62,0,0.3)" }}
            >
              {project.image_url && (
                <img src={project.image_url} alt={project.title} className="w-full h-52 object-cover" />
              )}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>
                <p className="text-[#cfcfcf] leading-relaxed text-sm mb-4 line-clamp-3">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {(project.techstack || []).map((tech, i) => (
                    <span key={i} className="px-3 py-1 text-xs rounded-full bg-primary/15 text-accent">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => openModal(project)}
                    className="flex-1 py-3 rounded-xl bg-[#2563eb] text-white font-bold text-sm cursor-pointer border-none"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="flex-1 py-3 rounded-xl bg-crimson text-white font-bold text-sm cursor-pointer border-none"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          </FadeContent>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingId ? "Update Project" : "Add Project"}>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Project Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
            className="w-full p-4 rounded-[14px] border border-white/[0.08] bg-white/[0.05] text-white text-[15px] outline-none"
          />
          <textarea
            placeholder="Project Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
            className="w-full p-4 rounded-[14px] border border-white/[0.08] bg-white/[0.05] text-white text-[15px] outline-none min-h-[140px] resize-none"
          />
          <input
            type="text"
            placeholder="Tech Stack (comma separated)"
            value={form.tech}
            onChange={(e) => setForm({ ...form, tech: e.target.value })}
            required
            className="w-full p-4 rounded-[14px] border border-white/[0.08] bg-white/[0.05] text-white text-[15px] outline-none"
          />
          <input
            type="text"
            placeholder="GitHub Link"
            value={form.github}
            onChange={(e) => setForm({ ...form, github: e.target.value })}
            className="w-full p-4 rounded-[14px] border border-white/[0.08] bg-white/[0.05] text-white text-[15px] outline-none"
          />
          <input
            type="text"
            placeholder="Live Link"
            value={form.live}
            onChange={(e) => setForm({ ...form, live: e.target.value })}
            className="w-full p-4 rounded-[14px] border border-white/[0.08] bg-white/[0.05] text-white text-[15px] outline-none"
          />
          <input
            type="text"
            placeholder="Image URL"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
            className="w-full p-4 rounded-[14px] border border-white/[0.08] bg-white/[0.05] text-white text-[15px] outline-none"
          />
          <motion.button
            type="submit"
            className="w-full py-4 rounded-[14px] bg-gradient-to-br from-primary to-accent text-white text-base font-bold cursor-pointer border-none"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {editingId ? "Update Project" : "Save Project"}
          </motion.button>
        </form>
      </Modal>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};

export default ProjectsSection;
