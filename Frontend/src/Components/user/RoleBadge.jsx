const roleStyles = {
  SUPER_ADMIN: "bg-purple-500/15 text-purple-700 dark:bg-purple-500/20 dark:text-purple-300",
  ORG_ADMIN: "bg-indigo-500/15 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300",
  REVIEWER: "bg-amber-500/15 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300",
  FINANCE: "bg-emerald-500/15 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300",
  CFO: "bg-sky-500/15 text-sky-700 dark:bg-sky-500/20 dark:text-sky-300",
  VENDOR: "bg-pink-500/15 text-pink-700 dark:bg-pink-500/20 dark:text-pink-300",
};

const roleLabels = {
  SUPER_ADMIN: "Super Admin",
  ORG_ADMIN: "Org Admin",
  REVIEWER: "Reviewer",
  FINANCE: "Finance",
  CFO: "CFO",
  DIRECTOR: "DIRECTOR",
  VENDOR: "Vendor",
};

const RoleBadge = ({ roleName }) => {
  const style = roleStyles[roleName] || "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200";
  const label = roleLabels[roleName] || roleName || "Unknown";

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${style}`}>
      {label}
    </span>
  );
};

export default RoleBadge;
