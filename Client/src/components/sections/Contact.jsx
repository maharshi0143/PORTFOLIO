import { useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "../ui/SectionHeading";
import GlassCard from "../ui/GlassCard";
import FadeContent from "../../reactbits/FadeContent";
import { sendContact } from "../../api/api";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, message } = form;

    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus("Please fill out all fields.");
      return;
    }

    if (!isValidEmail(email)) {
      setStatus("Please enter a valid email address.");
      return;
    }

    setSending(true);
    setStatus("Sending...");

    try {
      await sendContact({ name, email, message });
      setForm({ name: "", email: "", message: "" });
      setStatus("Message sent successfully!");
    } catch (error) {
      setStatus(error.response?.data?.error || "Failed to send message.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="relative z-10 w-full min-h-screen py-24 px-8 md:px-20 pointer-events-auto" id="contact">
      <SectionHeading
        title="Contact"
        highlight="Me"
        subtitle="Let's connect and build something amazing together."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <FadeContent delay={0.1}>
          <GlassCard className="p-10" hover={false}>
            <h2 className="text-3xl font-bold text-white mb-5">Get In Touch</h2>
            <p className="text-base text-gray-300 leading-relaxed mb-8">
              Feel free to reach out for collaborations, projects, or just a friendly conversation.
            </p>
            <div className="mb-8">
              <p className="text-base text-gray-300 mb-2">maharshi.dv.kld@gmail.com</p>
              <p className="text-base text-gray-300">Andhra Pradesh, India</p>
            </div>
            <div className="flex flex-wrap gap-3 mb-6">
              {[
                { label: "GitHub", url: "https://github.com/maharshi0143" },
                { label: "LinkedIn", url: "https://www.linkedin.com/in/denuvakonda-maharshi-4a6195292/" },
                { label: "LeetCode", url: "https://leetcode.com/u/Maharshi_dv/" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-primary text-white font-bold text-sm no-underline hover:bg-white hover:text-black transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://drive.google.com/file/d/1pcy_v5iHKDzZWoIUbRa7GcD-ZTapr_Nf/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-white/10 text-white font-bold text-sm no-underline hover:bg-primary transition-colors"
              >
                View Resume
              </a>
              <a
                href="https://drive.google.com/uc?export=download&id=1pcy_v5iHKDzZWoIUbRa7GcD-ZTapr_Nf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-white/10 text-white font-bold text-sm no-underline hover:bg-primary transition-colors"
              >
                Download Resume
              </a>
            </div>
          </GlassCard>
        </FadeContent>

        <FadeContent delay={0.3}>
          <GlassCard className="p-10" hover={false}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full px-5 py-4 rounded-xl bg-black/20 text-white text-base border-none outline-none placeholder:text-white/70"
              />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Your Email"
                className="w-full px-5 py-4 rounded-xl bg-black/20 text-white text-base border-none outline-none placeholder:text-white/70"
              />
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Your Message"
                rows={6}
                className="w-full px-5 py-4 rounded-xl bg-black/20 text-white text-base border-none outline-none resize-none placeholder:text-white/70"
              />
              <motion.button
                type="submit"
                disabled={sending}
                className="w-full px-5 py-4 rounded-xl bg-primary text-white text-base font-bold cursor-pointer border-none disabled:opacity-60 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {sending ? "Sending..." : "Send Message"}
              </motion.button>
              {status && (
                <p className={`text-center text-sm font-semibold ${status.includes("success") ? "text-green-400" : "text-red-400"}`}>
                  {status}
                </p>
              )}
            </form>
          </GlassCard>
        </FadeContent>
      </div>
    </section>
  );
};

export default Contact;
