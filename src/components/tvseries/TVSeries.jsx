import React, { useEffect, useState } from "react";
import "../movies/Movies.css";

export default function TVSeries() {
  const [series, setSeries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("/data.json")
      .then(res => res.json())
      .then(data => {
        const allSeries = Array.isArray(data) ? data : data.movies || [];
        const saved = JSON.parse(localStorage.getItem("bookmarkedItems") || "[]");
        setSeries(
          allSeries
            .filter(s => s.category === "TV Series")
            .map(s => ({ ...s, isBookmarked: saved.some(b => b.title === s.title) }))
        );
      });
  }, []);

  const toggleBookmark = title => {
    const updated = series.map(s =>
      s.title === title ? { ...s, isBookmarked: !s.isBookmarked } : s
    );
    setSeries(updated);
    localStorage.setItem("bookmarkedItems", JSON.stringify(updated.filter(s => s.isBookmarked)));
  };

  const filtered = series.filter(s => s.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="movies-container">
      <h1>All TV Series</h1>
      <div className="search-bar">
        <img src="/assets/icon-search.svg" alt="search" className="search-icon" />
        <input
          type="text"
          placeholder="Search TV series..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="movies-grid">
        {filtered.length ? (
          filtered.map(s => {
            const img = s.thumbnail?.trending?.large || s.thumbnail?.regular?.large || s.thumbnail?.regular?.medium || "/assets/default-movie.jpg";
            return (
              <div key={s.title} className="movie-card">
                <div className="image-wrapper">
                  <img src={img} alt={s.title} className="movie-image" />
                  <button
                    type="button"
                    className="bookmark-button"
                    onClick={() => toggleBookmark(s.title)}
                  >
                    <img src={s.isBookmarked ? "/assets/icon-bookmark-full.svg" : "/assets/icon-bookmark-empty.svg"} alt="bookmark" />
                  </button>
                </div>
                <div className="movie-info">
                  <div className="movie-meta">{s.year} • {s.category} • {s.rating}</div>
                  <div className="movie-title">{s.title}</div>
                </div>
              </div>
            );
          })
        ) : <p className="no-results">No TV series found.</p>}
      </div>
    </div>
  );
}