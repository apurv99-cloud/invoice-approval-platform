import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

import { Search, Plus, Pencil, UserCheck, UserX } from "lucide-react";

import CreateUserModal from "./CreateUserModal";
import EditUserModal from "./EditUserModal";

import {
  getMyOrganizationUsers,
  activateUser,
  deactivateUser,
} from "../../Service/organizationUserService";
export default function Users() {
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("ALL");

  const [selectedUser, setSelectedUser] = useState(null);

  const [createModalOpen, setCreateModalOpen] = useState(false);

  const [editModalOpen, setEditModalOpen] = useState(false);

  const loadUsers = async () => {
    try {
      setLoading(true);

      const data = await getMyOrganizationUsers();

      setUsers(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadUsers();
  }, []);
  const handleActivate = async (id) => {
    await activateUser(id);

    loadUsers();
  };
  const handleDeactivate = async (id) => {
    await deactivateUser(id);

    loadUsers();
  };
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.fullName.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "ALL" ||
        (statusFilter === "ACTIVE" && user.active) ||
        (statusFilter === "INACTIVE" && !user.active);

      return matchesSearch && matchesStatus;
    });
  }, [users, search, statusFilter]);
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
        <div>
          <h1 className="text-3xl font-bold text-white">Organization Users</h1>

          <p className="text-slate-400 mt-2">
            Manage users, assign roles and control access.
          </p>
        </div>

        <button
          onClick={() => setCreateModalOpen(true)}
          className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 transition px-5 py-3 rounded-xl font-semibold"
        >
          <Plus size={18} />
          Create User
        </button>
      </div>
      {/* Search & Filter */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5">
        <div className="flex flex-col lg:flex-row gap-5">
          {/* Search */}

          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-4 top-3.5 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl bg-slate-800 border border-slate-700 py-3 pl-11 pr-4 text-white outline-none focus:border-cyan-500"
            />
          </div>

          {/* Filter */}

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-xl bg-slate-800 border border-slate-700 px-4 text-white"
          >
            <option value="ALL">All Users</option>

            <option value="ACTIVE">Active</option>

            <option value="INACTIVE">Inactive</option>
          </select>
        </div>
      </div>
      {/* Loading */}
      {loading ? (
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-10">
          <div className="flex flex-col items-center justify-center gap-5">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-cyan-500 border-t-transparent"></div>

            <h2 className="text-xl font-semibold text-white">
              Loading Users...
            </h2>

            <p className="text-slate-400">
              Please wait while we fetch your organization users.
            </p>
          </div>
        </div>
      ) : filteredUsers.length === 0 ? (
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-12">
          <div className="flex flex-col items-center justify-center">
            <div className="mb-5 rounded-full bg-slate-800 p-6">
              <Users size={55} className="text-cyan-400" />
            </div>

            <h2 className="text-2xl font-bold text-white">No Users Found</h2>

            <p className="mt-3 text-center text-slate-400">
              There are no users available in your organization.
              <br />
              Click the button below to create your first user.
            </p>

            <button
              onClick={() => setCreateModalOpen(true)}
              className="mt-8 flex items-center gap-2 rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-white hover:bg-cyan-600 transition"
            >
              <Plus size={18} />
              Create User
            </button>
          </div>
        </div>
      ) : (
        <>
          // Section 3{/* Users Table */}
          <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
            <table className="w-full">
              <thead className="bg-slate-800">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                    User
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                    Role
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                    Status
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                    Created
                  </th>

                  <th className="px-6 py-4 text-center text-sm font-semibold text-slate-300">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredUsers.map((user) => (
                  <motion.tr
                    key={user.userId}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="border-t border-slate-800 hover:bg-slate-800/50 transition"
                  >
                    {/* User */}

                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-cyan-500 flex items-center justify-center text-white font-bold">
                          {user.fullName.charAt(0).toUpperCase()}
                        </div>

                        <div>
                          <h3 className="font-semibold text-white">
                            {user.fullName}
                          </h3>

                          <p className="text-sm text-slate-400">{user.email}</p>
                        </div>
                      </div>
                    </td>

                    {/* Role */}

                    <td className="px-6 py-5">
                      <span className="rounded-full bg-cyan-500/20 px-4 py-1 text-sm text-cyan-400">
                        {user.roleName?.replace("ROLE_", "").replace("_", " ")}
                      </span>
                    </td>

                    {/* Status */}

                    <td className="px-6 py-5">
                      {user.active ? (
                        <span className="rounded-full bg-green-500/20 px-4 py-1 text-sm text-green-400">
                          Active
                        </span>
                      ) : (
                        <span className="rounded-full bg-red-500/20 px-4 py-1 text-sm text-red-400">
                          Inactive
                        </span>
                      )}
                    </td>

                    {/* Created */}

                    <td className="px-6 py-5 text-slate-300">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>

                    {/* Actions */}

                    <td className="px-6 py-5">
                      <div className="flex justify-center gap-3">
                        <button
                          onClick={() => {
                            setSelectedUser(user);

                            setEditModalOpen(true);
                          }}
                          className="rounded-lg bg-blue-500 p-2 hover:bg-blue-600 transition"
                        >
                          <Pencil size={18} />
                        </button>

                        {user.active ? (
                          <button
                            onClick={() => handleDeactivate(user.userId)}
                            className="rounded-lg bg-red-500 p-2 hover:bg-red-600 transition"
                          >
                            <UserX size={18} />
                          </button>
                        ) : (
                          <button
                            onClick={() => handleActivate(user.userId)}
                            className="rounded-lg bg-green-500 p-2 hover:bg-green-600 transition"
                          >
                            <UserCheck size={18} />
                          </button>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
      // Section 5
      <CreateUserModal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        refreshUsers={loadUsers}
      />
      <EditUserModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        selectedUser={selectedUser}
        refreshUsers={loadUsers}
      />
    </div>
  );
}
