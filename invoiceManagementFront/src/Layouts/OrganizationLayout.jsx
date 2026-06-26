import { Outlet } from "react-router-dom";
import OrganizationSidebar from "../components/Dashboard/OrganizationSidebar";
import TopBar from "../components/Dashboard/TopBar";

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-[#0F172A] text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Top Navigation */}
        <TopBar />

        {/* Page Content */}
        <main className="flex-1 p-8 overflow-y-auto bg-[#111827]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
