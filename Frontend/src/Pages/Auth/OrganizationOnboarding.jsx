import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Lock, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";

import organizationService from "../../Services/organizationService";

const OrganizationOnboarding = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error("Invalid onboarding link.");
      return;
    }

    if (!formData.password || !formData.confirmPassword) {
      toast.error("Please fill all fields.");
      return;
    }

    if (formData.password.length < 8) {
      toast.error("Password must contain at least 8 characters.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      await organizationService.completeOnboarding({
        token,
        password: formData.password,
      });

      toast.success("Organization onboarding completed successfully.");

      navigate("/");
    } catch (error) {
      toast.error(error?.message || "Failed to complete onboarding.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6 dark:bg-slate-950">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-xl dark:border-slate-800 dark:bg-slate-900">
        {/* Header */}

        <div className="text-center">
          <div className="flex justify-center mb-5">
            <CheckCircle size={60} className="text-indigo-600" />
          </div>

          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">
            Complete Onboarding
          </h1>

          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Create your password to activate your organization account.
          </p>
        </div>

        {/* Form */}

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {/* Password */}

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Password
            </label>

            <div className="relative">
              <Lock
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="password"
                name="password"
                placeholder="Enter Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 pl-11 pr-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Confirm Password */}

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Confirm Password
            </label>

            <div className="relative">
              <Lock
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 pl-11 pr-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Button */}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl py-3 font-semibold transition disabled:opacity-60"
          >
            {loading ? "Completing..." : "Complete Onboarding"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrganizationOnboarding;
