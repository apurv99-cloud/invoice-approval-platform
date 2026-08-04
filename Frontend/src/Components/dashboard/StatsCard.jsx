import { TrendingUp } from "lucide-react";

const StatsCard = ({
  title,
  value,
  icon: Icon,
  color = "text-indigo-600",
  bgColor = "bg-indigo-50",
}) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">{title}</p>

          <h2 className="mt-3 text-4xl font-bold text-slate-800 dark:text-slate-100">{value}</h2>
        </div>

        <div
          className={`w-14 h-14 rounded-xl flex items-center justify-center ${bgColor}`}
        >
          {Icon ? (
            <Icon className={color} size={28} />
          ) : (
            <TrendingUp className={color} size={28} />
          )}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
