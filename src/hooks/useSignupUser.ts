import { useState } from "react";
import { supabase } from "../utils/supabase";
import toast from "react-hot-toast";

type user = {
  email: string;
  password: string;
  username: string;
};

const useSignupUser = () => {
  const [loading, setLoading] = useState(false);
  // Регистрация пользователя
  const signUpUser = async ({ email, password, username }: user) => {
    setLoading(true);

    try {
      // Отправляем запрос на регистрацию
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
          },
        },
      });
      console.log(data.user?.user_metadata);
      if (error) {
        console.error("Ошибка регистрации:", error.message);

        if (
          error.message.includes("email is invalid") ||
          error.message.includes("password is invalid")
        ) {
          toast.error("Email or password is invalid.");
        } else if (error.message.includes("User already registered")) {
          toast.error("User with this email already registered");
        } else {
          console.error("Ошибка регистрации. Попробуйте позже.");
        }

        setLoading(false);
        return null;
      }
      toast.error("Please, confirm your email!.");

      // setTimeout(() => {
      //   navigate("/confirm-email");
      // }, 1000);
    } catch (err) {
      console.error("Непредвиденная ошибка:", err);
      toast.error("Произошла ошибка. Попробуйте позже.");
    } finally {
      setLoading(false);
    }
  };

  return { signUpUser, loading };
};

export default useSignupUser;
