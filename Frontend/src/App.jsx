import { Routes, Route } from "react-router-dom";

import LandingPage from "./Pages/Auth/LandingPage";

import ProtectedRoute from "./Routes/ProtectedRoute";
import RoleRoute from "./Routes/RoleRoute";

import DashboardLayout from "./Components/Layouts/DashboardLayout";

// Super Admin Pages
import Dashboard from "./Pages/SuperAdmin/Dashboard";
import Organizations from "./Pages/SuperAdmin/Organizations";
import Profile from "./Pages/SuperAdmin/Profile";
import OrganizationOnboarding from "./Pages/Auth/OrganizationOnboarding";

import OrganizationAdminDashboard from "./Pages/OrganizationAdmin/Dashboard";
import OrganizationAdminUsers from "./Pages/OrganizationAdmin/Users";
import OrganizationAdminProfile from "./Pages/OrganizationAdmin/Profile";
import OrganizationAdminInvoices from "./Pages/OrganizationAdmin/Invoices";

import VendorDashboard from "./Pages/Vendor/Dashboard";
import VendorMyInvoices from "./Pages/Vendor/MyInvoices";
import VendorCreateInvoice from "./Pages/Vendor/CreateInvoice";
import VendorInvoiceDetails from "./Pages/Vendor/InvoiceDetails";
import VendorProfile from "./Pages/Vendor/Profile";

import ReviewerDashboard from "./Pages/Reviewer/Dashboard";
import ReviewerPendingInvoices from "./Pages/Reviewer/PendingInvoices";
import ReviewerInvoiceDetails from "./Pages/Reviewer/InvoiceDetails";
import ReviewerApprovalHistory from "./Pages/Reviewer/ApprovalHistory";
import ReviewerProfile from "./Pages/Reviewer/Profile";

import FinanceDashboard from "./Pages/Finance/Dashboard";
import FinanceApprovedInvoices from "./Pages/Finance/ApprovedInvoices";
import FinancePaymentDetails from "./Pages/Finance/PaymentDetails";
import FinancePayments from "./Pages/Finance/Payments";
import FinanceReports from "./Pages/Finance/Reports";
import FinanceProfile from "./Pages/Finance/Profile";

const Unauthorized = () => (
  <div className="flex items-center justify-center h-screen text-3xl font-bold">
    403 - Unauthorized
  </div>
);

const NotFound = () => (
  <div className="flex items-center justify-center h-screen text-3xl font-bold">
    404 - Page Not Found
  </div>
);

function App() {
  return (
    <Routes>
      {/* ==================CompleteOnboardingForm===================*/}
      <Route path="/complete-onboarding" element={<OrganizationOnboarding />} />
      {/* ================= Public ================= */}
      <Route path="/" element={<LandingPage />} />

      {/* ================= Super Admin ================= */}
      <Route
        path="/super-admin"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRoles={["SUPER_ADMIN"]}>
              <DashboardLayout />
            </RoleRoute>
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="organizations" element={<Organizations />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      {/* ================= Organization Admin ================= */}
      <Route
        path="/organization"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRoles={["ORG_ADMIN"]}>
              <DashboardLayout />
            </RoleRoute>
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<OrganizationAdminDashboard />} />
        <Route path="invoices" element={<OrganizationAdminInvoices />} />
        <Route path="users" element={<OrganizationAdminUsers />} />
        <Route path="profile" element={<OrganizationAdminProfile />} />
      </Route>

      {/* ================= Reviewer ================= */}
      <Route
        path="/reviewer"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRoles={["REVIEWER"]}>
              <DashboardLayout />
            </RoleRoute>
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<ReviewerDashboard />} />
        <Route path="pending" element={<ReviewerPendingInvoices />} />
        <Route
          path="invoices/:invoiceId"
          element={<ReviewerInvoiceDetails />}
        />
        <Route path="history" element={<ReviewerApprovalHistory />} />
        <Route path="profile" element={<ReviewerProfile />} />
      </Route>

      {/* ================= Finance ================= */}
      <Route
        path="/finance"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRoles={["FINANCE"]}>
              <DashboardLayout />
            </RoleRoute>
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<FinanceDashboard />} />
        <Route path="approved" element={<FinanceApprovedInvoices />} />
        <Route path="payments" element={<FinancePayments />} />
        <Route path="payments/:invoiceId" element={<FinancePaymentDetails />} />
        <Route path="reports" element={<FinanceReports />} />
        <Route path="profile" element={<FinanceProfile />} />
      </Route>

      {/* ================= Vendor ================= */}
      <Route
        path="/vendor"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRoles={["VENDOR"]}>
              <DashboardLayout />
            </RoleRoute>
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<VendorDashboard />} />
        <Route path="invoices/create" element={<VendorCreateInvoice />} />
        <Route path="invoices" element={<VendorMyInvoices />} />
        <Route path="invoices/:invoiceId" element={<VendorInvoiceDetails />} />
        <Route path="profile" element={<VendorProfile />} />
      </Route>

      {/* ================= Common ================= */}
      <Route path="/unauthorized" element={<Unauthorized />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
