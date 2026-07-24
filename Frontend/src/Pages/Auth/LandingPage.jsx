import Login from "./Login";
import { Building2, ShieldCheck, Workflow, CircleCheckBig } from "lucide-react";

const features = [
  {
    icon: Building2,
    title: "Multi-Tenant Organizations",
    description:
      "Manage multiple organizations from one secure enterprise platform.",
  },
  {
    icon: Workflow,
    title: "Approval Workflows",
    description:
      "Automate configurable invoice approval chains for every organization.",
  },
  {
    icon: ShieldCheck,
    title: "Enterprise Security",
    description:
      "JWT authentication with role-based authorization and secure APIs.",
  },
];

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50">
      {/* Background */}

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f01f_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f01f_1px,transparent_1px)] bg-[size:70px_70px]" />

      <div className="absolute -top-20 sm:-top-32 left-0 sm:left-10 h-72 w-72 sm:h-[420px] sm:w-[420px] rounded-full bg-indigo-200 opacity-40 blur-3xl" />

      <div className="absolute bottom-0 right-0 h-72 w-72 sm:h-[450px] sm:w-[450px] rounded-full bg-cyan-200 opacity-40 blur-3xl" />

      <div className="relative mx-auto max-w-7xl min-h-screen px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 flex items-center">
        <div className="grid w-full items-center gap-10 lg:gap-24 lg:grid-cols-[1.05fr_0.95fr]">
          {/* LEFT */}

          <div className="order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white px-4 py-2 text-xs sm:text-sm font-semibold text-indigo-700 shadow-sm">
              <CircleCheckBig size={16} />
              Trusted Enterprise Platform
            </div>

            <h1 className="mt-6 sm:mt-8 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-slate-900">
              Enterprise
              <span className="block bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Invoice Approval
              </span>
              Platform
            </h1>

            <p className="mt-5 sm:mt-8 max-w-2xl text-base sm:text-lg leading-7 sm:leading-8 text-slate-600">
              Streamline invoice approvals, payment processing, organization
              management and role-based access from one secure enterprise-grade
              platform.
            </p>

            {/* Stats */}

            <div className="mt-8 sm:mt-12 grid grid-cols-3 gap-4 sm:gap-8">
              <div className="text-center sm:text-left">
                <h2 className="text-xl sm:text-3xl font-bold text-slate-900">
                  Multi
                </h2>

                <p className="mt-1 text-xs sm:text-base text-slate-500">
                  Organizations
                </p>
              </div>

              <div className="text-center sm:text-left">
                <h2 className="text-xl sm:text-3xl font-bold text-slate-900">
                  RBAC
                </h2>

                <p className="mt-1 text-xs sm:text-base text-slate-500">
                  Security
                </p>
              </div>

              <div className="text-center sm:text-left">
                <h2 className="text-xl sm:text-3xl font-bold text-slate-900">
                  24×7
                </h2>

                <p className="mt-1 text-xs sm:text-base text-slate-500">
                  Availability
                </p>
              </div>
            </div>

            {/* Features */}

            <div className="mt-10 sm:mt-14 space-y-4 sm:space-y-5">
              {features.map((feature) => {
                const Icon = feature.icon;

                return (
                  <div
                    key={feature.title}
                    className="group flex items-start gap-4 sm:gap-5 rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-300 hover:shadow-lg"
                  >
                    <div className="rounded-xl bg-indigo-100 p-2.5 sm:p-3 transition group-hover:bg-indigo-600 shrink-0">
                      <Icon
                        size={20}
                        className="text-indigo-600 group-hover:text-white"
                      />
                    </div>

                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-slate-800">
                        {feature.title}
                      </h3>

                      <p className="mt-1 sm:mt-2 text-sm leading-6 text-slate-500">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT */}

          <div className="order-1 lg:order-2 flex items-center justify-center lg:justify-end">
            <div className="w-full max-w-md lg:max-w-xl rounded-3xl border border-slate-200 bg-white p-5 sm:p-8 lg:p-10 shadow-[0_35px_80px_rgba(99,102,241,0.15)]">
              <Login />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
