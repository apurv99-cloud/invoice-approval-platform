import { CreditCard, Eye } from "lucide-react";
import PaymentMethodBadge from "./PaymentMethodBadge";

const PaymentTable = ({ payments, loading, onView }) => {
  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center dark:border-slate-800 dark:bg-slate-900">
        <p className="text-slate-500 dark:text-slate-400">Loading payments...</p>
      </div>
    );
  }

  if (!payments?.length) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center dark:border-slate-800 dark:bg-slate-900">
        <CreditCard size={42} className="mx-auto mb-4 text-slate-300 dark:text-slate-500" />

        <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-100">
          No Payments Found
        </h2>

        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Completed payments will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800">
          <thead className="bg-slate-50 dark:bg-slate-800/80">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                Invoice
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                Amount
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                Payment Method
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                Reference
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                Payment Date
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                Paid By
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                Remarks
              </th>

              {onView && (
                <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                  Actions
                </th>
              )}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 bg-white dark:divide-slate-800 dark:bg-slate-900">
            {payments.map((payment) => (
              <tr
                key={payment.paymentId}
                className="transition hover:bg-slate-50 dark:hover:bg-slate-800/70"
              >
                <td className="px-6 py-4 font-semibold text-slate-700 dark:text-slate-100">
                  {payment.invoiceNumber}
                </td>

                <td className="px-6 py-4 font-medium text-slate-700 dark:text-slate-200">
                  ₹ {Number(payment.amount || 0).toLocaleString("en-IN")}
                </td>

                <td className="px-6 py-4">
                  <PaymentMethodBadge method={payment.paymentMethod} />
                </td>

                <td className="px-6 py-4 font-mono text-sm text-slate-700 dark:text-slate-300">
                  {payment.paymentReference || "-"}
                </td>

                <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                  {payment.paymentDate || "-"}
                </td>

                <td className="px-6 py-4 text-slate-700 dark:text-slate-300">
                  {payment.paidBy || "-"}
                </td>

                <td
                  className="max-w-xs truncate px-6 py-4 text-slate-600 dark:text-slate-300"
                  title={payment.remarks}
                >
                  {payment.remarks || "-"}
                </td>

                {onView && (
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => onView(payment)}
                      className="rounded-lg p-2 text-indigo-600 transition hover:bg-indigo-100 dark:hover:bg-slate-800"
                      title="View Payment"
                    >
                      <Eye size={18} />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentTable;
