import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const { user, loading } = useAuth();

  // Wait until auth is loaded
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0F172A] text-white">
        Loading...
      </div>
    );
  }

  // Not logged in
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Role Check
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.roleName)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
