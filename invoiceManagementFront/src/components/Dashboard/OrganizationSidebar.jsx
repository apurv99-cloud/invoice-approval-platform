import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, Users, LogOut } from "lucide-react";

export default function OrganizationSidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");

    navigate("/");
  };

  const menus = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/organization/dashboard",
    },

    {
      title: "Users",
      icon: <Users size={20} />,
      path: "/organization/users",
    },
  ];

  return (
    <aside className="w-72 min-h-screen bg-slate-900 border-r border-slate-800 flex flex-col">
      {/* Logo */}

      <div className="h-20 flex items-center justify-center border-b border-slate-800">
        <h1 className="text-2xl font-bold text-cyan-400">RBAC System</h1>
      </div>

      {/* Navigation */}

      <div className="flex-1 py-6">
        {menus.map((menu) => (
          <NavLink
            key={menu.title}
            to={menu.path}
            className={({ isActive }) =>
              `mx-4 mb-2 flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-300

                ${
                  isActive
                    ? "bg-cyan-500 text-white shadow-lg"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`
            }
          >
            {menu.icon}

            <span className="font-medium">{menu.title}</span>
          </NavLink>
        ))}
      </div>

      {/* Logout */}

      <div className="border-t border-slate-800 p-5">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-red-500 py-3 font-semibold text-white transition hover:bg-red-600"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}
