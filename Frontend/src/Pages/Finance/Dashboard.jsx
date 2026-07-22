import { useEffect, useMemo, useState } from "react";
import { CircleCheckBig, Clock3, IndianRupee, XCircle } from "lucide-react";
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
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to load finance dashboard.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const approvedInvoices = useMemo(
    () => invoices.filter((i) => i.status === "APPROVED"),
    [invoices],
  );

  const paidInvoices = useMemo(
    () => invoices.filter((i) => i.status === "PAID"),
    [invoices],
  );

  const rejectedInvoices = useMemo(
    () => invoices.filter((i) => i.status === "REJECTED"),
    [invoices],
  );

  const totalPaidAmount = paidInvoices.reduce(
    (sum, invoice) => sum + Number(invoice.amount || 0),
    0,
  );

  const stats = [
    {
      title: "Awaiting Payment",
      value: approvedInvoices.length,
      icon: Clock3,
      color: "text-amber-600",
      bgColor: "bg-amber-100",
    },
    {
      title: "Completed Payments",
      value: paidInvoices.length,
      icon: CircleCheckBig,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Total Paid Amount",
      value: `₹${totalPaidAmount.toLocaleString("en-IN")}`,
      icon: IndianRupee,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Rejected Invoices",
      value: rejectedInvoices.length,
      icon: XCircle,
      color: "text-red-600",
      bgColor: "bg-red-100",
    },
  ];

  const pieChartData = [
    {
      name: "Awaiting Payment",
      value: approvedInvoices.length,
    },
    {
      name: "Paid",
      value: paidInvoices.length,
    },
    {
      name: "Rejected",
      value: rejectedInvoices.length,
    },
  ];

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center text-lg font-medium text-slate-600">
        Loading finance dashboard...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* <DashboardHeader
        title="Finance Dashboard"
        subtitle="Monitor approved invoices, completed payments, and payment activity across the organization."
      /> */}

      <StatsGrid stats={stats} />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <StatusPieChart
          title="Invoice Payment Overview"
          description="Distribution of invoices awaiting payment, completed, and rejected."
          data={pieChartData}
        />

        <GrowthChart
          title="Invoice Approval Trend"
          description="Invoice activity across the organization."
          data={invoices}
          xKey="createdAt"
          dataKey="amount"
        />
      </div>

      <RecentList
        title="Recent Approved Invoices"
        subtitle="Invoices waiting for payment processing."
        items={approvedInvoices.slice(0, 5)}
        primaryField="invoiceNumber"
        secondaryField="vendorName"
        statusField="status"
        dateField="createdAt"
      />
    </div>
  );
};

export default Dashboard;
