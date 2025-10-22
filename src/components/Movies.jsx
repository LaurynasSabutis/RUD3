import React, { useEffect, useState } from "react";
import "./Movies.css";

export default function Movies() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/posts")
      .then((res) => res.json())
      .then((data) => {
        // Filter only movies
        const onlyMovies = data.filter((item) => item.category === "Movie");
        setMovies(onlyMovies);
      })
      .catch((err) => console.error("Error loading movies:", err));
  }, []);

  const toggleBookmark = (title) => {
    setMovies((prev) =>
      prev.map((movie) =>
        movie.title === title
          ? { ...movie, isBookmarked: !movie.isBookmarked }
          : movie
      )
    );
  };

  if (!movies.length) {
    return <p className="loading">Loading movies...</p>;
  }

  return (
    <div className="movies-container">
      <h1>All Movies</h1>
      <div className="movies-grid">
        {movies.map((movie) => {
          const image =
            movie.thumbnail?.trending?.large ||
            movie.thumbnail?.regular?.large ||
            movie.thumbnail?.regular?.medium ||
            "/assets/default-movie.jpg";

          return (
            <div key={movie.title} className="movie-card">
              <div className="image-wrapper">
                <img src={image} alt={movie.title} className="movie-image" />
                <button
                  className="bookmark-icon"
                  onClick={() => toggleBookmark(movie.title)}
                >
                  <img
                    src={
                      movie.isBookmarked
                        ? "/assets/icon-bookmark-full.svg"
                        : "/assets/icon-bookmark-empty.svg"
                    }
                    alt="bookmark"
                    width={15} 
                  height={15}
                  />
                </button>
              </div>

              <div className="movie-info">
                <div className="movie-meta">
                  {movie.year} • {movie.category} • {movie.rating}
                </div>
                <div className="movie-title">{movie.title}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
