import { useState } from "react";
import { motion } from "framer-motion";
import { IAnime } from "../../../models/Product";
import { FaPlay } from "react-icons/fa";

const Trailer = ({ anime }: { anime: IAnime }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <motion.div
      className="relative w-full h-[60vh] lg:h-[80vh] rounded-lg overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {anime.trailer ? (
        !isPlaying ? (
          <div className="relative trailer--preview min-h-[500px] lg:min-h-[680px]">
            <img
              src={anime.trailer.thumbnail}
              alt="anime--trailer--thumbnail"
              className="w-full h-[60vh] lg:h-[680px] object-cover"
            />
            <div className="orange-text flex items-center justify-center text-7xl absolute z-50 top-0 left-0 bg-black/30 w-full h-full">
              <FaPlay
                onClick={() => setIsPlaying(true)}
                className="cursor-pointer duration-300 hover:scale-125"
              />
            </div>
          </div>
        ) : (
          <iframe
            width={"100%"}
            height="100%"
            src={`https://www.youtube.com/embed/${anime.trailer.id}?autoplay=1`}
            title="YouTube Video"
            key={`anime--trailer-${anime.trailer.id}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        )
      ) : (
        <div className="text-primary text-4xl">No Trailer.Sorry ^_^</div>
      )}
    </motion.div>
  );
};

export default Trailer;
