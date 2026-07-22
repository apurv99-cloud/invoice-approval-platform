import { useEffect, useState } from "react";
import { X } from "lucide-react";

const initialFormData = {
  fullName: "",
  email: "",
  phoneNumber: "",
  roleName: "REVIEWER",
  active: false,
  password: "",
};

const UserFormModal = ({ isOpen, onClose, onSubmit, initialData = null }) => {
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (!isOpen) return;

    if (initialData) {
      setFormData({
        fullName: initialData.fullName || "",
        email: initialData.email || "",
        phoneNumber: initialData.phoneNumber || "",
        roleName: initialData.roleName || "REVIEWER",
        active:
          initialData.active ??
          initialData.isActive ??
          initialData.enabled ??
          false,
        password: "",
      });
    } else {
      setFormData(initialFormData);
    }
  }, [isOpen, initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = { ...formData };

    if (initialData && !payload.password) {
      delete payload.password;
    }

    onSubmit(payload);
  };

  const handleClose = () => {
    setFormData(initialFormData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm p-4 sm:p-6">
      <div className="mx-auto my-6 flex max-h-[95vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
        {/* Header */}

        <div className="sticky top-0 z-10 flex items-start justify-between border-b border-slate-200 bg-white px-5 py-5 sm:px-8">
          <div>
            <h2 className="text-xl font-bold text-slate-800 sm:text-2xl">
              {initialData ? "Edit User" : "Create User"}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {initialData
                ? "Update account details and role access."
                : "Create a new team member for your organization."}
            </p>
          </div>

          <button
            onClick={handleClose}
            className="rounded-lg p-2 transition hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto space-y-6 p-5 sm:p-8"
        >
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {/* Full Name */}

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Full Name *
              </label>

              <input
                required
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              />
            </div>

            {/* Email */}

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Email *
              </label>

              <input
                required
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              />
            </div>

            {/* Phone */}

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Phone Number
              </label>

              <input
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="+91 9876543210"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              />
            </div>

            {/* Role */}

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Role *
              </label>

              <select
                required
                name="roleName"
                value={formData.roleName}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              >
                <option value="REVIEWER">Reviewer</option>

                <option value="FINANCE">Finance</option>

                <option value="VENDOR">Vendor</option>

                <option value="ORG_ADMIN">Organization Admin</option>
              </select>
            </div>

            {/* Status */}

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Account Status *
              </label>

              <select
                required
                name="active"
                value={String(formData.active)}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    active: e.target.value === "true",
                  }))
                }
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              >
                <option value="false">Inactive</option>

                <option value="true">Active</option>
              </select>
            </div>
            {/* Password */}

            {!initialData && (
              <div className="lg:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Temporary Password *
                </label>

                <input
                  required
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a temporary password"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                />
              </div>
            )}
          </div>

          {/* Footer */}

          <div className="sticky bottom-0 flex flex-col-reverse gap-3 border-t border-slate-200 bg-white p-5 sm:flex-row sm:justify-end sm:px-8">
            <button
              type="button"
              onClick={handleClose}
              className="w-full rounded-xl border border-slate-300 px-5 py-3 font-medium text-slate-700 transition-all duration-200 hover:bg-slate-100 sm:w-auto"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="w-full rounded-xl bg-indigo-600 px-5 py-3 font-medium text-white transition-all duration-200 hover:bg-indigo-700 hover:shadow-lg sm:w-auto"
            >
              {initialData ? "Save Changes" : "Create User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserFormModal;
