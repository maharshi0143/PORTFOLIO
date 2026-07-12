import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";

const navItems = [
  { label: "Dashboard", icon: "fa-chart-line", path: "/admin/dashboard" },
  { label: "Projects", icon: "fa-code", path: "/admin/dashboard/projects" },
  { label: "Skills", icon: "fa-brain", path: "/admin/dashboard/skills" },
  { label: "Experience", icon: "fa-briefcase", path: "/admin/dashboard/experience" },
  { label: "Resume", icon: "fa-file", path: "/admin/dashboard/resume" },
  { label: "Messages", icon: "fa-envelope", path: "/admin/dashboard/messages" },
];

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <aside className="w-[280px] min-h-screen bg-white/[0.05] border-r border-white/[0.08] p-5 flex flex-col justify-between shrink-0 max-lg:hidden">
      <div>
        <h2 className="text-[30px] font-bold text-white mb-10">
          Maharshi <span className="text-primary">Admin</span>
        </h2>
        <ul className="list-none flex flex-col gap-4">
          {navItems.map(({ label, icon, path }) => {
            const isActive = location.pathname === path;
            return (
              <li key={path}>
                <button
                  onClick={() => navigate(path)}
                  className={`w-full flex items-center gap-3.5 py-4 px-4 rounded-[14px] text-white font-medium text-[15px] cursor-pointer border-none transition-all ${
                    isActive
                      ? "bg-gradient-to-br from-primary to-accent"
                      : "bg-transparent hover:bg-white/[0.06]"
                  }`}
                >
                  <i className={`fa-solid ${icon} text-base`} />
                  <span>{label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <motion.button
        onClick={handleLogout}
        className="w-full py-3.5 rounded-[14px] bg-crimson text-white font-bold text-[15px] cursor-pointer border-none flex items-center justify-center gap-2"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <i className="fa-solid fa-right-from-bracket" />
        Logout
      </motion.button>
    </aside>
  );
};

export default Sidebar;
