import React, { useEffect, useState } from "react";
import "./Movies.css";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("/data.json")
      .then(res => res.json())
      .then(data => {
        const allMovies = Array.isArray(data) ? data : data.movies || [];
        const saved = JSON.parse(localStorage.getItem("bookmarkedItems") || "[]");
        setMovies(
          allMovies
            .filter(m => m.category === "Movie")
            .map(m => ({ ...m, isBookmarked: saved.some(b => b.title === m.title) }))
        );
      });
  }, []);

  const toggleBookmark = title => {
    const updated = movies.map(m =>
      m.title === title ? { ...m, isBookmarked: !m.isBookmarked } : m
    );
    setMovies(updated);
    localStorage.setItem("bookmarkedItems", JSON.stringify(updated.filter(m => m.isBookmarked)));
  };

  const filtered = movies.filter(m => m.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="movies-container">
      <h1>All Movies</h1>
      <div className="search-bar">
        <img src="/assets/icon-search.svg" alt="search" className="search-icon" />
        <input
          type="text"
          placeholder="Search movies..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="movies-grid">
        {filtered.length ? (
          filtered.map(movie => {
            const img = movie.thumbnail?.trending?.large || movie.thumbnail?.regular?.large || movie.thumbnail?.regular?.medium || "/assets/default-movie.jpg";
            return (
              <div key={movie.title} className="movie-card">
                <div className="image-wrapper">
                  <img src={img} alt={movie.title} className="movie-image" />
                  <button
                    type="button"
                    className="bookmark-button"
                    onClick={() => toggleBookmark(movie.title)}
                  >
                    <img src={movie.isBookmarked ? "/assets/icon-bookmark-full.svg" : "/assets/icon-bookmark-empty.svg"} alt="bookmark" />
                  </button>
                </div>
                <div className="movie-info">
                  <div className="movie-meta">{movie.year} • {movie.category} • {movie.rating}</div>
                  <div className="movie-title">{movie.title}</div>
                </div>
              </div>
            );
          })
        ) : <p className="no-results">No movies found.</p>}
      </div>
    </div>
  );
}