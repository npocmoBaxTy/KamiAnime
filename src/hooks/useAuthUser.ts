import { useState } from "react";
import { supabase } from "../utils/supabase";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Providers/AuthContext/AuthContext";

const useAuthUser = () => {
  const [loading, setLoading] = useState(false);
  const { setLogged } = useAuth();
  const navigate = useNavigate();
  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (data.user?.confirmed_at === null) {
      toast.error("Please, confirm email.");
      setLoading(false);
      return;
    }
    if (data.session) {
      toast.success("Authorized!");
      setLogged(true);
      window.setTimeout(() => {
        navigate("/");
      }, 2000);
    }
    if (error) {
      if (error.message.includes("Email not confirmed")) {
        toast.error("Email not confirmed");
      }
      if (error.message.includes("Invalid login credentials")) {
        toast.error("Неверный email или пароль.");
      }
      setLoading(false);
      return;
    }
    setLoading(false);
  };
  return { login, loading };
};

export default useAuthUser;
