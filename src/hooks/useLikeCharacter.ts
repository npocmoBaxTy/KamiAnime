import { useAuth } from "../Providers/AuthContext/AuthContext";
import toast from "react-hot-toast";
import { supabase } from "../utils/supabase";

const useLikeCharacter = () => {
  const { user, setUser } = useAuth();

  const addCharacterLike = async (id: number) => {
    if (!user) {
      toast.error("Sign in please!");
    }
    if (user && user.liked) {
      const updatedCharacters = Array.isArray(user.characters)
        ? user.characters.includes(id)
          ? user.characters.filter((likeId) => likeId !== id) // Удаление
          : [...user.characters, id] // Добавление
        : [id];
      try {
        const { error } = await supabase
          .from("viva")
          .update({ characters: updatedCharacters })
          .eq("id", user.id);

        if (error) throw error;

        setUser({ ...user, characters: updatedCharacters });
      } catch (err) {
        console.error("Ошибка при обновлении лайков:", err);
      }
    }
  };

  return { addCharacterLike };
};

export default useLikeCharacter;
