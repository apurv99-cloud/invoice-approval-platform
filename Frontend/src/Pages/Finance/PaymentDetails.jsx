import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, CreditCard } from "lucide-react";
import toast from "react-hot-toast";

import invoiceService from "../../Services/invoiceService";
import DashboardHeader from "../../Components/dashboard/DashboardHeader";
import InvoiceStatusBadge from "../../Components/invoice/InvoiceStatusBadge";
import InvoiceTimeline from "../../Components/invoice/InvoiceTimeline";
import PaymentModal from "../../Components/Payment/PaymentModal";
import paymentService from "../../Services/paymentService";

const PaymentDetails = () => {
  const { invoiceId } = useParams();
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [processing, setProcessing] = useState(false);

  const fetchInvoice = async () => {
    try {
      setLoading(true);
      const response = await invoiceService.getInvoice(invoiceId);
      setInvoice(response);
    } catch (error) {
      toast.error(error?.message || "Failed to load payment details.");
    } finally {
      setLoading(false);
    }
  };
  const handlePayment = async (paymentData) => {
    try {
      setProcessing(true);

      await paymentService.createPayment(paymentData);

      toast.success("Payment processed successfully.");

      setShowPaymentModal(false);

      await fetchInvoice();

      navigate("/finance/payments");
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to process payment.",
      );
    } finally {
      setProcessing(false);
    }
  };

  useEffect(() => {
    fetchInvoice();
  }, [invoiceId]);

  const summaryItems = useMemo(
    () => [
      { label: "Invoice Number", value: invoice?.invoiceNumber || "-" },
      { label: "Vendor", value: invoice?.vendorName || "-" },
      { label: "Amount", value: invoice?.amount || "-" },
      { label: "Due Date", value: invoice?.dueDate || "-" },
      {
        label: "Status",
        value: <InvoiceStatusBadge status={invoice?.status} />,
      },
    ],
    [invoice],
  );

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center text-lg font-medium text-slate-600">
        Loading payment details...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900"
      >
        <ArrowLeft size={16} /> Back
      </button>

      <DashboardHeader
        title="Payment Details"
        subtitle="Review the approved invoice and prepare payment processing."
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2 text-indigo-600">
            <CreditCard size={18} />
            <h2 className="text-xl font-semibold text-slate-800">
              Invoice Information
            </h2>
          </div>
          <div className="mt-6 space-y-4">
            {summaryItems.map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between border-b border-slate-100 pb-3"
              >
                <span className="text-sm text-slate-500">{item.label}</span>
                <span className="text-sm font-medium text-slate-700">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-800">
              Payment Actions
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Record the payment details once the finance team has completed the
              transaction.
            </p>

            <div className="mt-6 space-y-4">
              <div className="rounded-xl bg-slate-50 p-4">
                <div className="flex justify-between">
                  <span className="text-sm text-slate-500">Invoice Amount</span>

                  <span className="font-semibold">₹ {invoice?.amount}</span>
                </div>

                <div className="mt-3 flex justify-between">
                  <span className="text-sm text-slate-500">Current Status</span>

                  <InvoiceStatusBadge status={invoice?.status} />
                </div>
              </div>

              <button
                disabled={invoice?.status === "PAID"}
                onClick={() => setShowPaymentModal(true)}
                className={`w-full rounded-xl px-4 py-3 font-medium text-white transition

      ${
        invoice?.status === "PAID"
          ? "cursor-not-allowed bg-slate-400"
          : "bg-indigo-600 hover:bg-indigo-700"
      }`}
              >
                {invoice?.status === "PAID"
                  ? "Already Paid"
                  : "Process Payment"}
              </button>
            </div>
            <PaymentModal
              open={showPaymentModal}
              invoice={invoice}
              processing={processing}
              onClose={() => setShowPaymentModal(false)}
              onConfirm={handlePayment}
            />
          </div>
          <InvoiceTimeline invoice={invoice} />
        </div>
      </div>
    </div>
  );
};

export default PaymentDetails;
