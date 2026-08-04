const InvoiceTimeline = ({ invoice }) => {
  const steps = [
    { label: "Draft", active: invoice?.status === "DRAFT" || invoice?.status === "SUBMITTED" || invoice?.status === "APPROVED" || invoice?.status === "REJECTED" },
    { label: "Submitted", active: invoice?.status === "SUBMITTED" || invoice?.status === "APPROVED" || invoice?.status === "REJECTED" },
    { label: "Approved", active: invoice?.status === "APPROVED" },
    { label: "Rejected", active: invoice?.status === "REJECTED" },
  ];

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900/70">
      <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Approval Timeline</h2>
      <div className="mt-4 space-y-3">
        {steps.map((step, index) => (
          <div key={step.label} className="flex items-center gap-3">
            <div className={`h-3 w-3 rounded-full ${step.active ? "bg-indigo-600" : "bg-slate-300 dark:bg-slate-700"}`} />
            <div className="text-sm text-slate-600 dark:text-slate-300">{step.label}</div>
            {index < steps.length - 1 && <div className="ml-1 h-px flex-1 bg-slate-300 dark:bg-slate-700" />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InvoiceTimeline;
