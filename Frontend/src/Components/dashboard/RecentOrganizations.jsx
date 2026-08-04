import { Building2, CalendarDays, CircleCheckBig, Clock3 } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const RecentOrganizations = ({ organizations = [] }) => {
  const { isDark } = useTheme();
  const recentOrganizations = [...organizations]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 5);

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
        <h2 className={`text-xl font-semibold ${isDark ? "text-slate-100" : "text-slate-800"}`}>
          Recent Organizations
        </h2>

        <p className={`mt-1 text-sm ${isDark ? "text-slate-400" : "text-slate-500"}`}>
          Recently onboarded organizations
        </p>
      </div>

      {/* Empty State */}

      {recentOrganizations.length === 0 ? (
        <div className={`p-10 text-center ${isDark ? "text-slate-400" : "text-slate-500"}`}>
          No organizations available.
        </div>
      ) : (
        <div className={`divide-y ${isDark ? "divide-slate-800" : "divide-slate-200"}`}>
          {recentOrganizations.map((organization) => (
            <div
              key={organization.organizationId}
              className={`flex items-center justify-between px-6 py-5 transition ${
                isDark ? "hover:bg-slate-800/70" : "hover:bg-slate-50"
              }`}
            >
              {/* Left */}

              <div className="flex items-center gap-4">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${isDark ? "bg-indigo-500/20" : "bg-indigo-100"}`}>
                  <Building2 className={isDark ? "text-indigo-300" : "text-indigo-600"} size={22} />
                </div>

                <div>
                  <h3 className={`font-semibold ${isDark ? "text-slate-100" : "text-slate-800"}`}>
                    {organization.organizationName}
                  </h3>

                  <p className={`text-sm ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                    {organization.businessType || "Business"}
                  </p>
                </div>
              </div>

              {/* Right */}

              <div className="flex items-center gap-8">
                {/* Created */}

                <div className={`hidden items-center gap-2 text-sm md:flex ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                  <CalendarDays size={16} />

                  {new Date(organization.createdAt).toLocaleDateString("en-IN")}
                </div>

                {/* Onboarding */}

                <div>
                  {organization.onboardingCompleted ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-green-100 text-green-700 px-3 py-1 text-xs font-semibold">
                      <CircleCheckBig size={14} />
                      Completed
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-full bg-yellow-100 text-yellow-700 px-3 py-1 text-xs font-semibold">
                      <Clock3 size={14} />
                      Pending
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentOrganizations;
