import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Building2,
  Users,
  CheckCircle2,
  XCircle,
  Plus,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { getAllOrganizations } from "../../Service/OrganizationService";

export default function Dashboard() {
  const navigate = useNavigate();

  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrganizations();
  }, []);

  const loadOrganizations = async () => {
    try {
      setLoading(true);

      const data = await getAllOrganizations();

      setOrganizations(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const totalOrganizations = organizations.length;

  const activeOrganizations = organizations.filter((org) => org.active).length;

  const inactiveOrganizations = organizations.filter(
    (org) => !org.active,
  ).length;

  const totalUsers = organizations.reduce(
    (sum, org) => sum + (org.totalUsers || 0),
    0,
  );

  const cards = [
    {
      title: "Organizations",
      value: totalOrganizations,
      icon: Building2,
      color: "bg-cyan-500",
    },
    {
      title: "Active",
      value: activeOrganizations,
      icon: CheckCircle2,
      color: "bg-green-500",
    },
    {
      title: "Inactive",
      value: inactiveOrganizations,
      icon: XCircle,
      color: "bg-red-500",
    },
    {
      title: "Users",
      value: totalUsers,
      icon: Users,
      color: "bg-purple-500",
    },
  ];

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-cyan-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Super Admin Dashboard
          </h1>

          <p className="mt-2 text-slate-400">
            Enterprise overview of organizations.
          </p>
        </div>

        <button
          onClick={() => navigate("/organizations/create")}
          className="flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 font-semibold hover:bg-cyan-600"
        >
          <Plus size={18} />
          Create Organization
        </button>
      </div>

      {/* Stats */}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <motion.div
              key={card.title}
              whileHover={{ y: -4 }}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400">{card.title}</p>

                  <h2 className="mt-3 text-4xl font-bold">{card.value}</h2>
                </div>

                <div className={`rounded-xl ${card.color} p-4`}>
                  <Icon size={28} />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Recent Organizations */}

      <div className="rounded-2xl border border-slate-800 bg-slate-900">
        <div className="flex items-center justify-between border-b border-slate-800 p-6">
          <h2 className="text-xl font-bold">Recent Organizations</h2>

          <button
            onClick={() => navigate("/organizations")}
            className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300"
          >
            View All
            <ArrowRight size={18} />
          </button>
        </div>

        <div className="divide-y divide-slate-800">
          {organizations.slice(0, 5).map((org) => (
            <div
              key={org.organizationId}
              className="flex items-center justify-between p-5"
            >
              <div>
                <h3 className="font-semibold">{org.organizationName}</h3>

                <p className="text-sm text-slate-400">{org.email}</p>
              </div>

              <span
                className={`rounded-full px-4 py-1 text-sm ${
                  org.active
                    ? "bg-green-500/20 text-green-400"
                    : "bg-red-500/20 text-red-400"
                }`}
              >
                {org.active ? "Active" : "Inactive"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
