import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function MovieCarousel() {
  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => {
        const trending = data.filter((movie) => movie.isTrending);
        setTrendingMovies(trending);
      })
      .catch((err) => console.error("Error loading movies:", err));
  }, []);

  // handle bookmark toggle globally (no hooks in map)
  const toggleBookmark = (title) => {
    setTrendingMovies((prev) =>
      prev.map((movie) =>
        movie.title === title
          ? { ...movie, isBookmarked: !movie.isBookmarked }
          : movie
      )
    );
  };

  return (
    <div className="w-full mt-8 overflow-hidden">
      <h2 className="text-2xl font-semibold mb-6 text-white">Trending Movies</h2>

      {trendingMovies.length === 0 ? (
        <p className="text-gray-400">Loading movies...</p>
      ) : (
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation
          autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }}
          loop
          spaceBetween={20}
          slidesPerView={3}
          grabCursor
          className="!w-full drop-shadow-[0_5px_15px_rgba(0,0,0,0.3)]"
          breakpoints={{
            1280: { slidesPerView: 4 },
            1024: { slidesPerView: 3 },
            768: { slidesPerView: 2 },
            0: { slidesPerView: 1 },
          }}
        >
          {trendingMovies.map((movie) => {
            const image =
              movie.thumbnail.trending?.large ||
              movie.thumbnail.regular?.large ||
              movie.thumbnail.regular?.medium;

            return (
              <SwiperSlide key={movie.title} style={{ width: "350px" }}>
                <div className="relative group w-[350px] h-[200px] rounded-2xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                  <img
                    src={image}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                    onError={(e) => (e.target.src = "https://picsum.photos/400/250")}
                  />

                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Movie info */}
                  <div className="absolute bottom-3 left-3 text-white z-10">
                    <div className="text-xs text-gray-300 flex items-center gap-2">
                      <span>{movie.year}</span>•<span>{movie.category}</span>•<span>{movie.rating}</span>
                    </div>
                    <h3 className="font-semibold text-lg">{movie.title}</h3>
                  </div>

                  {/* Bookmark button */}
<button
  onClick={() => toggleBookmark(movie.title)}
  style={{
    backgroundColor: "transparent",
    boxShadow: "none",
    border: "none",
  }}
  className="absolute top-3 right-3 flex items-center justify-center p-0 hover:opacity-80 active:scale-110 transition-transform duration-200"
>
  <img
    src={
      movie.isBookmarked
        ? "/assets/icon-bookmark-full.svg"
        : "/assets/icon-bookmark-empty.svg"
    }
    alt="bookmark"
    className="w-5 h-5 bg-transparent drop-shadow-[0_0_2px_rgba(0,0,0,0.7)] pointer-events-none select-none"
  />
</button>





                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
    </div>
  );
}
