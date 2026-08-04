import Login from "./Login";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import {
  Building2,
  ShieldCheck,
  Workflow,
  CircleCheckBig,
  ArrowRight,
  ArrowUpRight,
  ReceiptText,
  History,
  Sparkles,
  FileText,
  ClipboardCheck,
  Wallet,
  BadgeCheck,
  CircleDollarSign,
  ChevronRight,
  Clock3,
} from "lucide-react";

const features = [
  {
    icon: Building2,
    title: "Multi-Tenant Organizations",
    description:
      "Manage multiple organizations securely from one centralized enterprise platform.",
  },
  {
    icon: Workflow,
    title: "Smart Approval Workflows",
    description:
      "Configure invoice approval chains based on amount, department and business rules.",
  },
  {
    icon: ShieldCheck,
    title: "Enterprise Security",
    description:
      "JWT Authentication, RBAC, audit logs and secure REST APIs for complete protection.",
  },
];

export default function LandingPage() {
  const { isDark, toggleTheme } = useTheme();

  const smoothScrollTo = (targetY, duration = 2200) => {
    const startY = window.scrollY;
    const distance = targetY - startY;
    const startTime = performance.now();

    const easeInOutQuad = (t) => {
      return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    };

    const step = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeInOutQuad(progress);

      window.scrollTo(0, startY + distance * easedProgress);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  };

  const scrollToFeatures = () => {
    const featuresSection = document.getElementById("features");
    if (featuresSection) {
      const targetY = featuresSection.getBoundingClientRect().top + window.scrollY - 24;
      smoothScrollTo(targetY, 1800);
    }
  };

  const scrollToBottom = () => {
    const targetY = Math.max(document.documentElement.scrollHeight - window.innerHeight, 0);
    smoothScrollTo(targetY, 2400);
  };

  const scrollToHero = () => {
    const heroSection = document.getElementById("hero");
    if (heroSection) {
      smoothScrollTo(heroSection.offsetTop, 1400);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-white text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
      {/* ================= Background ================= */}

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:70px_70px] dark:bg-[linear-gradient(to_right,#e2e8f01a_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f01a_1px,transparent_1px)]" />

      <div className="absolute -top-40 -left-20 h-[430px] w-[430px] rounded-full bg-indigo-300/40 blur-3xl" />

      <div className="absolute bottom-0 right-0 h-[450px] w-[450px] rounded-full bg-cyan-300/40 blur-3xl" />

      {/* ================= Hero ================= */}

      <div className="relative z-10 mx-auto flex max-w-7xl items-center justify-end px-5 pt-6 sm:px-8 lg:px-10">
        <button
          type="button"
          onClick={toggleTheme}
          className="flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm backdrop-blur transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900/90 dark:text-slate-200 dark:hover:bg-slate-800"
          aria-label="Toggle theme"
        >
          {isDark ? <Sun size={16} /> : <Moon size={16} />}
          <span>{isDark ? "Light" : "Dark"}</span>
        </button>
      </div>

      <section id="hero" className="relative mx-auto flex min-h-screen max-w-7xl items-center px-5 py-4 sm:px-8 lg:px-10">
        <div className="grid w-full gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-24">
          {/* LEFT */}

          <div className="order-2 lg:order-1 flex flex-col justify-center">
            {/* Badge */}

            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-indigo-200 bg-white px-5 py-2 text-sm font-semibold text-indigo-700 shadow-sm dark:border-indigo-400/30 dark:bg-slate-900 dark:text-indigo-300">
              <Sparkles size={16} />
              Trusted Enterprise Invoice Platform
            </div>

            {/* Heading */}

            <h1 className="mt-8 text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-slate-100">
              Welcome to
              <span className="mt-2 block bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent">
                InvoiceFlow
              </span>
            </h1>

            {/* Description */}

            <p className="mt-8 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg dark:text-slate-300">
              InvoiceFlow is an enterprise-grade invoice approval platform
              designed to simplify financial operations with configurable
              approval workflows, secure role-based access control, payment
              tracking and organization management-all from a single dashboard.
            </p>

            {/* Buttons */}

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <button className="rounded-xl bg-indigo-600 px-7 py-3 font-semibold text-white transition hover:bg-indigo-700">
                Login
              </button>

              <button
                onClick={scrollToBottom}
                className="flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-7 py-3 font-semibold text-slate-700 transition hover:border-indigo-500 hover:text-indigo-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-indigo-400 dark:hover:text-indigo-300"
              >
                Learn More
                <ArrowRight size={18} />
              </button>
            </div>

            {/* Stats */}

            <div className="mt-14 grid grid-cols-3 gap-5">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Multi</h2>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Organizations</p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">RBAC</h2>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Authorization</p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">24×7</h2>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Availability</p>
              </div>
            </div>

            {/* Small Feature Cards */}

            <div id="features" className="mt-14 grid gap-5">
              {features.map((feature) => {
                const Icon = feature.icon;

                return (
                  <div
                    key={feature.title}
                    className="group flex items-start gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-300 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
                  >
                    <div className="rounded-xl bg-indigo-100 p-3 transition group-hover:bg-indigo-600">
                      <Icon
                        size={22}
                        className="text-indigo-600 group-hover:text-white"
                      />
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
                        {feature.title}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT */}

          <div className="order-1 flex items-center justify-center lg:order-2 lg:justify-end">
            <div className="w-full max-w-md rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_35px_80px_rgba(99,102,241,0.15)] sm:max-w-lg sm:p-8 lg:max-w-xl lg:p-10 dark:border-slate-800 dark:bg-slate-900">
              <Login />
            </div>
          </div>
        </div>
      </section>
      {/* ================= Why InvoiceFlow ================= */}

      <section id="why" className="relative overflow-hidden py-24">
        {/* Background Glow */}

        <div className="absolute left-0 top-40 h-72 w-72 rounded-full bg-indigo-500/10 blur-[120px]" />
        <div className="absolute right-0 bottom-20 h-72 w-72 rounded-full bg-cyan-500/10 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          {/* Heading */}

          <div className="text-center">
            {/* <span className="inline-flex rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700">
              WHY CHOOSE INVOICEFLOW
            </span> */}

            <h2 className="mt-6 text-3xl font-bold text-slate-900 sm:text-5xl dark:text-slate-100">
              Built for Modern Finance Teams
            </h2>

            <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              InvoiceFlow simplifies invoice approvals through secure workflows,
              automation and enterprise-grade access control—all from one
              platform.
            </p>
          </div>

          {/* Layout */}

          <div className="mt-12 grid gap-8 lg:grid-cols-12">
            {/* ================= Left Dashboard ================= */}

            <div className="lg:col-span-7">
              <div className="group relative overflow-hidden rounded-[36px] border border-indigo-200 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-8 text-white shadow-[0_30px_80px_rgba(79,70,229,0.18)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_40px_90px_rgba(79,70,229,0.28)] dark:border-indigo-400/30">
                {/* Glow */}

                <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-cyan-500/20 blur-[120px]" />

                <div className="absolute bottom-0 left-0 h-52 w-52 rounded-full bg-indigo-500/20 blur-[100px]" />

                {/* Grid */}

                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:45px_45px]" />

                <div className="relative">
                  {/* Top */}

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-medium text-emerald-300">
                      Demo Dashboard
                      </span>

                      <h3 className="mt-4 text-3xl font-bold">
                        Enterprise Ready
                      </h3>

                      <p className="mt-3 max-w-lg leading-7 text-slate-300">
                        Manage invoice approvals, workflows and payments through
                        one secure enterprise platform.
                      </p>
                    </div>

                    <Sparkles
                      size={40}
                      className="text-indigo-300 transition duration-500 group-hover:rotate-12"
                    />
                  </div>

                  {/* Stats */}

                  <div className="mt-10 grid grid-cols-3 gap-4">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-lg">
                      <p className="text-sm text-slate-400">Pending</p>

                      <h4 className="mt-2 text-3xl font-bold">42</h4>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-lg">
                      <p className="text-sm text-slate-400">Approved</p>

                      <h4 className="mt-2 text-3xl font-bold text-emerald-400">
                        186
                      </h4>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-lg">
                      <p className="text-sm text-slate-400">Payments</p>

                      <h4 className="mt-2 text-3xl font-bold text-cyan-400">
                        ₹9.8L
                      </h4>
                    </div>
                  </div>

                  {/* Workflow Card */}

                  <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">Invoice #INV-2048</h4>

                        <p className="mt-1 text-sm text-slate-400">
                          Enterprise Software License
                        </p>
                      </div>

                      <span className="rounded-full bg-yellow-500/20 px-3 py-1 text-xs font-medium text-yellow-300">
                        In Review
                      </span>
                    </div>

                    {/* Progress */}

                    <div className="mt-6">
                      <div className="mb-2 flex justify-between text-sm">
                        <span className="text-slate-400">
                          Approval Progress
                        </span>

                        <span>75%</span>
                      </div>

                      <div className="h-2 overflow-hidden rounded-full bg-white/10">
                        <div className="h-full overflow-hidden rounded-full bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500">
                          <div className="h-full w-full animate-pulse bg-white/10" />
                        </div>
                      </div>
                    </div>

                    {/* Approval Steps */}

                    <div className="mt-7 space-y-4">
                      {[
                        ["Vendor Submitted", true],
                        ["Finance Verified", true],
                        ["Manager Approved", true],
                        ["CFO Approval", false],
                      ].map(([label, done]) => (
                        <div
                          key={label}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`flex h-8 w-8 items-center justify-center rounded-full ${
                                done
                                  ? "bg-emerald-500 text-white"
                                  : "bg-white/10 text-slate-400"
                              }`}
                            >
                              ✓
                            </div>

                            <span className="text-sm">{label}</span>
                          </div>

                          <span
                            className={`text-xs ${
                              done ? "text-emerald-400" : "text-yellow-400"
                            }`}
                          >
                            {done ? "Done" : "Pending"}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* ================= Recent Activity ================= */}

                    <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
                      <div className="mb-5 flex items-center justify-between">
                        <h4 className="font-semibold text-white">
                          Recent Activity
                        </h4>

                        <span className="rounded-full bg-cyan-500/20 px-3 py-1 text-xs text-cyan-300">
                          Demo
                        </span>
                      </div>

                      <div className="space-y-4">
                        {[
                          {
                            title: "Invoice INV-2048 approved",
                            time: "2 mins ago",
                            color: "bg-emerald-500",
                          },
                          {
                            title: "Finance verified INV-2039",
                            time: "16 mins ago",
                            color: "bg-blue-500",
                          },
                          {
                            title: "Vendor uploaded INV-2053",
                            time: "40 mins ago",
                            color: "bg-violet-500",
                          },
                        ].map((activity) => (
                          <div
                            key={activity.title}
                            className="flex items-center gap-4 rounded-xl border border-white/5 p-3 transition hover:border-cyan-400/30 hover:bg-white/5"
                          >
                            <div
                              className={`h-3 w-3 rounded-full ${activity.color} animate-pulse`}
                            />

                            <div>
                              <p className="text-sm text-white">
                                {activity.title}
                              </p>

                              <p className="text-xs text-slate-400">
                                {activity.time}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ================= Right Grid Starts Here ================= */}

            <div className="grid gap-6 sm:grid-cols-2 lg:col-span-5">
              {[
                {
                  icon: Building2,
                  title: "Multi-Tenant",
                  desc: "Complete isolation for multiple organizations with dedicated workspaces.",
                  color: "bg-indigo-100 text-indigo-600",
                },
                {
                  icon: ShieldCheck,
                  title: "Enterprise Security",
                  desc: "JWT authentication, RBAC and encrypted APIs keep every action secure.",
                  color: "bg-cyan-100 text-cyan-600",
                },
                {
                  icon: Workflow,
                  title: "Approval Engine",
                  desc: "Dynamic workflows based on invoice amount and approval hierarchy.",
                  color: "bg-emerald-100 text-emerald-600",
                },
                {
                  icon: CircleDollarSign,
                  title: "Payment Tracking",
                  desc: "Track every invoice until successful payment completion.",
                  color: "bg-orange-100 text-orange-600",
                },
                {
                  icon: History,
                  title: "Audit Logs",
                  desc: "Complete activity history for transparency and compliance.",
                  color: "bg-violet-100 text-violet-600",
                },
                {
                  icon: ReceiptText,
                  title: "Automation",
                  desc: "Reduce repetitive manual work with intelligent approval automation.",
                  color: "bg-pink-100 text-pink-600",
                },
              ].map((feature, index) => {
                const Icon = feature.icon;

                return (
                  <div
                    key={feature.title}
                    className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-3 hover:border-indigo-300 hover:shadow-2xl dark:border-slate-800 dark:bg-slate-900"
                  >
                    {/* Glow */}

                    <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-indigo-500/5 blur-2xl transition-all duration-500 group-hover:bg-indigo-500/15" />

                    {/* Number */}

                    <span className="absolute right-5 top-5 text-xs font-bold text-slate-300">
                      0{index + 1}
                    </span>

                    {/* Icon */}

                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-2xl ${feature.color} transition-all duration-500 group-hover:rotate-6 group-hover:scale-110`}
                    >
                      <Icon size={28} />
                    </div>

                    {/* Content */}

                    <h3 className="mt-6 text-xl font-bold text-slate-900 transition-colors duration-300 group-hover:text-indigo-600 dark:text-slate-100">
                      {feature.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                      {feature.desc}
                    </p>

                    {/* Bottom */}

                    <div className="mt-6 flex items-center justify-between">
                      <span className="text-sm font-medium text-indigo-600">
                        Learn More
                      </span>

                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 transition-all duration-300 group-hover:bg-indigo-600 group-hover:text-white">
                        <ArrowUpRight
                          size={18}
                          className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                        />
                      </div>
                    </div>

                    {/* Bottom Line */}

                    <div className="absolute bottom-0 left-0 h-1 w-0 rounded-r-full bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500 transition-all duration-500 group-hover:w-full" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ================= Platform Highlights ================= */}

      <section className="relative overflow-hidden border-t border-slate-200 bg-white py-20">
        {/* Low Density Grid Background */}

        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff15_1px,transparent_1px),linear-gradient(to_bottom,#ffffff15_1px,transparent_1px)] bg-[size:80px_80px]" />

        {/* Glow */}

        <div className="absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-indigo-600/20 blur-[130px]" />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          {/* Heading */}

          <div className="text-center">
            {/* <span className="inline-flex rounded-full border border-indigo-400/30 bg-indigo-500/10 px-4 py-2 text-sm font-semibold text-indigo-300">
              PLATFORM HIGHLIGHTS
            </span> */}

            <h2 className="mt-6 text-3xl font-bold text-slate-900 sm:text-4xl">
              Built for Enterprise Scale
            </h2>

            <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-600">
              Secure, scalable and optimized for organizations managing complex
              invoice approval workflows.
            </p>
          </div>

          {/* Cards */}

          <div className="mt-16 grid grid-cols-2 gap-5 lg:grid-cols-4">
            {[
              {
                icon: ShieldCheck,
                title: "100%",
                subtitle: "Secure Workflow",
                bg: "from-indigo-500 to-blue-500",
              },
              {
                icon: Building2,
                title: "Multi",
                subtitle: "Organizations",
                bg: "from-cyan-500 to-sky-500",
              },
              {
                icon: CircleDollarSign,
                title: "RBAC",
                subtitle: "Authorization",
                bg: "from-emerald-500 to-green-500",
              },
              {
                icon: Clock3,
                title: "24×7",
                subtitle: "Availability",
                bg: "from-orange-500 to-red-500",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="group rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-indigo-300 hover:shadow-xl"
                >
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r ${item.bg}`}
                  >
                    <Icon size={28} className="text-white" />
                  </div>

                  <h3 className="mt-6 text-3xl font-bold text-slate-900">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm text-slate-600">{item.subtitle}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      {/* ================= Workflow ================= */}

      <section className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10">
        {/* Heading */}

        <div className="text-center">
          {/* <span className="rounded-full bg-cyan-100 px-4 py-2 text-sm font-semibold text-cyan-700">
            WORKFLOW
          </span> */}

          <h2 className="mt-6 text-3xl font-bold text-slate-900 sm:text-4xl dark:text-slate-100">
            Invoice Approval Workflow
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            Every invoice follows a secure approval journey before payment,
            ensuring transparency, compliance and complete auditability.
          </p>
        </div>

        {/* Cards */}

        <div
          className="
      mt-16
      flex
      gap-5
      overflow-x-auto
      snap-x
      snap-mandatory
      pb-4
      scrollbar-hide
      lg:grid
      lg:grid-cols-5
      lg:gap-8
      lg:overflow-visible
    "
        >
          {[
            {
              title: "Vendor",
              description:
                "Vendor submits invoice along with supporting documents.",
              icon: FileText,
              bg: "bg-blue-100",
              text: "text-blue-600",
            },
            {
              title: "Reviewer",
              description:
                "Reviewer validates invoice details and verifies documents.",
              icon: ClipboardCheck,
              bg: "bg-violet-100",
              text: "text-violet-600",
            },
            {
              title: "Finance",
              description:
                "Finance checks budgets, accounting policies and compliance.",
              icon: Wallet,
              bg: "bg-emerald-100",
              text: "text-emerald-600",
            },
            {
              title: "CFO",
              description:
                "High-value invoices receive final executive approval.",
              icon: BadgeCheck,
              bg: "bg-orange-100",
              text: "text-orange-600",
            },
            {
              title: "Payment",
              description:
                "Approved invoices are released for payment and tracking.",
              icon: CircleDollarSign,
              bg: "bg-cyan-100",
              text: "text-cyan-600",
            },
          ].map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.title}
                className="
            relative
            min-w-[280px]
            snap-center
            rounded-3xl
            border
            border-slate-200
            bg-white
            p-6
            shadow-sm
            transition-all
            duration-500
            hover:-translate-y-3
            hover:border-indigo-300
            hover:shadow-2xl
            hover:scale-[1.03]
            lg:min-w-0
            dark:border-slate-800
            dark:bg-slate-900
          "
              >
                {/* Desktop Arrow */}

                {index < 4 && (
                  <ChevronRight
                    size={34}
                    className="absolute -right-6 top-1/2 hidden -translate-y-1/2 text-slate-300 lg:block"
                  />
                )}

                {/* Step */}

                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
                    Step {index + 1}
                  </span>

                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl ${step.bg} transition-transform duration-300 group-hover:scale-110`}
                  >
                    <Icon className={step.text} size={28} />
                  </div>
                </div>

                {/* Title */}

                <h3 className="mt-6 text-xl font-bold text-slate-900 dark:text-slate-100">
                  {step.title}
                </h3>

                {/* Description */}

                <p className="mt-3 text-sm leading-7 text-slate-500 dark:text-slate-400">
                  {step.description}
                </p>

                {/* Bottom Line */}

                <div className="mt-6 h-1 w-full rounded-full bg-slate-100">
                  <div
                    className="h-1 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 transition-all duration-500"
                    style={{ width: `${(index + 1) * 20}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= CTA ================= */}

      <section className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 py-24">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.12)_1px,transparent_1px)] bg-[size:50px_50px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.16),transparent_45%)]" />
        <div className="relative mx-auto max-w-5xl px-5 text-center">
          <h2 className="text-4xl font-bold text-white">
            Ready to Transform Invoice Approvals?
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-indigo-100">
            Streamline approvals, improve collaboration and manage enterprise
            organizations with InvoiceFlow.
          </p>

          <button
            onClick={scrollToHero}
            className="mt-10 rounded-xl bg-white px-8 py-4 font-semibold text-indigo-700 transition hover:scale-105"
          >
            Get Started
          </button>
        </div>
      </section>

      {/* ================= Footer ================= */}

      <footer className="relative overflow-hidden border-t border-slate-200 bg-white">
        {/* Grid Background */}

        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:55px_55px]" />

        {/* Glow */}

        <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-6 py-16">
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {/* Brand */}

            <div className="sm:col-span-2 lg:col-span-1">
              <h2 className="text-3xl font-bold text-slate-900">InvoiceFlow</h2>

              <p className="mt-5 leading-8 text-slate-600">
                Enterprise Invoice Approval Platform built using React, Spring
                Boot, PostgreSQL, Spring Security and JWT Authentication.
              </p>
            </div>

            {/* Product */}

            <div>
              <h3 className="mb-5 font-semibold text-slate-900">Product</h3>

              <ul className="space-y-3 text-slate-600">
                {["Features", "Workflow", "Security", "Organizations"].map(
                  (item) => (
                    <li
                      key={item}
                      className="cursor-pointer transition hover:text-indigo-400"
                    >
                      {item}
                    </li>
                  ),
                )}
              </ul>
            </div>

            {/* Resources */}

            <div>
              <h3 className="mb-5 font-semibold text-slate-900">Resources</h3>

              <ul className="space-y-3 text-slate-600">
                {[
                  "Documentation",
                  "Support",
                  "Privacy Policy",
                  "Terms & Conditions",
                ].map((item) => (
                  <li
                    key={item}
                    className="cursor-pointer transition hover:text-indigo-400"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Technology */}

            <div>
              <h3 className="mb-5 font-semibold text-slate-900">Technology</h3>

              <ul className="space-y-3 text-slate-600">
                {[
                  "React + Tailwind CSS",
                  "Spring Boot",
                  "Spring Security",
                  "PostgreSQL",
                ].map((item) => (
                  <li
                    key={item}
                    className="cursor-pointer transition hover:text-indigo-400"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom */}

          <div className="mt-14 flex flex-col items-center justify-between gap-5 border-t border-slate-200 pt-8 text-sm text-slate-500 md:flex-row">
            <p>© 2026 InvoiceFlow. All rights reserved.</p>

            <div className="flex gap-6">
              <a href="#" className="transition hover:text-indigo-400">
                GitHub
              </a>

              <a href="#" className="transition hover:text-indigo-400">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
