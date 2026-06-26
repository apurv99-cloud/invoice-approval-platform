import { useEffect, useState } from "react";
import { X } from "lucide-react";

import { updateUser } from "../../Service/organizationUserService";

export default function EditUserModal({
  open,

  onClose,

  selectedUser,

  refreshUsers,
}) {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",

    email: "",

    roleName: "",
  });

  useEffect(() => {
    if (selectedUser) {
      setFormData({
        fullName: selectedUser.fullName,

        email: selectedUser.email,

        roleName: selectedUser.roleName,
      });
    }
  }, [selectedUser]);

  if (!open) return null;
  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await updateUser(
        selectedUser.userId,

        formData,
      );

      refreshUsers();

      onClose();
    } catch (error) {
      console.error(error);

      alert("Unable to update user.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900 p-8">
        {/* Header */}

        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Edit User</h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-slate-800"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Full Name
            </label>

            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-cyan-500"
            />
          </div>

          {/* Email */}

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-cyan-500"
            />
          </div>

          {/* Role */}

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Role
            </label>

            <select
              name="roleName"
              value={formData.roleName}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-cyan-500"
            >
              <option value="ROLE_REVIEWER">Reviewer</option>

              <option value="ROLE_FINANCE">Finance</option>

              <option value="ROLE_DIRECTOR">Director</option>

              <option value="ROLE_CFO">CFO</option>
            </select>
          </div>

          {/* Footer Buttons */}

          <div className="flex justify-end gap-4 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-700 px-6 py-3 text-slate-300 transition hover:bg-slate-800"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-white transition hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Updating..." : "Update User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
