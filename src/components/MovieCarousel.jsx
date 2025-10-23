import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "../main.css";

export default function MovieCarousel() {
  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/movies")
      .then((res) => res.json())
      .then((data) => {
        const movies = Array.isArray(data) ? data : data.movies || [];
        const trending = movies.filter((movie) => movie.isTrending);
        setTrendingMovies(trending);
      })
      .catch((err) => console.error("Error loading movies:", err));
  }, []);

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
      <h2 className="text-2xl font-semibold mb-6 text-white">Trending</h2>

      {trendingMovies.length === 0 ? (
        <p className="text-gray-400">Loading movies...</p>
      ) : (
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop={true}
          spaceBetween={20}
          slidesPerView={4}
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
              movie.thumbnail.regular?.medium ||
              movie.thumbnail.regular?.small;

            return (
              <SwiperSlide key={movie.title} style={{ width: "350px" }}>
                <div className="movie-slide">
                  {/* Poster */}
                  <img
                    src={image}
                    alt={movie.title}
                    className="movie-slide__image"
                    onError={(e) => (e.target.src = "https://picsum.photos/400/250")}
                  />

                  <div className="movie-slide__gradient" />

                  {/* Info overlay */}
                  <div className="movie-slide__info">
                    <div className="movie-slide__meta">
                      <span>{movie.year}</span>
                      <span className="movie-slide__divider">•</span>
                      <span className="movie-slide__category">
                        <img
                          src={
                            movie.category === "Movie"
                              ? "/assets/icon-category-movie.svg"
                              : "/assets/icon-category-tv.svg"
                          }
                          alt={movie.category}
                        />
                        {movie.category}
                      </span>
                      <span className="movie-slide__divider">•</span>
                      <span>{movie.rating}</span>
                    </div>
                    <h3 className="movie-slide__title">{movie.title}</h3>
                  </div>

                  {/* Bookmark icon */}
                  <button
                    type="button"
                    onClick={() => toggleBookmark(movie.title)}
                    className="bookmark-button movie-slide__bookmark"
                    aria-label={`${
                      movie.isBookmarked ? "Remove from" : "Add to"
                    } bookmarks`}
                  >
                    <img
                      src={
                        movie.isBookmarked
                          ? "/assets/icon-bookmark-full.svg"
                          : "/assets/icon-bookmark-empty.svg"
                      }
                      alt="bookmark"
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
