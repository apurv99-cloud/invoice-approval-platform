import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { Pencil } from "lucide-react";
import toast from "react-hot-toast";

import {
  getAllOrganizations,
  updateOrganization,
  activateOrganization,
  deactivateOrganization,
} from "../../Service/OrganizationService";
import EditOrganizationModal from "./EditOrganizationModal";
import ConfirmModal from "../../Components/ConfirmModal";

export default function Organizations() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrganization, setSelectedOrganization] = useState(null);

  const [editModalOpen, setEditModalOpen] = useState(false);

  const loadOrganizations = async () => {
    try {
      const response = await getAllOrganizations();

      setOrganizations(response);
    } catch (error) {
      console.error("Failed to load organizations:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleActivate = (organizationId) => {
    setConfirmTitle("Activate Organization");

    setConfirmMessage(
      "Are you sure you want to activate this organization? Users will be able to login again.",
    );

    setConfirmText("Activate");

    setConfirmColor("bg-green-500 hover:bg-green-600");

    setConfirmAction(() => async () => {
      try {
        await activateOrganization(organizationId);
        toast.success("Organization activated successfully.");

        loadOrganizations();

        setConfirmOpen(false);
      } catch (error) {
        toast.success("Organization activated successfully.");
        console.error(error);
      }
    });

    setConfirmOpen(true);
  };

  const handleDeactivate = (organizationId) => {
    setConfirmTitle("Deactivate Organization");

    setConfirmMessage(
      "Are you sure you want to deactivate this organization? Users from this organization won't be able to login.",
    );

    setConfirmText("Deactivate");

    setConfirmColor("bg-red-500 hover:bg-red-600");

    setConfirmAction(() => async () => {
      try {
        await deactivateOrganization(organizationId);
        toast.success("Organization deactivated successfully.");

        loadOrganizations();

        setConfirmOpen(false);
      } catch (error) {
        toast.error("Failed to deactivate organization.");
        console.error(error);
      }
    });

    setConfirmOpen(true);
  };
  const handleEdit = (organization) => {
    setSelectedOrganization(organization);

    setEditModalOpen(true);
  };

  useEffect(() => {
    loadOrganizations();
  }, []);
  const filteredOrganizations = useMemo(() => {
    return organizations.filter((organization) => {
      const keyword = search.toLowerCase();

      const matchesSearch =
        organization.organizationName?.toLowerCase().includes(keyword) ||
        organization.email?.toLowerCase().includes(keyword) ||
        organization.contactPerson?.toLowerCase().includes(keyword);

      const matchesStatus =
        statusFilter === "ALL" ||
        (statusFilter === "ACTIVE" && organization.active) ||
        (statusFilter === "INACTIVE" && !organization.active);

      return matchesSearch && matchesStatus;
    });
  }, [organizations, search, statusFilter]);

  const [confirmOpen, setConfirmOpen] = useState(false);

  const [confirmTitle, setConfirmTitle] = useState("");

  const [confirmMessage, setConfirmMessage] = useState("");

  const [confirmColor, setConfirmColor] = useState("");

  const [confirmText, setConfirmText] = useState("");

  const [confirmAction, setConfirmAction] = useState(null);

  return (
    <div className="min-h-screen bg-[#0F172A] text-white">
      <div className="max-w-7xl mx-auto p-8">
        {/* Header */}

        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Organizations</h1>

            <div className="mb-6 flex flex-col gap-4 lg:flex-row">
              {/* Search */}

              <div className="relative flex-1">
                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  placeholder="Search organizations..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 py-3 pl-11 pr-4 text-white outline-none focus:border-cyan-500"
                />
              </div>

              {/* Status Filter */}

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-xl border border-slate-700 bg-slate-900 px-5 text-white outline-none focus:border-cyan-500"
              >
                <option value="ALL">All</option>

                <option value="ACTIVE">Active</option>

                <option value="INACTIVE">Inactive</option>
              </select>
            </div>

            <p className="text-white/60 mt-2">Manage all organizations</p>
          </div>

          <button
            onClick={() => navigate("/organizations/create")}
            className="
            px-5
            py-3

            rounded-xl

            bg-white
            text-black

            font-medium

            hover:bg-gray-200

            transition
            "
          >
            + Create Organization
          </button>
        </div>

        {/* Table */}

        <div
          className="
          mt-10

          rounded-3xl

          border
          border-white/10

          bg-white/[0.03]

          overflow-hidden
          "
        >
          {loading ? (
            <div className="p-10 text-center text-white/50">
              Loading organizations...
            </div>
          ) : organizations.length === 0 ? (
            <div className="p-10 text-center text-white/50">
              No Organizations Found
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr
                  className="
                  border-b
                  border-white/10
                  text-left
                  "
                >
                  <th className="p-5">Organization</th>

                  <th className="p-5">Email</th>

                  <th className="p-5">Contact Person</th>

                  <th className="p-5">Status</th>

                  <th className="p-5">Created At</th>

                  <th className="px-6 py-4 text-center text-sm font-semibold text-slate-300">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredOrganizations.map((org) => (
                  <tr
                    key={org.organizationId}
                    className="
                    border-b
                    border-white/5

                    hover:bg-white/[0.02]

                    transition
                    "
                  >
                    <td className="p-5">
                      <div>
                        <p className="font-medium">{org.organizationName}</p>

                        <p className="text-sm text-white/50">
                          {org.legalBusinessName}
                        </p>
                      </div>
                    </td>

                    <td className="p-5">{org.email}</td>

                    <td className="p-5">{org.contactPersonName}</td>

                    <td className="p-5">
                      {org.active ? (
                        <span
                          className="
                          px-3
                          py-1

                          rounded-full

                          bg-green-500/20

                          text-green-300

                          text-sm
                          "
                        >
                          Active
                        </span>
                      ) : (
                        <span
                          className="
                          px-3
                          py-1

                          rounded-full

                          bg-yellow-500/20

                          text-yellow-300

                          text-sm
                          "
                        >
                          Inactive
                        </span>
                      )}
                    </td>

                    <td className="p-5 text-white/60">
                      {org.createdAt
                        ? new Date(org.createdAt).toLocaleDateString()
                        : "-"}
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex justify-center gap-2">
                        {/* Edit */}

                        <button
                          onClick={() => handleEdit(org)}
                          className="rounded-lg bg-blue-500 p-2 hover:bg-blue-600 transition"
                        >
                          <Pencil size={18} />
                        </button>

                        {/* Active / Inactive */}

                        {org.active ? (
                          <button
                            onClick={() => handleDeactivate(org.organizationId)}
                            className="rounded-lg bg-red-500 p-2 hover:bg-red-600 transition"
                          >
                            Deactivate
                          </button>
                        ) : (
                          <button
                            onClick={() => handleActivate(org.organizationId)}
                            className="rounded-lg bg-green-500 p-2 hover:bg-green-600 transition"
                          >
                            Activate
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <EditOrganizationModal
        open={editModalOpen}
        onClose={() => {
          setEditModalOpen(false);
          setSelectedOrganization(null);
        }}
        selectedOrganization={selectedOrganization}
        refreshOrganizations={loadOrganizations}
      />
      <ConfirmModal
        open={confirmOpen}
        title={confirmTitle}
        message={confirmMessage}
        confirmText={confirmText}
        confirmColor={confirmColor}
        onClose={() => setConfirmOpen(false)}
        onConfirm={confirmAction}
      />
    </div>
  );
}
