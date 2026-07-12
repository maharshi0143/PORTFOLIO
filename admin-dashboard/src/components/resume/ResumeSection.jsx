import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Toast from "../ui/Toast";
import FadeContent from "../../reactbits/FadeContent";
import { getResume, updateResume } from "../../api/api";

const ResumeSection = () => {
  const [resumeUrl, setResumeUrl] = useState("");
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const loadResume = async () => {
      try {
        const res = await getResume();
        if (res.data?.resume_url) {
          setResumeUrl(res.data.resume_url);
        }
      } catch (error) {
        console.log(error);
      }
    };
    loadResume();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateResume(resumeUrl);
      setToast({ message: "Resume updated!", type: "success" });
    } catch (error) {
      setToast({ message: "Failed to update", type: "error" });
    }
  };

  return (
    <div>
      <div className="mb-9">
        <h2 className="text-[34px] font-bold text-white mb-2">Resume Management</h2>
        <p className="text-[#bdbdbd] text-sm">Update your resume link</p>
      </div>

      <FadeContent>
        <div className="bg-white/[0.05] border border-white/[0.08] rounded-3xl p-7 max-w-[700px]">
          <p className="text-[#cfcfcf] mb-4">
            Current resume:{" "}
            {resumeUrl ? (
              <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="text-accent no-underline">
                View
              </a>
            ) : (
              <span className="text-[#9f9f9f]">No resume set</span>
            )}
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Resume URL"
              value={resumeUrl}
              onChange={(e) => setResumeUrl(e.target.value)}
              required
              className="w-full p-4 rounded-[14px] border border-white/[0.08] bg-white/[0.05] text-white text-[15px] outline-none"
            />
            <motion.button
              type="submit"
              className="w-full py-4 rounded-[14px] bg-gradient-to-br from-primary to-accent text-white text-base font-bold cursor-pointer border-none"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Save Resume
            </motion.button>
          </form>
        </div>
      </FadeContent>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};

export default ResumeSection;
