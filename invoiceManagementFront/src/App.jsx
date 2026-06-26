import { Routes, Route } from "react-router-dom";

// Public Pages
import LandingPage from "./Pages/LandingPage";
import OrganizationOnboarding from "./Pages/Onboarding/OrganizationOnboarding";

// Super Admin Pages
import SuperAdminDashboard from "./Pages/SuperAdmin/Dashboard";
import Organizations from "./Pages/SuperAdmin/Organizations";
import CreateOrganizations from "./Pages/SuperAdmin/CreateOrganizations";

// Organization Admin Pages
import OrganizationDashboard from "./Pages/OrganizationAdmin/Dashboard";
import Users from "./Pages/OrganizationAdmin/Users";

// Layouts
import SuperAdminLayout from "./Layouts/SuperAdminLayout";
import OrganizationLayout from "./Layouts/OrganizationLayout";

// Security
import ProtectedRoute from "./Components/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* ==========================================
                  Public Routes
      ========================================== */}

      <Route path="/" element={<LandingPage />} />

      <Route path="/onboard" element={<OrganizationOnboarding />} />

      {/* ==========================================
                Super Admin Routes
      ========================================== */}

      <Route
        element={
          <ProtectedRoute allowedRoles={["ROLE_SUPER_ADMIN"]}>
            <SuperAdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<SuperAdminDashboard />} />

        <Route path="/organizations" element={<Organizations />} />

        <Route path="/organizations/create" element={<CreateOrganizations />} />
      </Route>

      {/* ==========================================
             Organization Admin Routes
      ========================================== */}

      <Route
        element={
          <ProtectedRoute allowedRoles={["ROLE_ORG_ADMIN"]}>
            <OrganizationLayout />
          </ProtectedRoute>
        }
      >
        <Route
          path="/organization/dashboard"
          element={<OrganizationDashboard />}
        />

        <Route path="/organization/users" element={<Users />} />
      </Route>
    </Routes>
  );
}

export default App;
