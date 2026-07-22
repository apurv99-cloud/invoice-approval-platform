import { Building2, ChevronLeft, UserCircle2, X } from "lucide-react";
import { NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import sidebarConfig from "../../config/sidebarConfig";

const Sidebar = ({ collapsed, mobileOpen, setMobileOpen }) => {
  const { user } = useAuth();

  const menus = sidebarConfig[user?.roleName] || [];

  const organizationName =
    user?.organizationName ||
    user?.organization?.organizationName ||
    user?.organization?.name;

  return (
    <>
      {/* Desktop Sidebar */}

      <aside
        className={`hidden lg:flex flex-col bg-slate-900 text-white transition-all duration-300 ${
          collapsed ? "w-20" : "w-72"
        }`}
      >
        {/* Logo */}

        <div className="flex h-20 items-center justify-between border-b border-slate-800 px-5">
          {!collapsed && (
            <div>
              <h1 className="text-xl font-bold tracking-wide">InvoiceFlow</h1>

              <p className="text-xs text-slate-400">Enterprise Suite</p>
            </div>
          )}

          {collapsed && (
            <div className="mx-auto rounded-xl bg-indigo-600 p-2">
              <Building2 size={22} />
            </div>
          )}
        </div>

        {/* Navigation */}

        <nav className="flex-1 space-y-2 p-4">
          {menus.map((menu) => {
            const Icon = menu.icon;

            return (
              <NavLink
                key={menu.path}
                to={menu.path}
                title={collapsed ? menu.label : ""}
                className={({ isActive }) =>
                  `group flex items-center rounded-xl transition-all duration-200 ${
                    collapsed ? "justify-center px-3 py-3" : "gap-3 px-4 py-3"
                  } ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-lg"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`
                }
              >
                <Icon size={20} />

                {!collapsed && (
                  <span className="font-medium">{menu.label}</span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom User */}

        <div className="border-t border-slate-800 p-4">
          {collapsed ? (
            <div className="flex justify-center">
              <div className="rounded-full bg-indigo-100 p-2">
                <UserCircle2 className="text-indigo-600" size={24} />
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3 rounded-xl bg-slate-800 p-3">
              <div className="rounded-full bg-indigo-100 p-2">
                <UserCircle2 className="text-indigo-600" size={24} />
              </div>

              <div className="overflow-hidden">
                <p className="truncate font-semibold">{user?.fullName}</p>

                {organizationName && (
                  <p className="truncate text-xs text-slate-400">
                    {organizationName}
                  </p>
                )}

                <p className="text-xs text-indigo-300">{user?.roleName}</p>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Mobile Sidebar */}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col bg-slate-900 text-white shadow-2xl transition-transform duration-300 lg:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}

        <div className="flex h-20 items-center justify-between border-b border-slate-800 px-6">
          <div>
            <h1 className="text-xl font-bold">InvoiceFlow</h1>

            <p className="text-xs text-slate-400">Enterprise Suite</p>
          </div>

          <button
            onClick={() => setMobileOpen(false)}
            className="rounded-lg p-2 hover:bg-slate-800"
          >
            <X size={22} />
          </button>
        </div>

        {/* Navigation */}

        <nav className="flex-1 space-y-2 p-4">
          {menus.map((menu) => {
            const Icon = menu.icon;

            return (
              <NavLink
                key={menu.path}
                to={menu.path}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-3 transition-all ${
                    isActive
                      ? "bg-indigo-600 text-white"
                      : "text-slate-300 hover:bg-slate-800"
                  }`
                }
              >
                <Icon size={20} />

                <span>{menu.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom */}

        <div className="border-t border-slate-800 p-4">
          <div className="flex items-center gap-3 rounded-xl bg-slate-800 p-3">
            <div className="rounded-full bg-indigo-100 p-2">
              <UserCircle2 className="text-indigo-600" size={24} />
            </div>

            <div className="overflow-hidden">
              <p className="truncate font-semibold">{user?.fullName}</p>

              {organizationName && (
                <p className="truncate text-xs text-slate-400">
                  {organizationName}
                </p>
              )}

              <p className="text-xs text-indigo-300">{user?.roleName}</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
