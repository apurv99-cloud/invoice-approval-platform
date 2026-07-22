import { Eye, Pencil, Send, FileText } from "lucide-react";
import { Link } from "react-router-dom";

import InvoiceStatusBadge from "./InvoiceStatusBadge";

const InvoiceTable = ({ invoices = [], loading = false, onEdit, onSubmit }) => {
  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500 shadow-sm">
        Loading invoices...
      </div>
    );
  }

  if (invoices.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500 shadow-sm">
        No invoices found.
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
              <th className="px-6 py-4">Invoice</th>
              <th className="px-6 py-4">Vendor</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {invoices.map((invoice) => (
              <tr
                key={invoice.invoiceId}
                className="border-t border-slate-200 transition-all duration-200 hover:bg-indigo-50/40"
              >
                {/* Invoice */}

                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                      <FileText size={18} />
                    </div>

                    <div>
                      <h3 className="font-semibold text-slate-800">
                        {invoice.invoiceNumber || "-"}
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        {invoice.description || "No description"}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Vendor */}

                <td className="px-6 py-5 text-slate-700">
                  {invoice.vendorName || "-"}
                </td>

                {/* Amount */}

                <td className="px-6 py-5 font-medium text-slate-700">
                  ₹ {invoice.amount || "-"}
                </td>

                {/* Status */}

                <td className="px-6 py-5">
                  <InvoiceStatusBadge status={invoice.status} />
                </td>

                {/* Actions */}

                <td className="px-6 py-5">
                  <div className="flex items-center justify-center gap-2">
                    <Link
                      to={`/vendor/invoices/${invoice.invoiceId}`}
                      title="View"
                      className="rounded-lg p-2 text-indigo-600 transition hover:bg-indigo-50"
                    >
                      <Eye size={18} />
                    </Link>

                    <button
                      title="Edit"
                      onClick={() => onEdit?.(invoice)}
                      className="rounded-lg p-2 text-blue-600 transition hover:bg-blue-50"
                    >
                      <Pencil size={18} />
                    </button>

                    {invoice.status !== "SUBMITTED" &&
                      invoice.status !== "APPROVED" &&
                      invoice.status !== "REJECTED" && (
                        <button
                          title="Submit"
                          onClick={() => onSubmit?.(invoice.invoiceId)}
                          className="rounded-lg p-2 text-green-600 transition hover:bg-green-50"
                        >
                          <Send size={18} />
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
        {invoices.map((invoice) => (
          <div
            key={invoice.invoiceId}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md"
          >
            {/* Header */}

            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                <FileText size={20} />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="truncate text-lg font-semibold text-slate-800">
                  {invoice.invoiceNumber || "-"}
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  {invoice.description || "No description"}
                </p>
              </div>
            </div>

            {/* Details */}

            <div className="mt-5 space-y-4 border-t border-slate-200 pt-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-500">
                  Vendor
                </span>

                <span className="text-sm font-semibold text-slate-700">
                  {invoice.vendorName || "-"}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-500">
                  Amount
                </span>

                <span className="font-semibold text-slate-800">
                  ₹ {invoice.amount || "-"}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-500">
                  Status
                </span>

                <InvoiceStatusBadge status={invoice.status} />
              </div>
            </div>

            {/* Actions */}

            <div className="mt-6 flex items-center justify-end gap-2 border-t border-slate-200 pt-4">
              <Link
                to={`/vendor/invoices/${invoice.invoiceId}`}
                title="View"
                className="rounded-xl bg-indigo-50 p-2.5 text-indigo-600 transition-all hover:bg-indigo-100"
              >
                <Eye size={18} />
              </Link>

              <button
                title="Edit"
                onClick={() => onEdit?.(invoice)}
                className="rounded-xl bg-blue-50 p-2.5 text-blue-600 transition-all hover:bg-blue-100"
              >
                <Pencil size={18} />
              </button>

              {invoice.status !== "SUBMITTED" &&
                invoice.status !== "APPROVED" &&
                invoice.status !== "REJECTED" && (
                  <button
                    title="Submit"
                    onClick={() => onSubmit?.(invoice.invoiceId)}
                    className="rounded-xl bg-green-50 p-2.5 text-green-600 transition-all hover:bg-green-100"
                  >
                    <Send size={18} />
                  </button>
                )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InvoiceTable;
