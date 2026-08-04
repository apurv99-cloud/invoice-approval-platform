const StatusBadge = ({ active }) => {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        active
          ? "bg-emerald-500/15 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-300"
          : "bg-rose-500/15 text-rose-600 dark:bg-rose-500/20 dark:text-rose-300"
      }`}
    >
      {active ? "Active" : "Inactive"}
    </span>
  );
};

export default StatusBadge;
