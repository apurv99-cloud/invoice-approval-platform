import { Bell, Search } from "lucide-react";
import { useAuth } from "../../Context/AuthContext";

export default function TopBar() {
  const { user } = useAuth();

  return (
    <header className="h-20 border-b border-slate-800 bg-slate-900 px-8 flex items-center justify-between">
      {/* Left Section */}

      <div>
        <h1 className="text-2xl font-bold text-white">
          Welcome, {user?.fullName || "User"} 👋
        </h1>

        <p className="text-sm text-slate-400 mt-1">
          Manage your organization efficiently.
        </p>
      </div>

      {/* Right Section */}

      <div className="flex items-center gap-5">
        {/* Search */}

        <div className="relative hidden md:block">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search..."
            className="w-64 rounded-xl border border-slate-700 bg-slate-800 py-2.5 pl-10 pr-4 text-white placeholder:text-slate-400 outline-none focus:border-cyan-500"
          />
        </div>

        {/* Notification */}

        <button className="relative rounded-xl bg-slate-800 p-3 transition hover:bg-slate-700">
          <Bell size={20} />

          <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-red-500"></span>
        </button>

        {/* User */}

        <div className="flex items-center gap-3 rounded-xl bg-slate-800 px-4 py-2">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-cyan-500 text-lg font-bold text-white">
            {user?.fullName?.charAt(0).toUpperCase() || "U"}
          </div>

          <div className="hidden lg:block">
            <h3 className="font-semibold text-white">{user?.fullName}</h3>

            <p className="text-xs text-slate-400">
              {user?.roleName?.replace("ROLE_", "").replace("_", " ")}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
