import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { supabase } from "../../utils/supabase";
import { IUser } from "../../models/user";

// Типы состояния авторизации
interface AuthContextType {
  logged: boolean;
  setLogged: (logged: boolean) => void;
  user: IUser | null;
  setUser: (user: IUser | null) => void;
}

// Создание контекста с дефолтным значением
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Компонент Provider, который оборачивает приложение и предоставляет контекст
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [logged, setLogged] = useState<boolean>(false);
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const getUserData = async () => {
      // Получаем текущую сессию
      const { data: sessionData, error: sessionError } =
        await supabase.auth.getSession();

      const user = sessionData?.session?.user;

      if (sessionError || !user) {
        setLogged(false);
        setUser(null);
        return;
      }

      setLogged(true);

      // Запрос в БД по id пользователя
      const { data: userData, error: userError } = await supabase
        .from("viva")
        .select("*")
        .eq("id", user.id)
        .single();

      if (userError) {
        console.error("Ошибка запроса к БД:", userError);
        setUser(null);
      } else {
        setUser({
          ...userData,
          username: user.user_metadata.username || "", // Добавляем username
        });
      }
    };

    getUserData();

    // Слушаем изменения авторизации
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN" && session?.user) {
          setLogged(true);
          const { data: userData, error: userError } = await supabase
            .from("viva")
            .select("*")
            .eq("id", session.user.id)
            .single();

          if (userError) {
            console.error("Ошибка запроса к БД после SIGNED_IN:", userError);
            setUser(null);
          } else {
            setUser({
              ...userData,
              username: session?.user.user_metadata.username, // Добавляем username
            });
          }
        } else if (event === "SIGNED_OUT") {
          setLogged(false);
          setUser(null);
        }
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ logged, setLogged, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Хук для использования контекста в компонентах
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
