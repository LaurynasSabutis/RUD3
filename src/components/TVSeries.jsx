import React, { useEffect, useState } from "react";
import "./TVSeries.css";

export default function TVSeries() {
  const [series, setSeries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => {
        const onlySeries = data.filter((item) => item.category === "TV Series");
        setSeries(onlySeries);
      })
      .catch((err) => console.error("Error loading TV series:", err));
  }, []);

  const toggleBookmark = (title) => {
    setSeries((prev) =>
      prev.map((s) =>
        s.title === title ? { ...s, isBookmarked: !s.isBookmarked } : s
      )
    );
  };

  const filteredSeries = series.filter((s) =>
    s.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="movies-container">
      <h1>All TV Series</h1>

      {/* Search bar */}
      <div className="search-bar">
        <img src="/assets/icon-search.svg" alt="search" className="search-icon" />
        <input
          type="text"
          placeholder="Search TV series..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

      {series.length === 0 ? (
        <p className="loading">Loading TV series...</p>
      ) : (
        <div className="movies-grid">
          {filteredSeries.length === 0 ? (
            <p className="no-results">No TV series found.</p>
          ) : (
            filteredSeries.map((s) => {
              const image =
                s.thumbnail?.trending?.large ||
                s.thumbnail?.regular?.large ||
                s.thumbnail?.regular?.medium ||
                "/assets/default-movie.jpg";

              return (
                <div key={s.title} className="movie-card">
                  <div className="image-wrapper">
                    <img src={image} alt={s.title} className="movie-image" />
                    <button
                      className="bookmark-icon"
                      onClick={() => toggleBookmark(s.title)}
                    >
                      <img
                        src={
                          s.isBookmarked
                            ? "/assets/icon-bookmark-full.svg"
                            : "/assets/icon-bookmark-empty.svg"
                        }
                        alt="bookmark"
                      />
                    </button>
                  </div>

                  <div className="movie-info">
                    <div className="movie-meta">
                      {s.year} • {s.category} • {s.rating}
                    </div>
                    <div className="movie-title">{s.title}</div>
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
