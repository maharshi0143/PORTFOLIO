import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { login as loginApi } from "../../api/api";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await loginApi(email, password);
      login(response.data.token);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center overflow-hidden bg-[#0f0f0f] relative">
      <div className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-br from-primary to-[#6a00ff] blur-[140px] opacity-50 animate-[glowMove_8s_infinite_alternate]" />
      <style>{`
        @keyframes glowMove {
          from { transform: translate(-150px, -100px); }
          to { transform: translate(150px, 100px); }
        }
      `}</style>

      <motion.div
        className="w-full max-w-[430px] p-11 rounded-[25px] bg-white/[0.08] border border-white/10 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] relative z-10 mx-5"
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="text-center mb-9">
          <h2 className="text-[42px] font-bold text-white mb-2">
            Admin <span className="text-primary">Login</span>
          </h2>
          <p className="text-[#d1d1d1] text-base">Access your portfolio dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="relative">
            <i className="fa-solid fa-envelope absolute top-1/2 left-[18px] -translate-y-1/2 text-primary text-lg" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email"
              required
              className="w-full py-4 pl-[50px] pr-4 rounded-[14px] border border-transparent bg-white/[0.08] text-white text-base outline-none focus:border-primary transition-colors"
            />
          </div>

          <div className="relative">
            <i className="fa-solid fa-lock absolute top-1/2 left-[18px] -translate-y-1/2 text-primary text-lg" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              required
              className="w-full py-4 pl-[50px] pr-4 rounded-[14px] border border-transparent bg-white/[0.08] text-white text-base outline-none focus:border-primary transition-colors"
            />
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-[14px] bg-gradient-to-br from-primary to-accent text-white text-[17px] font-bold cursor-pointer border-none disabled:opacity-60"
            whileHover={{ y: -3, boxShadow: "0 10px 25px rgba(255,62,0,0.4)" }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? "Logging in..." : "Login"}
          </motion.button>
        </form>

        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-5 text-center text-white font-semibold text-sm"
          >
            {error}
          </motion.p>
        )}
      </motion.div>
    </div>
  );
};

export default LoginPage;
