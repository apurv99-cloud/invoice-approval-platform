import { Mail, Pencil, Power, PowerOff, User } from "lucide-react";

import RoleBadge from "./RoleBadge";
import StatusBadge from "../Common/StatusBadge";

const UserTable = ({
  users = [],
  loading = false,
  onEdit,
  onActivate,
  onDeactivate,
}) => {
  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500 shadow-sm">
        Loading users...
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500 shadow-sm">
        No users found.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* ===========================
            Desktop & Tablet Table
         =========================== */}

      <div className="hidden overflow-x-auto md:block">
        <table className="min-w-[1050px] w-full">
          <thead className="sticky top-0 bg-slate-100">
            <tr className="text-left text-sm font-semibold text-slate-700">
              <th className="px-6 py-4">User</th>

              <th className="px-6 py-4">Role</th>

              <th className="px-6 py-4">Contact</th>

              <th className="px-6 py-4">Status</th>

              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr
                key={user.userId}
                className="border-t border-slate-200 transition-all duration-200 hover:bg-indigo-50/40"
              >
                {/* User */}

                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                      <User size={18} />
                    </div>

                    <div>
                      <h3 className="font-semibold text-slate-800">
                        {user.fullName || "-"}
                      </h3>

                      <p className="mt-1 text-sm text-slate-500 break-all">
                        {user.email || "-"}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Role */}

                <td className="px-6 py-5">
                  <RoleBadge roleName={user.roleName} />
                </td>

                {/* Contact */}

                <td className="px-6 py-5">
                  <div className="flex items-center gap-2 text-slate-700">
                    <Mail size={16} />

                    <span>{user.phoneNumber || "No phone"}</span>
                  </div>
                </td>

                {/* Status */}

                <td className="px-6 py-5">
                  <StatusBadge active={user.active} />
                </td>

                {/* Actions */}

                <td className="px-6 py-5">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      title="Edit"
                      onClick={() => onEdit?.(user)}
                      className="rounded-lg p-2 text-blue-600 transition hover:bg-blue-50"
                    >
                      <Pencil size={18} />
                    </button>

                    {user.active ? (
                      <button
                        title="Deactivate"
                        onClick={() => onDeactivate?.(user.userId)}
                        className="rounded-lg p-2 text-red-600 transition hover:bg-red-50"
                      >
                        <PowerOff size={18} />
                      </button>
                    ) : (
                      <button
                        title="Activate"
                        onClick={() => onActivate?.(user.userId)}
                        className="rounded-lg p-2 text-green-600 transition hover:bg-green-50"
                      >
                        <Power size={18} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* ===========================
            Mobile Cards
         =========================== */}

      <div className="space-y-4 p-4 md:hidden">
        {users.map((user) => (
          <div
            key={user.userId}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md"
          >
            {/* Header */}

            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                <User size={20} />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="truncate text-lg font-semibold text-slate-800">
                  {user.fullName || "-"}
                </h3>

                <p className="mt-1 break-all text-sm text-slate-500">
                  {user.email || "-"}
                </p>
              </div>
            </div>

            {/* Details */}

            <div className="mt-5 space-y-4 border-t border-slate-200 pt-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-500">Role</span>

                <RoleBadge roleName={user.roleName} />
              </div>

              <div className="flex items-start justify-between gap-4">
                <span className="text-sm font-medium text-slate-500">
                  Contact
                </span>

                <div className="flex items-center gap-2 text-sm text-slate-700">
                  <Mail size={16} className="shrink-0" />
                  <span>{user.phoneNumber || "No phone"}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-500">
                  Status
                </span>

                <StatusBadge active={user.active} />
              </div>
            </div>

            {/* Actions */}

            <div className="mt-6 flex items-center justify-end gap-2 border-t border-slate-200 pt-4">
              <button
                title="Edit"
                onClick={() => onEdit?.(user)}
                className="rounded-xl bg-blue-50 p-2.5 text-blue-600 transition-all hover:bg-blue-100"
              >
                <Pencil size={18} />
              </button>

              {user.active ? (
                <button
                  title="Deactivate"
                  onClick={() => onDeactivate?.(user.userId)}
                  className="rounded-xl bg-red-50 p-2.5 text-red-600 transition-all hover:bg-red-100"
                >
                  <PowerOff size={18} />
                </button>
              ) : (
                <button
                  title="Activate"
                  onClick={() => onActivate?.(user.userId)}
                  className="rounded-xl bg-green-50 p-2.5 text-green-600 transition-all hover:bg-green-100"
                >
                  <Power size={18} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserTable;
