import { CalendarDays } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const DashboardHeader = ({ title, subtitle, userName }) => {
  const { isDark } = useTheme();
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div
      className={`rounded-2xl border p-6 shadow-sm transition-colors duration-300 ${
        isDark
          ? "border-slate-800 bg-slate-900 text-slate-100"
          : "border-slate-200 bg-white text-slate-900"
      }`}
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Left */}

        <div>
          <h1 className={`text-3xl font-bold ${isDark ? "text-slate-100" : "text-slate-800"}`}>
            {title}
            {userName ? `, ${userName}` : ""}
          </h1>

          {subtitle && <p className={`mt-2 ${isDark ? "text-slate-400" : "text-slate-500"}`}>{subtitle}</p>}
        </div>

        {/* Right */}

        <div className={`flex items-center gap-2 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
          <CalendarDays size={18} />

          <span className="text-sm font-medium">{today}</span>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
