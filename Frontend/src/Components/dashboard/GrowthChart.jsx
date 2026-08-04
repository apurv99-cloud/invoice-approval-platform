// import {
//   ResponsiveContainer,
//   AreaChart,
//   Area,
//   CartesianGrid,
//   XAxis,
//   YAxis,
//   Tooltip,
// } from "recharts";

// const GrowthChart = ({ organizations = [] }) => {
//   /**
//    * Group organizations by creation date
//    */
//   const groupedData = organizations.reduce((acc, organization) => {
//     const date = new Date(organization.createdAt).toLocaleDateString("en-IN", {
//       day: "2-digit",
//       month: "short",
//     });

//     if (!acc[date]) {
//       acc[date] = 0;
//     }

//     acc[date]++;

//     return acc;
//   }, {});

//   /**
//    * Convert object into chart data
//    */
//   const chartData = Object.entries(groupedData).map(([date, count]) => ({
//     date,
//     organizations: count,
//   }));

//   return (
//     <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
//       {/* Header */}

//       <div className="mb-6">
//         <h2 className="text-xl font-semibold text-slate-800">
//           Organization Growth
//         </h2>

//         <p className="text-sm text-slate-500 mt-1">
//           Organizations created over time.
//         </p>
//       </div>

//       {/* Chart */}

//       <div className="h-[320px]">
//         <ResponsiveContainer width="100%" height="100%">
//           <AreaChart data={chartData}>
//             <defs>
//               <linearGradient id="growthColor" x1="0" y1="0" x2="0" y2="1">
//                 <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.4} />

//                 <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
//               </linearGradient>
//             </defs>

//             <CartesianGrid strokeDasharray="3 3" />

//             <XAxis dataKey="date" />

//             <YAxis allowDecimals={false} />

//             <Tooltip />

//             <Area
//               type="monotone"
//               dataKey="organizations"
//               stroke="#4f46e5"
//               strokeWidth={3}
//               fill="url(#growthColor)"
//             />
//           </AreaChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// export default GrowthChart;

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { useTheme } from "../../context/ThemeContext";

const GrowthChart = ({
  title = "Growth",
  description = "",
  data = [],
  xKey = "createdAt",
  dataKey = "Items",
}) => {
  const { isDark } = useTheme();
  const safeData = Array.isArray(data) ? data : [];
  const axisColor = isDark ? "#e2e8f0" : "#334155";
  const gridColor = isDark ? "#334155" : "#cbd5e1";
  const tooltipStyle = {
    backgroundColor: isDark ? "#0f172a" : "#ffffff",
    borderColor: isDark ? "#334155" : "#e2e8f0",
    color: isDark ? "#f8fafc" : "#0f172a",
  };
  /**
   * Group data by creation date
   */
  const groupedData = safeData.reduce((acc, item) => {
    if (!item[xKey]) return acc;

    const date = new Date(item[xKey]).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
    });

    if (!acc[date]) {
      acc[date] = 0;
    }

    acc[date]++;

    return acc;
  }, {});

  /**
   * Convert to chart data
   */
  const chartData = Object.entries(groupedData).map(([date, count]) => ({
    date,
    [dataKey]: count,
  }));

  return (
    <div
      className={`rounded-2xl border p-6 shadow-sm transition-colors duration-300 ${
        isDark
          ? "border-slate-800 bg-slate-900 text-slate-100"
          : "border-slate-200 bg-white text-slate-900"
      }`}
    >
      {/* Header */}

      <div className="mb-6">
        <h2 className={`text-xl font-semibold ${isDark ? "text-slate-100" : "text-slate-800"}`}>
          {title}
        </h2>

        {description && (
          <p className={`mt-1 text-sm ${isDark ? "text-slate-400" : "text-slate-500"}`}>
            {description}
          </p>
        )}
      </div>

      {/* Empty State */}

      {chartData.length === 0 ? (
        <div className={`flex h-[320px] items-center justify-center ${isDark ? "text-slate-400" : "text-slate-500"}`}>
          No growth data available.
        </div>
      ) : (
        <div className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="growthColor" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.4} />

                  <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid stroke={gridColor} strokeDasharray="3 3" />

              <XAxis dataKey="date" tick={{ fill: axisColor, fontSize: 12 }} axisLine={false} tickLine={false} />

              <YAxis allowDecimals={false} tick={{ fill: axisColor, fontSize: 12 }} axisLine={false} tickLine={false} />

              <Tooltip contentStyle={tooltipStyle} labelStyle={{ color: isDark ? "#f8fafc" : "#0f172a" }} />

              <Area
                type="monotone"
                dataKey={dataKey}
                stroke="#4f46e5"
                strokeWidth={3}
                fill="url(#growthColor)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default GrowthChart;
