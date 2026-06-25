import { ShieldCheck, Building2, Workflow } from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      icon: <ShieldCheck size={24} />,
      title: "Role-Based Access",
      description: "Control access using enterprise-grade RBAC permissions.",
    },

    {
      icon: <Building2 size={24} />,
      title: "Multi-Tenant",
      description: "Manage multiple organizations securely from one platform.",
    },

    {
      icon: <Workflow size={24} />,
      title: "Approval Workflow",
      description: "Configure invoice approval chains and business rules.",
    },
  ];

  return (
    <section
      className="
      max-w-6xl
      mx-auto

      px-6

      pb-24
      "
    >
      <div className="text-center">
        <p className="text-white/50">Features</p>

        <h2
          className="
          mt-3

          text-4xl

          font-bold
          "
        >
          Everything you need
        </h2>

        <p
          className="
          mt-4

          text-white/60

          max-w-2xl

          mx-auto
          "
        >
          Built for enterprise invoice approval systems with security,
          scalability and simplicity.
        </p>
      </div>

      <div
        className="
        mt-14

        grid
        grid-cols-1
        md:grid-cols-3

        gap-6
        "
      >
        {features.map((feature) => (
          <div
            key={feature.title}
            className="
            p-6

            rounded-3xl

            border
            border-white/10

            bg-white/[0.03]

            hover:bg-white/[0.05]

            transition
            "
          >
            <div className="text-white mb-5">{feature.icon}</div>

            <h3
              className="
              text-xl

              font-semibold
              "
            >
              {feature.title}
            </h3>

            <p
              className="
              mt-3

              text-white/60

              leading-relaxed
              "
            >
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
