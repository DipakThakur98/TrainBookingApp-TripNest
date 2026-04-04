import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../login/AuthContext";
import LoginForm from "./LoginForm";

export default function Login() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user, navigate]);

  return <LoginForm />;
}