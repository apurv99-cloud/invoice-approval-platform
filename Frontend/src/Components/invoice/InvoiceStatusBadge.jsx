const InvoiceStatusBadge = ({ status }) => {
  const normalized = (status || "DRAFT").toUpperCase();

  const styles = {
    DRAFT: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200",
    SUBMITTED: "bg-blue-500/15 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300",
    APPROVED: "bg-emerald-500/15 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300",
    REJECTED: "bg-rose-500/15 text-rose-700 dark:bg-rose-500/20 dark:text-rose-300",
    PENDING: "bg-amber-500/15 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300",
  };

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${styles[normalized] || "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200"}`}>
      {normalized}
    </span>
  );
};

export default InvoiceStatusBadge;
