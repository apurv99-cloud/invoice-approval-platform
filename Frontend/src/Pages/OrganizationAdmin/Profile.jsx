import useAuth from "../../hooks/useAuth";
import { useTheme } from "../../context/ThemeContext";

const Profile = () => {
  const { user } = useAuth();
  const { isDark } = useTheme();

  return (
    <div className="max-w-3xl">
      <div
        className={`rounded-2xl border p-8 shadow-sm transition-colors duration-300 ${
          isDark
            ? "border-slate-800 bg-slate-900 text-slate-100"
            : "border-slate-200 bg-white text-slate-900"
        }`}
      >
        <h1 className={`mb-8 text-3xl font-bold ${isDark ? "text-slate-100" : "text-slate-800"}`}>
          My Profile
        </h1>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <p className={`text-sm ${isDark ? "text-slate-400" : "text-slate-500"}`}>Full Name</p>
            <h3 className={`mt-1 text-lg font-semibold ${isDark ? "text-slate-100" : "text-slate-800"}`}>
              {user?.fullName}
            </h3>
          </div>

          <div>
            <p className={`text-sm ${isDark ? "text-slate-400" : "text-slate-500"}`}>Email</p>
            <h3 className={`mt-1 text-lg font-semibold ${isDark ? "text-slate-100" : "text-slate-800"}`}>
              {user?.email}
            </h3>
          </div>

          <div>
            <p className={`text-sm ${isDark ? "text-slate-400" : "text-slate-500"}`}>Role</p>
            <h3 className={`mt-1 text-lg font-semibold ${isDark ? "text-slate-100" : "text-slate-800"}`}>
              {user?.roleName}
            </h3>
          </div>

          <div>
            <p className={`text-sm ${isDark ? "text-slate-400" : "text-slate-500"}`}>Organization</p>
            <h3 className={`mt-1 text-lg font-semibold ${isDark ? "text-slate-100" : "text-slate-800"}`}>
              {user?.organizationName || "N/A"}
            </h3>
          </div>

          <div>
            <p className={`text-sm ${isDark ? "text-slate-400" : "text-slate-500"}`}>Status</p>
            <h3
              className={`mt-1 text-lg font-semibold ${
                user?.active ? "text-green-600" : "text-red-600"
              }`}
            >
              {user?.active ? "Active" : "Inactive"}
            </h3>
          </div>

          <div>
            <p className={`text-sm ${isDark ? "text-slate-400" : "text-slate-500"}`}>User ID</p>
            <h3 className={`mt-1 text-lg font-semibold ${isDark ? "text-slate-100" : "text-slate-800"}`}>
              {user?.userId}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
