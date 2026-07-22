import { Mail, User, Send, Pencil, Power, PowerOff } from "lucide-react";

const OrganizationTable = ({
  organizations,
  loading,
  onSendOnboarding,
  onActivate,
  onDeactivate,
  onEdit,
}) => {
  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        Loading organizations...
      </div>
    );
  }

  if (organizations.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500 shadow-sm">
        No organizations found.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* ===========================
            Desktop & Tablet Table
         =========================== */}

      <div className="hidden overflow-x-auto md:block">
        <table className="min-w-[1100px] w-full">
          <thead className="sticky top-0 bg-slate-100">
            <tr className="text-left text-sm font-semibold text-slate-700">
              <th className="px-6 py-4">Organization</th>
              <th className="px-6 py-4">Contact Person</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Onboarding</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {organizations.map((organization) => (
              <tr
                key={organization.organizationId}
                className="border-t border-slate-200 transition-all duration-200 hover:bg-indigo-50/40"
              >
                {/* Organization */}

                <td className="px-6 py-5">
                  <h3 className="font-semibold text-slate-800">
                    {organization.organizationName}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    {organization.businessType || "-"}
                  </p>
                </td>

                {/* Contact */}

                <td className="px-6 py-5">
                  <div className="flex items-center gap-2 text-slate-700">
                    <User size={16} />

                    <span>{organization.contactPersonName || "-"}</span>
                  </div>
                </td>

                {/* Email */}

                <td className="px-6 py-5">
                  <div className="flex items-center gap-2 text-slate-700">
                    <Mail size={16} />

                    <span className="break-all">
                      {organization.contactPersonEmail || "-"}
                    </span>
                  </div>
                </td>

                {/* Onboarding */}

                <td className="px-6 py-5">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      organization.onboardingCompleted
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {organization.onboardingCompleted ? "Completed" : "Pending"}
                  </span>
                </td>

                {/* Status */}

                <td className="px-6 py-5">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      organization.active
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {organization.active ? "Active" : "Inactive"}
                  </span>
                </td>

                {/* Actions */}

                <td className="px-6 py-5">
                  <div className="flex items-center justify-center gap-2">
                    {/* Edit */}

                    <button
                      title="Edit"
                      onClick={() => onEdit?.(organization)}
                      className="rounded-lg p-2 text-blue-600 transition hover:bg-blue-50"
                    >
                      <Pencil size={18} />
                    </button>

                    {/* Send Onboarding */}

                    {!organization.onboardingCompleted && (
                      <button
                        title="Send Onboarding"
                        onClick={() =>
                          onSendOnboarding(organization.organizationId)
                        }
                        className="rounded-lg p-2 text-indigo-600 transition hover:bg-indigo-50"
                      >
                        <Send size={18} />
                      </button>
                    )}

                    {/* Activate / Deactivate */}

                    {organization.active ? (
                      <button
                        title="Deactivate"
                        onClick={() =>
                          onDeactivate(organization.organizationId)
                        }
                        className="rounded-lg p-2 text-red-600 transition hover:bg-red-50"
                      >
                        <PowerOff size={18} />
                      </button>
                    ) : (
                      <button
                        title="Activate"
                        onClick={() => onActivate(organization.organizationId)}
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
        {organizations.map((organization) => (
          <div
            key={organization.organizationId}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md"
          >
            {/* Header */}

            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h3 className="truncate text-lg font-semibold text-slate-800">
                  {organization.organizationName}
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  {organization.businessType || "-"}
                </p>
              </div>

              <span
                className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                  organization.active
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {organization.active ? "Active" : "Inactive"}
              </span>
            </div>

            {/* Details */}

            <div className="mt-5 space-y-3">
              <div className="flex items-center gap-3 text-sm text-slate-700">
                <User size={16} className="text-slate-500" />

                <span>{organization.contactPersonName || "-"}</span>
              </div>

              <div className="flex items-start gap-3 text-sm text-slate-700">
                <Mail size={16} className="mt-0.5 shrink-0 text-slate-500" />

                <span className="break-all">
                  {organization.contactPersonEmail || "-"}
                </span>
              </div>

              <div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    organization.onboardingCompleted
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {organization.onboardingCompleted
                    ? "Onboarding Completed"
                    : "Onboarding Pending"}
                </span>
              </div>
            </div>

            {/* Actions */}

            <div className="mt-6 flex items-center justify-end gap-2 border-t border-slate-200 pt-4">
              <button
                title="Edit"
                onClick={() => onEdit?.(organization)}
                className="rounded-xl bg-blue-50 p-2.5 text-blue-600 transition-all hover:bg-blue-100"
              >
                <Pencil size={18} />
              </button>

              {!organization.onboardingCompleted && (
                <button
                  title="Send Onboarding"
                  onClick={() => onSendOnboarding(organization.organizationId)}
                  className="rounded-xl bg-indigo-50 p-2.5 text-indigo-600 transition-all hover:bg-indigo-100"
                >
                  <Send size={18} />
                </button>
              )}

              {organization.active ? (
                <button
                  title="Deactivate"
                  onClick={() => onDeactivate(organization.organizationId)}
                  className="rounded-xl bg-red-50 p-2.5 text-red-600 transition-all hover:bg-red-100"
                >
                  <PowerOff size={18} />
                </button>
              ) : (
                <button
                  title="Activate"
                  onClick={() => onActivate(organization.organizationId)}
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

export default OrganizationTable;
