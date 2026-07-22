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
      const response = await invoiceService.getOrganizationInvoices();
      setInvoices(response || []);
    } catch (error) {
      toast.error(error?.message || "Failed to load invoices.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const totalInvoices = invoices.length;
  const submittedInvoices = invoices.filter((invoice) => invoice.status === "SUBMITTED").length;
  const draftInvoices = invoices.filter((invoice) => invoice.status === "DRAFT").length;
  const approvedInvoices = invoices.filter((invoice) => invoice.status === "APPROVED").length;
  const rejectedInvoices = invoices.filter((invoice) => invoice.status === "REJECTED").length;

  const stats = [
    {
      title: "Total Invoices",
      value: totalInvoices,
      icon: FileText,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Submitted",
      value: submittedInvoices,
      icon: CircleCheckBig,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Drafts",
      value: draftInvoices,
      icon: Clock3,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
    {
      title: "Rejected",
      value: rejectedInvoices,
      icon: AlertCircle,
      color: "text-red-600",
      bgColor: "bg-red-100",
    },
  ];

  const pieChartData = [
    { name: "Submitted", value: submittedInvoices },
    { name: "Draft", value: draftInvoices },
    { name: "Approved", value: approvedInvoices },
    { name: "Rejected", value: rejectedInvoices },
  ];

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center text-lg font-medium text-slate-600">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* <DashboardHeader
        title="Vendor Dashboard"
        subtitle="Track invoice submissions, review statuses, and manage your billing workflow."
      /> */}

      <StatsGrid stats={stats} />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <StatusPieChart
          title="Invoice Status"
          description="Current distribution of invoices by workflow state."
          data={pieChartData}
        />

        <GrowthChart
          title="Invoice Growth"
          description="Invoices created over time."
          data={invoices}
          xKey="createdAt"
          dataKey="Invoices"
        />
      </div>

      <RecentList
        title="Recent Invoices"
        subtitle="Latest invoices submitted by your organization."
        items={invoices}
        primaryField="invoiceNumber"
        secondaryField="vendorName"
        statusField="status"
        dateField="createdAt"
      />
    </div>
  );
};

export default Dashboard;
