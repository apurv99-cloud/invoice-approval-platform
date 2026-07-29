import {
  LayoutDashboard,
  Building2,
  Users,
  FileText,
  ClipboardCheck,
  CreditCard,
  UserCircle,
} from "lucide-react";

const sidebarConfig = {
  SUPER_ADMIN: [
    {
      label: "Dashboard",
      path: "/super-admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Organizations",
      path: "/super-admin/organizations",
      icon: Building2,
    },
    {
      label: "Profile",
      path: "/super-admin/profile",
      icon: UserCircle,
    },
  ],

  ORG_ADMIN: [
    {
      label: "Dashboard",
      path: "/organization/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Invoices",
      path: "/organization/invoices",
      icon: FileText,
    },
    {
      label: "Users",
      path: "/organization/users",
      icon: Users,
    },
    {
      label: "Profile",
      path: "/organization/profile",
      icon: UserCircle,
    },
  ],

  REVIEWER: [
    {
      label: "Dashboard",
      path: "/reviewer/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Pending",
      path: "/reviewer/pending",
      icon: ClipboardCheck,
    },
    {
      label: "History",
      path: "/reviewer/history",
      icon: ClipboardCheck,
    },
    {
      label: "Profile",
      path: "/reviewer/profile",
      icon: UserCircle,
    },
  ],

  FINANCE: [
    {
      label: "Dashboard",
      path: "/finance/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Approved",
      path: "/finance/approved",
      icon: ClipboardCheck,
    },
    {
      label: "Payments",
      path: "/finance/payments",
      icon: CreditCard,
    },
    {
      label: "Reports",
      path: "/finance/reports",
      icon: FileText,
    },
    {
      label: "Profile",
      path: "/finance/profile",
      icon: UserCircle,
    },
  ],

  CFO: [
    {
      label: "Dashboard",
      path: "/cfo/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Approvals",
      path: "/cfo/approvals",
      icon: ClipboardCheck,
    },
    {
      label: "Profile",
      path: "/cfo/profile",
      icon: UserCircle,
    },
  ],

  VENDOR: [
    {
      label: "Dashboard",
      path: "/vendor/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Create Invoice",
      path: "/vendor/create-invoice",
      icon: FileText,
    },
    {
      label: "My Invoices",
      path: "/vendor/invoices",
      icon: FileText,
    },
    {
      label: "Profile",
      path: "/vendor/profile",
      icon: UserCircle,
    },
  ],
};

export default sidebarConfig;
