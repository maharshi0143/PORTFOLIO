import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Sidebar from "./Sidebar";
import { useAuth } from "../../context/AuthContext";

const navItems = [
  { label: "Dashboard", icon: "fa-chart-line", path: "/admin/dashboard" },
  { label: "Projects", icon: "fa-code", path: "/admin/dashboard/projects" },
  { label: "Skills", icon: "fa-brain", path: "/admin/dashboard/skills" },
  { label: "Experience", icon: "fa-briefcase", path: "/admin/dashboard/experience" },
  { label: "Resume", icon: "fa-file", path: "/admin/dashboard/resume" },
  { label: "Messages", icon: "fa-envelope", path: "/admin/dashboard/messages" },
];

const DashboardLayout = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  const handleNav = (path) => {
    navigate(path);
    setMobileNavOpen(false);
  };

  return (
    <div className="w-full min-h-screen flex bg-[#0f0f0f] font-body text-white">
      <Sidebar />

      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-[#0f0f0f]/90 backdrop-blur-xl border-b border-white/[0.08] px-5 py-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">
          Maharshi <span className="text-primary">Admin</span>
        </h2>
        <button
          onClick={() => setMobileNavOpen(!mobileNavOpen)}
          className="w-11 h-11 rounded-xl border border-white/10 bg-white/[0.06] text-white flex items-center justify-center cursor-pointer"
        >
          {mobileNavOpen ? "✕" : "☰"}
        </button>
      </div>

      {mobileNavOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden fixed top-[68px] left-0 right-0 bg-[#0f0f0f]/95 backdrop-blur-xl border-b border-white/[0.08] p-5 z-40"
        >
          <ul className="list-none flex flex-wrap gap-3">
            {navItems.map(({ label, icon, path }) => (
              <li key={path} className="flex-1 min-w-[140px]">
                <button
                  onClick={() => handleNav(path)}
                  className={`w-full flex items-center gap-2 py-3 px-4 rounded-xl text-white text-sm font-medium cursor-pointer border-none ${
                    location.pathname === path
                      ? "bg-gradient-to-br from-primary to-accent"
                      : "bg-white/[0.06]"
                  }`}
                >
                  <i className={`fa-solid ${icon}`} />
                  {label}
                </button>
              </li>
            ))}
            <li className="w-full">
              <button
                onClick={handleLogout}
                className="w-full py-3 rounded-xl bg-crimson text-white font-bold text-sm cursor-pointer border-none"
              >
                <i className="fa-solid fa-right-from-bracket mr-2" />
                Logout
              </button>
            </li>
          </ul>
        </motion.div>
      )}

      <main className="flex-1 p-9 overflow-y-auto max-lg:pt-24 max-lg:px-5 max-lg:pb-16">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
