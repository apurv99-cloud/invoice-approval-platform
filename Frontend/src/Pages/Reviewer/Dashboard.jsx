import { useEffect, useState } from "react";
import { FileText, CircleCheckBig, Clock3, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";

import invoiceService from "../../Services/invoiceService";
import DashboardHeader from "../../Components/dashboard/DashboardHeader";
import StatsGrid from "../../Components/dashboard/StatsGrid";
import StatusPieChart from "../../Components/dashboard/StatusPieChart";
import GrowthChart from "../../Components/dashboard/GrowthChart";
import RecentList from "../../Components/dashboard/RecentList";

const Dashboard = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      const response = await invoiceService.getMyPendingInvoices();
      setInvoices(response || []);
    } catch (error) {
      toast.error(error?.message || "Failed to load reviewer dashboard.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const pendingCount = invoices.filter((invoice) => invoice.status === "SUBMITTED").length;
  const approvedCount = invoices.filter((invoice) => invoice.status === "APPROVED").length;
  const rejectedCount = invoices.filter((invoice) => invoice.status === "REJECTED").length;

  const stats = [
    {
      title: "Pending Review",
      value: pendingCount,
      icon: Clock3,
      color: "text-amber-600",
      bgColor: "bg-amber-100",
    },
    {
      title: "Approved",
      value: approvedCount,
      icon: CircleCheckBig,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Rejected",
      value: rejectedCount,
      icon: AlertCircle,
      color: "text-red-600",
      bgColor: "bg-red-100",
    },
    {
      title: "Total Assigned",
      value: invoices.length,
      icon: FileText,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
  ];

  const pieChartData = [
    { name: "Pending", value: pendingCount },
    { name: "Approved", value: approvedCount },
    { name: "Rejected", value: rejectedCount },
  ];

  if (loading) {
    return <div className="flex h-[70vh] items-center justify-center text-lg font-medium text-slate-600">Loading reviewer dashboard...</div>;
  }

  return (
    <div className="space-y-8">
      {/* <DashboardHeader
        title="Reviewer Dashboard"
        subtitle="Review invoice submissions, approve or reject them, and track your review queue."
      /> */}

      <StatsGrid stats={stats} />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <StatusPieChart title="Review Queue" description="Current distribution of invoices awaiting review." data={pieChartData} />
        <GrowthChart title="Review Trends" description="Approval activity over time." data={invoices} xKey="createdAt" dataKey="Reviews" />
      </div>

      <RecentList title="Pending Invoices" subtitle="Latest invoices assigned for review." items={invoices} primaryField="invoiceNumber" secondaryField="vendorName" statusField="status" dateField="createdAt" />
    </div>
  );
};

export default Dashboard;
