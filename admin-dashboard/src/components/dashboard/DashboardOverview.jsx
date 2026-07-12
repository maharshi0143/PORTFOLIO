import { useEffect, useState } from "react";
import StatCard from "./StatCard";
import FadeContent from "../../reactbits/FadeContent";
import { getProjects, getSkills, getExperiences, getMessages } from "../../api/api";

const DashboardOverview = () => {
  const [counts, setCounts] = useState({ projects: 0, skills: 0, experience: 0, messages: 0 });
  const [recentMessages, setRecentMessages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projRes, skillRes, expRes, msgRes] = await Promise.all([
          getProjects(),
          getSkills(),
          getExperiences(),
          getMessages(),
        ]);
        setCounts({
          projects: projRes.data.length,
          skills: skillRes.data.length,
          experience: expRes.data.length,
          messages: msgRes.data.length,
        });
        setRecentMessages(msgRes.data.slice(0, 4));
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className="mb-9">
        <h1 className="text-[38px] font-bold text-white">Dashboard Overview</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-9">
        <StatCard icon="fa-code" count={counts.projects} label="Projects" index={0} />
        <StatCard icon="fa-brain" count={counts.skills} label="Skills" index={1} />
        <StatCard icon="fa-briefcase" count={counts.experience} label="Experience" index={2} />
        <StatCard icon="fa-envelope" count={counts.messages} label="Messages" index={3} />
      </div>

      <FadeContent delay={0.4}>
        <div className="bg-white/[0.05] border border-white/[0.08] rounded-3xl p-6 mt-8">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-2xl font-bold text-white">Recent Messages</h2>
            <span className="px-3 py-1.5 rounded-full bg-primary/15 text-accent text-xs font-bold">
              {recentMessages.length}
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {recentMessages.map((msg) => (
              <div
                key={msg.id}
                className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-4"
              >
                <h4 className="text-base font-semibold text-white mb-1">{msg.name}</h4>
                <p className="text-[#cfcfcf] text-sm leading-relaxed mb-2 line-clamp-3">{msg.message}</p>
                <span className="text-xs text-[#9f9f9f]">
                  {msg.created_at ? new Date(msg.created_at).toLocaleDateString() : ""}
                </span>
              </div>
            ))}
          </div>
        </div>
      </FadeContent>
    </div>
  );
};

export default DashboardOverview;
