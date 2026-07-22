// import { useEffect, useState } from "react";
// import { Users, UserCheck, UserX, ShieldCheck } from "lucide-react";
// import toast from "react-hot-toast";

// import userService from "../../Services/userService";

// import DashboardHeader from "../../Components/dashboard/DashboardHeader";
// import StatsGrid from "../../Components/dashboard/StatsGrid";

// const Dashboard = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchUsers = async () => {
//     try {
//       setLoading(true);

//       const response = await userService.getMyOrganizationUsers();

//       setUsers(response || []);
//     } catch (error) {
//       toast.error(error?.message || "Failed to fetch dashboard data.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const totalUsers = users.length;
//   const activeUsers = users.filter((user) => user.active).length;
//   const inactiveUsers = users.filter((user) => !user.active).length;
//   const adminUsers = users.filter((user) =>
//     ["ORG_ADMIN", "SUPER_ADMIN"].includes(user.roleName),
//   ).length;

//   const stats = [
//     {
//       title: "Total Users",
//       value: totalUsers,
//       icon: Users,
//       color: "text-blue-600",
//       bgColor: "bg-blue-100",
//     },
//     {
//       title: "Active Users",
//       value: activeUsers,
//       icon: UserCheck,
//       color: "text-green-600",
//       bgColor: "bg-green-100",
//     },
//     {
//       title: "Inactive Users",
//       value: inactiveUsers,
//       icon: UserX,
//       color: "text-red-600",
//       bgColor: "bg-red-100",
//     },
//     {
//       title: "Admin Users",
//       value: adminUsers,
//       icon: ShieldCheck,
//       color: "text-indigo-600",
//       bgColor: "bg-indigo-100",
//     },
//   ];

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-[70vh] text-lg font-medium text-slate-600">
//         Loading dashboard...
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-8">
//       <DashboardHeader
//         title="Organization Admin Dashboard"
//         subtitle="Track team access, user status, and organizational activity."
//       />

//       <StatsGrid stats={stats} />

//       <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
//         <h2 className="text-xl font-semibold text-slate-800">
//           Team Snapshot
//         </h2>

//         <p className="mt-2 text-slate-500">
//           Your organization currently has {totalUsers} user accounts with {activeUsers} active and {inactiveUsers} inactive members.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import { useEffect, useState } from "react";
import { Users, UserCheck, UserX, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";

import userService from "../../Services/userService";

import DashboardHeader from "../../Components/dashboard/DashboardHeader";
import StatsGrid from "../../Components/dashboard/StatsGrid";
import StatusPieChart from "../../Components/dashboard/StatusPieChart";
import GrowthChart from "../../Components/dashboard/GrowthChart";
import RecentList from "../../Components/dashboard/RecentList";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  /**
   * Fetch Users
   */
  const fetchUsers = async () => {
    try {
      setLoading(true);

      const response = await userService.getMyOrganizationUsers();

      setUsers(response || []);
    } catch (error) {
      toast.error(error?.message || "Failed to fetch dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  /**
   * Statistics
   */

  const totalUsers = users.length;

  const activeUsers = users.filter((user) => user.active).length;

  const inactiveUsers = users.filter((user) => !user.active).length;

  const adminUsers = users.filter((user) =>
    ["ORG_ADMIN", "SUPER_ADMIN"].includes(user.roleName),
  ).length;

  /**
   * Dashboard Cards
   */

  const stats = [
    {
      title: "Total Users",
      value: totalUsers,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Active Users",
      value: activeUsers,
      icon: UserCheck,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Inactive Users",
      value: inactiveUsers,
      icon: UserX,
      color: "text-red-600",
      bgColor: "bg-red-100",
    },
    {
      title: "Admin Users",
      value: adminUsers,
      icon: ShieldCheck,
      color: "text-indigo-600",
      bgColor: "bg-indigo-100",
    },
  ];

  /**
   * Pie Chart Data
   */

  const pieChartData = [
    {
      name: "Active",
      value: activeUsers,
    },
    {
      name: "Inactive",
      value: inactiveUsers,
    },
    {
      name: "Admins",
      value: adminUsers,
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh] text-lg font-medium">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}

      {/* <DashboardHeader
        title="Organization Admin Dashboard"
        subtitle="Manage your organization's users and monitor account activity."
      /> */}

      {/* Statistics */}

      <StatsGrid stats={stats} />

      {/* Charts */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <StatusPieChart
          title="User Status"
          description="Distribution of active, inactive and administrator accounts."
          data={pieChartData}
        />

        <GrowthChart
          title="User Growth"
          description="Users added over time."
          data={users}
          xKey="createdAt"
          dataKey="Users"
        />
      </div>

      {/* Recent Users */}

      <RecentList
        title="Recent Users"
        subtitle="Latest users added to your organization."
        items={users}
        primaryField="fullName"
        secondaryField="roleName"
        statusField="active"
        dateField="createdAt"
      />
    </div>
  );
};

export default Dashboard;
