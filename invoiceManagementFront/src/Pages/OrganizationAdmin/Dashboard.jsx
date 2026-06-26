import { Users, UserCheck, UserX, Mail, Plus, Building2 } from "lucide-react";

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import StatsCard from "../../components/Dashboard/StatsCard";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      {/* Welcome Section */}

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl bg-gradient-to-r
        from-cyan-600
        to-blue-700
        p-8"
      >
        <h1 className="text-4xl font-bold text-white">
          Organization Dashboard
        </h1>

        <p className="mt-2 text-cyan-100">
          Manage your organization, users, permissions and workflow from one
          place.
        </p>
      </motion.div>

      {/* Stats */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatsCard title="Total Users" value="18" icon={<Users size={32} />} />

        <StatsCard
          title="Active Users"
          value="15"
          icon={<UserCheck size={32} />}
        />

        <StatsCard
          title="Inactive Users"
          value="3"
          icon={<UserX size={32} />}
        />

        <StatsCard
          title="Pending Invitations"
          value="2"
          icon={<Mail size={32} />}
        />
      </div>

      {/* Bottom Section */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}

        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6">
          <h2 className="text-xl font-semibold mb-6">Quick Actions</h2>

          <div className="space-y-4">
            <button
              onClick={() => navigate("/organization/users")}
              className="w-full flex items-center justify-between rounded-xl bg-slate-800 hover:bg-slate-700 transition p-4"
            >
              <div className="flex items-center gap-3">
                <Plus />

                <span>Create User</span>
              </div>
            </button>

            <button
              onClick={() => navigate("/organization/my-organization")}
              className="w-full flex items-center justify-between rounded-xl bg-slate-800 hover:bg-slate-700 transition p-4"
            >
              <div className="flex items-center gap-3">
                <Building2 />

                <span>View Organization</span>
              </div>
            </button>
          </div>
        </div>

        {/* Recent Activity */}

        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6">
          <h2 className="text-xl font-semibold mb-6">Recent Activity</h2>

          <div className="space-y-5">
            <div className="flex justify-between">
              <span className="text-slate-300">Rahul joined as Reviewer</span>

              <span className="text-slate-500">2 hrs ago</span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-300">Finance user activated</span>

              <span className="text-slate-500">Yesterday</span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-300">
                Organization profile updated
              </span>

              <span className="text-slate-500">3 days ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
