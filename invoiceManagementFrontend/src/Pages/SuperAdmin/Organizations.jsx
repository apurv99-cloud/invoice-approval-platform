import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getAllOrganizations } from "../../Service/OrganizationService";

export default function Organizations() {
  const navigate = useNavigate();

  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    loadOrganizations();
  }, []);

  return (
    <div className="min-h-screen bg-[#0F172A] text-white">
      <div className="max-w-7xl mx-auto p-8">
        {/* Header */}

        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Organizations</h1>

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
                </tr>
              </thead>

              <tbody>
                {organizations.map((org) => (
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
                      {org.onboardingCompleted ? (
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
                          Pending
                        </span>
                      )}
                    </td>

                    <td className="p-5 text-white/60">
                      {org.createdAt
                        ? new Date(org.createdAt).toLocaleDateString()
                        : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
