import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Modal from "../ui/Modal";
import Toast from "../ui/Toast";
import FadeContent from "../../reactbits/FadeContent";
import { getSkills, createSkill, updateSkill, deleteSkill } from "../../api/api";

const buildIconClass = (icon) => {
  const value = (icon || "").trim();
  if (!value) return "devicon-code-plain colored";
  if (value.includes("devicon-") || value.includes("fa-")) return value;
  return `devicon-${value}-plain colored`;
};

const SkillsSection = () => {
  const [skills, setSkills] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [toast, setToast] = useState(null);
  const [form, setForm] = useState({ name: "", icon: "" });

  const fetchSkills = async () => {
    try {
      const res = await getSkills();
      setSkills(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => { fetchSkills(); }, []);

  const openModal = (skill = null) => {
    if (skill) {
      setEditingId(skill.id);
      setForm({ name: skill.name, icon: skill.icon });
    } else {
      setEditingId(null);
      setForm({ name: "", icon: "" });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateSkill(editingId, form);
        setToast({ message: "Skill updated!", type: "success" });
      } else {
        await createSkill(form);
        setToast({ message: "Skill created!", type: "success" });
      }
      setIsModalOpen(false);
      fetchSkills();
    } catch (error) {
      setToast({ message: "Something went wrong", type: "error" });
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this skill?")) return;
    try {
      await deleteSkill(id);
      setToast({ message: "Skill deleted!", type: "success" });
      fetchSkills();
    } catch (error) {
      setToast({ message: "Failed to delete", type: "error" });
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5 mb-9">
        <div>
          <h2 className="text-[34px] font-bold text-white mb-2">Skills Management</h2>
          <p className="text-[#bdbdbd] text-sm">Manage all your technical skills</p>
        </div>
        <motion.button
          onClick={() => openModal()}
          className="py-3.5 px-5 rounded-[14px] bg-gradient-to-br from-primary to-accent text-white font-bold text-[15px] cursor-pointer border-none flex items-center gap-2.5"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <i className="fa-solid fa-plus" /> Add Skill
        </motion.button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {skills.map((skill, i) => (
          <FadeContent key={skill.id} delay={i * 0.06}>
            <motion.div
              className="bg-white/[0.05] border border-white/[0.08] rounded-[22px] p-7 text-center max-w-[320px] w-full"
              whileHover={{ y: -6, borderColor: "rgba(255,62,0,0.3)" }}
            >
              <i className={`${buildIconClass(skill.icon)} text-[60px] text-accent mb-5 block`} />
              <h3 className="text-xl font-bold text-white mb-5">{skill.name}</h3>
              <div className="flex gap-3">
                <button
                  onClick={() => openModal(skill)}
                  className="flex-1 py-3 rounded-xl bg-[#2563eb] text-white font-bold text-sm cursor-pointer border-none"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(skill.id)}
                  className="flex-1 py-3 rounded-xl bg-crimson text-white font-bold text-sm cursor-pointer border-none"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </FadeContent>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingId ? "Update Skill" : "Add Skill"}>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Skill Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            className="w-full p-4 rounded-[14px] border border-white/[0.08] bg-white/[0.05] text-white text-[15px] outline-none"
          />
          <input
            type="text"
            placeholder="Skill Icon Class (e.g. react-original colored)"
            value={form.icon}
            onChange={(e) => setForm({ ...form, icon: e.target.value })}
            required
            className="w-full p-4 rounded-[14px] border border-white/[0.08] bg-white/[0.05] text-white text-[15px] outline-none"
          />
          <motion.button
            type="submit"
            className="w-full py-4 rounded-[14px] bg-gradient-to-br from-primary to-accent text-white text-base font-bold cursor-pointer border-none"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {editingId ? "Update Skill" : "Save Skill"}
          </motion.button>
        </form>
      </Modal>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};

export default SkillsSection;
