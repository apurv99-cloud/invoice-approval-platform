import { motion } from "framer-motion";

export default function StatsCard({
  title,
  value,
  icon: Icon,
  color = "bg-cyan-500",
}) {
  return (
    <motion.div
      whileHover={{
        y: -5,
        scale: 1.02,
      }}
      transition={{
        duration: 0.2,
      }}
      className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-400">{title}</p>

          <h2 className="mt-3 text-4xl font-bold text-white">{value}</h2>
        </div>

        <div
          className={`${color} flex h-16 w-16 items-center justify-center rounded-2xl text-white`}
        >
          <Icon size={30} />
        </div>
      </div>
    </motion.div>
  );
}
