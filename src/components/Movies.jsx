import React, { useEffect, useState } from "react";
import "./Movies.css";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => {
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

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="movies-container">
      <h1>All Movies</h1>

      <div className="search-bar">
        <img src="/assets/icon-search.svg" alt="search" className="search-icon" />
        <input
          type="text"
          placeholder="Search movies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

      {movies.length === 0 ? (
        <p className="loading">Loading movies...</p>
      ) : (
        <div className="movies-grid">
          {filteredMovies.length === 0 ? (
            <p className="no-results">No movies found.</p>
          ) : (
            filteredMovies.map((movie) => {
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
            })
          )}
        </div>
      )}
    </div>
  );
}