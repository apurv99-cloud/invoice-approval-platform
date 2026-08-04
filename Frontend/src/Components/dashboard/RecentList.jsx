import {
  CalendarDays,
  CircleCheckBig,
  Clock3,
  User,
  Building2,
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const RecentList = ({
  title,
  subtitle,
  items = [],
  primaryField,
  secondaryField,
  statusField,
  dateField,
}) => {
  const { isDark } = useTheme();
  const safeItems = Array.isArray(items) ? items : [];

  const recentItems = [...safeItems]
    .sort((a, b) => {
      const first = a?.[dateField] ? new Date(a[dateField]).getTime() : 0;
      const second = b?.[dateField] ? new Date(b[dateField]).getTime() : 0;

      return second - first;
    })
    .slice(0, 5);

  const getStatusBadge = (item) => {
    const value = item[statusField];

    // Boolean Status
    if (typeof value === "boolean") {
      return value ? (
        <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
          <CircleCheckBig size={14} />
          Active
        </span>
      ) : (
        <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
          <Clock3 size={14} />
          Inactive
        </span>
      );
    }

    return (
      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
        {value}
      </span>
    );
  };

  return (
    <div
      className={`rounded-2xl border shadow-sm transition-colors duration-300 ${
        isDark
          ? "border-slate-800 bg-slate-900 text-slate-100"
          : "border-slate-200 bg-white text-slate-900"
      }`}
    >
      {/* Header */}

      <div className={`border-b px-6 py-5 ${isDark ? "border-slate-800" : "border-slate-200"}`}>
        <h2 className={`text-xl font-semibold ${isDark ? "text-slate-100" : "text-slate-800"}`}>{title}</h2>

        <p className={`mt-1 text-sm ${isDark ? "text-slate-400" : "text-slate-500"}`}>{subtitle}</p>
      </div>

      {/* Empty */}

      {recentItems.length === 0 ? (
        <div className={`p-10 text-center ${isDark ? "text-slate-400" : "text-slate-500"}`}>
          No records available.
        </div>
      ) : (
        <div className={`divide-y ${isDark ? "divide-slate-800" : "divide-slate-200"}`}>
          {recentItems.map((item, index) => (
            <div
              key={index}
              className={`flex items-center justify-between px-6 py-5 transition ${
                isDark ? "hover:bg-slate-800/70" : "hover:bg-slate-50"
              }`}
            >
              {/* Left */}

              <div className="flex items-center gap-4">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${isDark ? "bg-indigo-500/20" : "bg-indigo-100"}`}>
                  {item.organizationName ? (
                    <Building2 size={22} className={isDark ? "text-indigo-300" : "text-indigo-600"} />
                  ) : (
                    <User size={22} className={isDark ? "text-indigo-300" : "text-indigo-600"} />
                  )}
                </div>

                <div>
                  <h3 className={`font-semibold ${isDark ? "text-slate-100" : "text-slate-800"}`}>
                    {item[primaryField] || "Unnamed"}
                  </h3>

                  <p className={`text-sm ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                    {item[secondaryField] || "No additional details"}
                  </p>
                </div>
              </div>

              {/* Right */}

              <div className="flex items-center gap-8">
                <div className={`hidden items-center gap-2 text-sm md:flex ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                  <CalendarDays size={16} />

                  {new Date(item[dateField]).toLocaleDateString("en-IN")}
                </div>

                {getStatusBadge(item)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentList;
