import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Toast from "../ui/Toast";
import FadeContent from "../../reactbits/FadeContent";
import { getMessages, deleteMessage } from "../../api/api";

const MessagesSection = () => {
  const [messages, setMessages] = useState([]);
  const [toast, setToast] = useState(null);

  const fetchMessages = async () => {
    try {
      const res = await getMessages();
      setMessages(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => { fetchMessages(); }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this message?")) return;
    try {
      await deleteMessage(id);
      setToast({ message: "Message deleted!", type: "success" });
      fetchMessages();
    } catch (error) {
      setToast({ message: "Failed to delete", type: "error" });
    }
  };

  return (
    <div>
      <div className="mb-9">
        <h2 className="text-[34px] font-bold text-white mb-2">Messages Management</h2>
        <p className="text-[#bdbdbd] text-sm">Review and manage contact messages</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
        {messages.map((msg, i) => (
          <FadeContent key={msg.id} delay={i * 0.08}>
            <motion.div
              className="bg-white/[0.05] border border-white/[0.08] rounded-3xl p-6 max-w-[420px] w-full"
              whileHover={{ y: -6, borderColor: "rgba(255,62,0,0.3)" }}
            >
              <h4 className="text-xl font-bold text-white mb-2">{msg.name}</h4>
              <p className="text-[13px] text-[#9f9f9f] mb-2">{msg.email}</p>
              <p className="text-[#cfcfcf] leading-relaxed text-sm mb-3">{msg.message}</p>
              <p className="text-[13px] text-[#9f9f9f] mb-4">
                {msg.created_at ? new Date(msg.created_at).toLocaleString() : ""}
              </p>
              <motion.button
                onClick={() => handleDelete(msg.id)}
                className="w-full py-3 rounded-xl bg-crimson text-white font-bold text-sm cursor-pointer border-none"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Delete
              </motion.button>
            </motion.div>
          </FadeContent>
        ))}
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};

export default MessagesSection;
