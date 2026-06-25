import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function OrganizationOnboarding() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      await axios.post(
        "http://localhost:8080/api/organizations/complete-onboarding",
        {
          token,
          password,
        },
      );

      alert("Onboarding Completed Successfully");

      navigate("/");
    } catch (error) {
      console.error(error);

      alert("Failed to Complete Onboarding");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
      min-h-screen

      bg-[#0F172A]

      flex
      items-center
      justify-center

      px-6

      text-white
      "
    >
      <div
        className="
        w-full
        max-w-md

        bg-white/[0.04]

        border
        border-white/10

        rounded-3xl

        p-8
        "
      >
        <h1
          className="
          text-3xl
          font-bold
          "
        >
          Complete Setup
        </h1>

        <p
          className="
          mt-2

          text-white/60
          "
        >
          Create your organization password
        </p>

        <div className="mt-8 space-y-4">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="
            w-full

            p-4

            rounded-xl

            bg-white/[0.04]

            border
            border-white/10

            outline-none
            "
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="
            w-full

            p-4

            rounded-xl

            bg-white/[0.04]

            border
            border-white/10

            outline-none
            "
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="
          w-full

          mt-6

          py-4

          rounded-xl

          bg-white

          text-black

          font-semibold
          "
        >
          {loading ? "Completing..." : "Complete Onboarding"}
        </button>
      </div>
    </div>
  );
}
