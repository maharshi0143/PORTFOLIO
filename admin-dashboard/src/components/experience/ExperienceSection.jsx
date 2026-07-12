import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Modal from "../ui/Modal";
import Toast from "../ui/Toast";
import FadeContent from "../../reactbits/FadeContent";
import { getExperiences, createExperience, updateExperience, deleteExperience } from "../../api/api";

const ExperienceSection = () => {
  const [experiences, setExperiences] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [toast, setToast] = useState(null);
  const [form, setForm] = useState({ title: "", duration: "", description: "" });

  const fetchExperiences = async () => {
    try {
      const res = await getExperiences();
      setExperiences(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => { fetchExperiences(); }, []);

  const openModal = (exp = null) => {
    if (exp) {
      setEditingId(exp.id);
      setForm({ title: exp.title, duration: exp.duration, description: exp.description });
    } else {
      setEditingId(null);
      setForm({ title: "", duration: "", description: "" });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateExperience(editingId, form);
        setToast({ message: "Experience updated!", type: "success" });
      } else {
        await createExperience(form);
        setToast({ message: "Experience created!", type: "success" });
      }
      setIsModalOpen(false);
      fetchExperiences();
    } catch (error) {
      setToast({ message: "Something went wrong", type: "error" });
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this experience?")) return;
    try {
      await deleteExperience(id);
      setToast({ message: "Experience deleted!", type: "success" });
      fetchExperiences();
    } catch (error) {
      setToast({ message: "Failed to delete", type: "error" });
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5 mb-9">
        <div>
          <h2 className="text-[34px] font-bold text-white mb-2">Experience Management</h2>
          <p className="text-[#bdbdbd] text-sm">Manage your experience entries</p>
        </div>
        <motion.button
          onClick={() => openModal()}
          className="py-3.5 px-5 rounded-[14px] bg-gradient-to-br from-primary to-accent text-white font-bold text-[15px] cursor-pointer border-none flex items-center gap-2.5"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <i className="fa-solid fa-plus" /> Add Experience
        </motion.button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
        {experiences.map((exp, i) => (
          <FadeContent key={exp.id} delay={i * 0.08}>
            <motion.div
              className="bg-white/[0.05] border border-white/[0.08] rounded-3xl p-6 max-w-[420px] w-full"
              whileHover={{ y: -6, borderColor: "rgba(255,62,0,0.3)" }}
            >
              <h3 className="text-xl font-bold text-white mb-2">{exp.title}</h3>
              <p className="text-[#cfcfcf] text-sm mb-3">{exp.duration}</p>
              <p className="text-[#cfcfcf] leading-relaxed text-sm mb-5">{exp.description}</p>
              <div className="flex gap-3">
                <button
                  onClick={() => openModal(exp)}
                  className="flex-1 py-3 rounded-xl bg-[#2563eb] text-white font-bold text-sm cursor-pointer border-none"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(exp.id)}
                  className="flex-1 py-3 rounded-xl bg-crimson text-white font-bold text-sm cursor-pointer border-none"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </FadeContent>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingId ? "Update Experience" : "Add Experience"}>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
            className="w-full p-4 rounded-[14px] border border-white/[0.08] bg-white/[0.05] text-white text-[15px] outline-none"
          />
          <input
            type="text"
            placeholder="Duration (e.g. May 2025 - June 2025)"
            value={form.duration}
            onChange={(e) => setForm({ ...form, duration: e.target.value })}
            required
            className="w-full p-4 rounded-[14px] border border-white/[0.08] bg-white/[0.05] text-white text-[15px] outline-none"
          />
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
            className="w-full p-4 rounded-[14px] border border-white/[0.08] bg-white/[0.05] text-white text-[15px] outline-none min-h-[140px] resize-none"
          />
          <motion.button
            type="submit"
            className="w-full py-4 rounded-[14px] bg-gradient-to-br from-primary to-accent text-white text-base font-bold cursor-pointer border-none"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {editingId ? "Update Experience" : "Save Experience"}
          </motion.button>
        </form>
      </Modal>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};

export default ExperienceSection;
