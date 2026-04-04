import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/loginform" replace />;

  if (adminOnly && user.role !== "admin") return <Navigate to="/" replace />;

  return children;
};

export default ProtectedRoute;