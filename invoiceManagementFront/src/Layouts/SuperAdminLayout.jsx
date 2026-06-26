import { Outlet } from "react-router-dom";

import SuperAdminSidebar from "../components/Dashboard/SuperAdminSidebar";
import TopBar from "../components/Dashboard/TopBar";

export default function SuperAdminLayout() {
  return (
    <div className="flex min-h-screen bg-[#0F172A] text-white">
      {/* Sidebar */}

      <SuperAdminSidebar />

      {/* Main Content */}

      <div className="flex flex-col flex-1">
        {/* Top Navigation */}

        <TopBar />

        {/* Page Content */}

        <main className="flex-1 overflow-y-auto bg-[#111827] p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
