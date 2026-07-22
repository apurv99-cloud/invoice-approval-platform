// import { useEffect, useState } from "react";
// import { Building2, CircleCheckBig, CircleDashed, Clock3 } from "lucide-react";
// import toast from "react-hot-toast";

// import organizationService from "../../Services/organizationService";

// import DashboardHeader from "../../Components/dashboard/DashboardHeader";
// import StatsGrid from "../../Components/dashboard/StatsGrid";
// import StatusPieChart from "../../Components/dashboard/StatusPieChart";
// import GrowthChart from "../../Components/dashboard/GrowthChart";
// import RecentOrganizations from "../../Components/dashboard/RecentOrganizations";

// const Dashboard = () => {
//   const [organizations, setOrganizations] = useState([]);
//   const [loading, setLoading] = useState(true);

//   /**
//    * Fetch Organizations
//    */
//   const fetchOrganizations = async () => {
//     try {
//       setLoading(true);

//       const response = await organizationService.getAllOrganizations();

//       setOrganizations(response);
//     } catch (error) {
//       toast.error(error?.message || "Failed to fetch dashboard data.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchOrganizations();
//   }, []);

//   /**
//    * Dashboard Statistics
//    */

//   const totalOrganizations = organizations.length;

//   const activeOrganizations = organizations.filter((org) => org.active).length;

//   const pendingOnboarding = organizations.filter(
//     (org) => !org.onboardingCompleted,
//   ).length;

//   const completedOnboarding = organizations.filter(
//     (org) => org.onboardingCompleted,
//   ).length;

//   /**
//    * Stats Cards Data
//    */

//   const stats = [
//     {
//       title: "Organizations",
//       value: totalOrganizations,
//       icon: Building2,
//       color: "text-blue-600",
//       bgColor: "bg-blue-100",
//     },
//     {
//       title: "Active Organizations",
//       value: activeOrganizations,
//       icon: CircleCheckBig,
//       color: "text-green-600",
//       bgColor: "bg-green-100",
//     },
//     {
//       title: "Pending Onboarding",
//       value: pendingOnboarding,
//       icon: Clock3,
//       color: "text-yellow-600",
//       bgColor: "bg-yellow-100",
//     },
//     {
//       title: "Completed Onboarding",
//       value: completedOnboarding,
//       icon: CircleDashed,
//       color: "text-purple-600",
//       bgColor: "bg-purple-100",
//     },
//   ];

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-[70vh] text-lg font-medium">
//         Loading Dashboard...
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-8">
//       {/* Dashboard Header */}

//       <DashboardHeader
//         title="Super Admin Dashboard"
//         subtitle="Monitor organizations, onboarding progress and platform statistics."
//       />

//       {/* Stats */}

//       <StatsGrid stats={stats} />

//       {/* Charts */}

//       <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
//         <StatusPieChart organizations={organizations} />

//         <GrowthChart organizations={organizations} />
//       </div>

//       {/* Recent Organizations */}

//       <RecentOrganizations organizations={organizations} />
//     </div>
//   );
// };

// export default Dashboard;

import { useEffect, useState } from "react";
import { Building2, CircleCheckBig, CircleDashed, Clock3 } from "lucide-react";
import toast from "react-hot-toast";

import organizationService from "../../Services/organizationService";

import DashboardHeader from "../../Components/dashboard/DashboardHeader";
import StatsGrid from "../../Components/dashboard/StatsGrid";
import StatusPieChart from "../../Components/dashboard/StatusPieChart";
import GrowthChart from "../../Components/dashboard/GrowthChart";
import RecentList from "../../Components/dashboard/RecentList";

const Dashboard = () => {
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);

  /**
   * Fetch Organizations
   */
  const fetchOrganizations = async () => {
    try {
      setLoading(true);

      const response = await organizationService.getAllOrganizations();

      setOrganizations(response || []);
    } catch (error) {
      toast.error(error?.message || "Failed to fetch dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrganizations();
  }, []);

  /**
   * Statistics
   */

  const totalOrganizations = organizations.length;

  const activeOrganizations = organizations.filter((org) => org.active).length;

  const inactiveOrganizations = organizations.filter(
    (org) => !org.active,
  ).length;

  const pendingOnboarding = organizations.filter(
    (org) => !org.onboardingCompleted,
  ).length;

  const completedOnboarding = organizations.filter(
    (org) => org.onboardingCompleted,
  ).length;

  /**
   * Stats Cards
   */

  const stats = [
    {
      title: "Organizations",
      value: totalOrganizations,
      icon: Building2,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Active Organizations",
      value: activeOrganizations,
      icon: CircleCheckBig,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Pending Onboarding",
      value: pendingOnboarding,
      icon: Clock3,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
    {
      title: "Completed Onboarding",
      value: completedOnboarding,
      icon: CircleDashed,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ];

  /**
   * Pie Chart Data
   */

  const pieChartData = [
    {
      name: "Active",
      value: activeOrganizations,
    },
    {
      name: "Inactive",
      value: inactiveOrganizations,
    },
    {
      name: "Completed",
      value: completedOnboarding,
    },
    {
      name: "Pending",
      value: pendingOnboarding,
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[70vh] text-lg font-medium">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}

      {/* <DashboardHeader
        title="Super Admin Dashboard"
        subtitle="Monitor organizations, onboarding progress and platform statistics."
      /> */}

      {/* Statistics */}

      <StatsGrid stats={stats} />

      {/* Charts */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <StatusPieChart
          title="Organization Status"
          description="Distribution of organization activity and onboarding progress."
          data={pieChartData}
        />

        <GrowthChart
          title="Organization Growth"
          description="Organizations created over time."
          data={organizations}
          xKey="createdAt"
          dataKey="Organizations"
        />
      </div>

      {/* Recent Organizations */}

      <RecentList
        title="Recent Organizations"
        subtitle="Latest registered organizations."
        items={organizations}
        primaryField="organizationName"
        secondaryField="businessType"
        statusField="active"
        dateField="createdAt"
      />
    </div>
  );
};

export default Dashboard;
