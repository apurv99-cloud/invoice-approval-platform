import { useState } from "react";
import { Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { login, getCurrentUser } from "../Service/AuthService";
import { useAuth } from "../Context/AuthContext";

export default function LoginCard() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        alert("Please enter email and password");
        return;
      }

      setLoading(true);

      const authResponse = await login(email, password);

      localStorage.setItem("token", authResponse.token);

      const currentUser = await getCurrentUser();

      setUser(currentUser);

      localStorage.setItem("user", JSON.stringify(currentUser));

      if (currentUser.roleName === "SUPER_ADMIN") {
        navigate("/organizations");
      } else if (currentUser.roleName === "ORG_ADMIN") {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error(error);

      alert("Invalid Email or Password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
      w-full
      max-w-md

      border
      border-white/10

      bg-white/[0.04]

      backdrop-blur-xl

      rounded-3xl

      p-8
      "
    >
      <div className="text-center">
        <p className="text-sm text-white/50">Secure Enterprise Access</p>

        <h2
          className="
          mt-3

          text-3xl
          font-bold
          "
        >
          Welcome back
        </h2>

        <p className="mt-2 text-white/60">Sign in to continue</p>
      </div>

      <div className="mt-8 space-y-4">
        {/* Email */}

        <div className="relative">
          <Mail
            size={18}
            className="
            absolute
            left-4
            top-1/2
            -translate-y-1/2

            text-white/40
            "
          />

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="
            w-full

            pl-12
            py-4
            pr-4

            rounded-2xl

            bg-white/[0.03]

            border
            border-white/10

            outline-none

            text-white

            placeholder:text-white/40
            "
          />
        </div>

        {/* Password */}

        <div className="relative">
          <Lock
            size={18}
            className="
            absolute
            left-4
            top-1/2
            -translate-y-1/2

            text-white/40
            "
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="
            w-full

            pl-12
            py-4
            pr-4

            rounded-2xl

            bg-white/[0.03]

            border
            border-white/10

            outline-none

            text-white

            placeholder:text-white/40
            "
          />
        </div>
      </div>

      <div
        className="
        mt-5

        flex
        justify-between

        text-sm
        text-white/60
        "
      >
        <label className="flex items-center gap-2">
          <input type="checkbox" />
          Remember me
        </label>

        <button className="hover:text-white transition">
          Forgot password?
        </button>
      </div>

      <button
        onClick={handleLogin}
        disabled={loading}
        className="
        w-full

        mt-6

        py-4

        rounded-2xl

        bg-white

        text-black

        font-medium

        hover:bg-gray-200

        transition

        disabled:opacity-50
        disabled:cursor-not-allowed
        "
      >
        {loading ? "Signing In..." : "Sign In"}
      </button>
    </div>
  );
}
