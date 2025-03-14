import toast from "react-hot-toast";
import { useAuth } from "../Providers/AuthContext/AuthContext";
import { supabase } from "../utils/supabase";

const useAddWatchlist = () => {
  const { user, setUser } = useAuth();

  const addToWatchlist = async (id: number) => {
    if (!user) {
      toast.error("Sign in please!");
    }
    if (user && user.watchlist) {
      const updatedWatchlist = Array.isArray(user.watchlist)
        ? user.watchlist.includes(id)
          ? user.watchlist.filter((likeId) => likeId !== id) // Удаление
          : [...user.watchlist, id] // Добавление
        : [id];
      try {
        const { error } = await supabase
          .from("viva")
          .update({ watchlist: updatedWatchlist })
          .eq("id", user.id);

        if (error) throw error;

        setUser({ ...user, watchlist: updatedWatchlist });
      } catch (err) {
        console.error("Ошибка при обновлении лайков:", err);
      }
    }
  };
  return { addToWatchlist };
};

export default useAddWatchlist;
