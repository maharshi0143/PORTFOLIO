import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Send, Mail, MapPin, Github, Linkedin, Code, Download, CircleCheck } from "lucide-react";
import { personal } from "../../config";
import { sendContact } from "../../lib/api";
import { SectionHeading, GlassCard } from "../ui";

const ease = [0.16, 1, 0.3, 1];

const socialIconMap = {
  github: Github,
  linkedin: Linkedin,
  code: Code,
};

export default function Contact() {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setSending(true);
    try {
      await sendContact(data);
      setSent(true);
      toast.success("Message sent successfully!", {
        position: "bottom-right",
        theme: "dark",
      });
      reset();
      setTimeout(() => setSent(false), 2000);
    } catch (err) {
      toast.error(
        err.response?.data?.error || "Failed to send message. Please try again.",
        { position: "bottom-right", theme: "dark" }
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-20 md:py-28 lg:py-36 px-6 md:px-12 lg:px-24"
    >
      <div className="max-w-[1200px] mx-auto">
        <SectionHeading
          label="Let's Connect"
          title="Get in Touch"
          subtitle="Reach out for collaborations, projects, or a friendly conversation."
        />

        <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-10">
          {/* Left — Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            viewport={{ once: true, margin: "-60px" }}
            className="space-y-6 w-full"
          >
            <GlassCard hover={false}>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                <span className="text-sm font-medium text-success">Available for opportunities</span>
              </div>

              <div className="space-y-3 mb-6">
                <p className="flex items-center gap-2.5 text-base text-text-secondary">
                  <Mail size={16} className="text-primary-400 shrink-0" />
                  {personal.email}
                </p>
                <p className="flex items-center gap-2.5 text-base text-text-secondary">
                  <MapPin size={16} className="text-primary-400 shrink-0" />
                  {personal.location}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mb-5">
                {personal.socials.map((s) => {
                  const Icon = socialIconMap[s.icon] || Code;
                  return (
                    <a
                      key={s.label}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor-hover
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-glass-light border border-glass-border text-text-secondary text-sm font-medium no-underline hover:border-primary-500/30 hover:text-primary-400 transition-all duration-200"
                    >
                      <Icon size={13} />
                      {s.label}
                    </a>
                  );
                })}
              </div>

              <div className="flex flex-wrap gap-2">
                <a
                  href={personal.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-hover
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-glass-light border border-glass-border text-text-secondary text-sm font-medium no-underline hover:border-primary-500/30 hover:text-primary-400 transition-all duration-200"
                >
                  View Resume
                </a>
                <a
                  href={personal.resumeDownloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-hover
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-glass-light border border-glass-border text-text-secondary text-sm font-medium no-underline hover:border-primary-500/30 hover:text-primary-400 transition-all duration-200"
                >
                  <Download size={12} />
                  Download
                </a>
              </div>
            </GlassCard>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease }}
            viewport={{ once: true, margin: "-60px" }}
            className="w-full"
          >
            <GlassCard hover={false}>
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <div>
                  <label htmlFor="contact-name" className="sr-only">Your Name</label>
                  <input
                    id="contact-name"
                    type="text"
                    placeholder="John Doe"
                    {...register("name", { required: "Name is required" })}
                    className="w-full px-4 py-3.5 rounded-xl bg-glass-light border border-glass-border text-text-primary text-base outline-none focus:border-primary-500 focus:shadow-[0_0_0_3px_rgba(0,201,224,0.15)] transition-all duration-300 placeholder:text-text-muted"
                  />
                  {errors.name && (
                    <p className="text-tertiary-400 text-xs mt-1.5">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="contact-email" className="sr-only">Your Email</label>
                  <input
                    id="contact-email"
                    type="email"
                    placeholder="john@example.com"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Invalid email format",
                      },
                    })}
                    className="w-full px-4 py-3.5 rounded-xl bg-glass-light border border-glass-border text-text-primary text-base outline-none focus:border-primary-500 focus:shadow-[0_0_0_3px_rgba(0,201,224,0.15)] transition-all duration-300 placeholder:text-text-muted"
                  />
                  {errors.email && (
                    <p className="text-tertiary-400 text-xs mt-1.5">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="contact-message" className="sr-only">Your Message</label>
                  <textarea
                    id="contact-message"
                    placeholder="Tell me about your project..."
                    rows={5}
                    {...register("message", {
                      required: "Message is required",
                      minLength: {
                        value: 10,
                        message: "Message must be at least 10 characters",
                      },
                    })}
                    className="w-full px-4 py-3.5 rounded-xl bg-glass-light border border-glass-border text-text-primary text-base outline-none focus:border-primary-500 focus:shadow-[0_0_0_3px_rgba(0,201,224,0.15)] transition-all duration-300 placeholder:text-text-muted resize-none"
                  />
                  {errors.message && (
                    <p className="text-tertiary-400 text-xs mt-1.5">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <motion.button
                  type="submit"
                  disabled={sending || sent}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white text-sm font-semibold flex items-center justify-center gap-2 hover:from-primary-400 hover:to-primary-500 shadow-[0_2px_12px_rgba(0,201,224,0.25)] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                >
                  {sent ? (
                    <>
                      <CircleCheck size={16} />
                      Sent!
                    </>
                  ) : sending ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={14} />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>

              <p className="text-xs text-text-muted text-center mt-3">
                I typically respond within 24 hours.
              </p>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
