import { supabase } from "./supabase";
import { useAuth } from "../Providers/AuthContext/AuthContext";
import toast from "react-hot-toast";

const useLikeAnime = () => {
  const { user, setUser } = useAuth();

  const addLike = async (id: number) => {
    if (!user) {
      toast.error("Sign in please!");
    }
    if (user && user.liked) {
      const updatedLikes = Array.isArray(user.liked)
        ? user.liked.includes(id)
          ? user.liked.filter((likeId) => likeId !== id) // Удаление
          : [...user.liked, id] // Добавление
        : [id];
      const controller = new AbortController(); // Контроллер для отмены запроса
      const timeoutId = setTimeout(() => controller.abort(), 5000); // Отмена через 5 сек
      try {
        const { data, error } = await supabase
          .from("viva")
          .update({ liked: updatedLikes })
          .eq("id", user.id);

        clearTimeout(timeoutId);
        if (error) throw error;

        console.log("Ответ от Supabase:", data);

        setUser({ ...user, liked: updatedLikes });
      } catch (err) {
        console.error("Ошибка при обновлении лайков:", err);
      }
    }
  };

  return { addLike };
};

export default useLikeAnime;
