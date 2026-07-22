import {
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  LogOut,
  UserCircle2,
  Building2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Topbar = ({ collapsed, setCollapsed, setMobileOpen }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const organizationName =
    user?.organizationName ||
    user?.organization?.organizationName ||
    user?.organization?.name;

  return (
    <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b border-slate-200 bg-white/95 px-4 shadow-sm backdrop-blur-md sm:px-6 lg:px-8">
      {/* Left */}

      <div className="flex items-center gap-3">
        {/* Mobile Menu */}

        <button
          onClick={() => setMobileOpen(true)}
          className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 lg:hidden"
        >
          <Menu size={22} />
        </button>

        {/* Desktop Collapse */}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 lg:flex"
        >
          {collapsed ? (
            <PanelLeftOpen size={22} />
          ) : (
            <PanelLeftClose size={22} />
          )}
        </button>

        <div>
          <h1 className="text-xl font-bold text-slate-800 sm:text-2xl">
            Dashboard
          </h1>

          <p className="hidden text-sm text-slate-500 sm:block">
            Welcome back, {user?.fullName}
          </p>
        </div>
      </div>

      {/* Right */}

      <div className="flex items-center gap-3 sm:gap-6">
        {/* Profile */}

        <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-100">
            <UserCircle2 size={28} className="text-indigo-600" />
          </div>

          <div className="hidden lg:block">
            <h3 className="font-semibold text-slate-800">{user?.fullName}</h3>

            {organizationName && (
              <div className="flex items-center gap-1 text-xs text-slate-500">
                <Building2 size={12} />
                <span>{organizationName}</span>
              </div>
            )}

            {/* <p className="text-sm font-medium text-indigo-600">
              {user?.roleName}
            </p> */}
          </div>
        </div>

        {/* Logout */}

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-xl bg-red-50 px-3 py-2 font-medium text-red-600 transition-all duration-200 hover:bg-red-100 hover:shadow-md"
        >
          <LogOut size={18} />
          <span className="hidden sm:block">Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Topbar;
