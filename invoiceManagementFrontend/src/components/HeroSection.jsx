import LoginCard from "./LoginCard";

export default function HeroSection() {
  return (
    <section
      className="
      max-w-6xl
      mx-auto

      px-6
      py-20

      grid
      grid-cols-1
      lg:grid-cols-2

      gap-16

      items-center
      "
    >
      {/* Left */}

      <div>
        <div
          className="
          inline-flex

          items-center

          gap-2

          px-4
          py-2

          rounded-full

          border
          border-white/10

          bg-white/[0.04]

          text-sm
          text-white/70
          "
        >
          <span className="w-2 h-2 rounded-full bg-green-400" />
          Smart • Secure • Scalable
        </div>

        <h1
          className="
          mt-8

          text-5xl
          md:text-6xl

          font-bold

          leading-tight
          "
        >
          Invoice approvals
          <br />
          built for
          <br />
          modern teams.
        </h1>

        <p
          className="
          mt-6

          text-lg

          text-white/60

          max-w-xl

          leading-relaxed
          "
        >
          Manage invoice approvals, workflows, users and organizations from one
          secure platform designed for enterprise teams.
        </p>

        <div
          className="
          mt-10

          flex
          flex-col
          sm:flex-row

          gap-4
          "
        >
          <button
            className="
            px-7
            py-4

            rounded-full

            bg-white

            text-black

            font-medium
            "
          >
            Get Started
          </button>

          <button
            className="
            px-7
            py-4

            rounded-full

            border
            border-white/10

            bg-white/[0.03]
            "
          >
            Book Demo
          </button>
        </div>

        {/* Trust Row */}

        <div
          className="
          mt-12

          flex
          flex-wrap

          gap-3
          "
        >
          <div
            className="
            px-4
            py-2

            rounded-full

            border
            border-white/10

            text-sm
            text-white/70
            "
          >
            RBAC
          </div>

          <div
            className="
            px-4
            py-2

            rounded-full

            border
            border-white/10

            text-sm
            text-white/70
            "
          >
            Multi-Tenant
          </div>

          <div
            className="
            px-4
            py-2

            rounded-full

            border
            border-white/10

            text-sm
            text-white/70
            "
          >
            Workflow Engine
          </div>
        </div>
      </div>

      {/* Right */}

      <div className="flex justify-center lg:justify-end">
        <LoginCard />
      </div>
    </section>
  );
}
