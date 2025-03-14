import { useNavigate } from "react-router-dom";
import { supabase } from "../utils/supabase";

const useSignOut = () => {
  const navigate = useNavigate();
  const userSignUoutHandler = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return { userSignUoutHandler };
};

export default useSignOut;
