import React, { useEffect, useState } from "react";
import "./TVSeries.css";

export default function TVSeries() {
  const [TVSeries, setTVSeries] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/posts")
      .then((res) => res.json())
      .then((data) => {
        const onlyTVSeries = data.filter((item) => item.category === "TV Series");
        setTVSeries(onlyTVSeries);
      })
      .catch((err) => console.error("Error loading TV series:", err));
  }, []);

  const toggleBookmark = (title) => {
    setTVSeries((prev) =>
      prev.map((TVSerie) =>
        TVSerie.title === title
          ? { ...TVSerie, isBookmarked: !TVSerie.isBookmarked }
          : TVSerie
      )
    );
  };

  if (!TVSeries.length) {
    return <p className="loading">Loading TV series...</p>;
  }

  return (
    <div className="TVSeries-container">
      <h1>All TV series</h1>
      <div className="TVSeries-grid">
        {TVSeries.map((TVSerie) => {
          const image =
            TVSerie.thumbnail?.trending?.large ||
            TVSerie.thumbnail?.regular?.large ||
            TVSerie.thumbnail?.regular?.medium ||
            "/assets/default-TVSerie.jpg";

          return (
            <div key={TVSerie.title} className="TVSerie-card">
              <div className="image-wrapper">
                <img src={image} alt={TVSerie.title} className="TVSerie-image" />
                <button
                  className="bookmark-icon"
                  onClick={() => toggleBookmark(TVSerie.title)}
                >
                  <img
                    src={
                      TVSerie.isBookmarked
                        ? "/assets/icon-bookmark-full.svg"
                        : "/assets/icon-bookmark-empty.svg"
                    }
                    alt="bookmark"
                  />
                </button>
              </div>

              <div className="TVSerie-info">
                <div className="TVSerie-meta">
                  {TVSerie.year} • {TVSerie.category} • {TVSerie.rating}
                </div>
                <div className="TVSerie-title">{TVSerie.title}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
