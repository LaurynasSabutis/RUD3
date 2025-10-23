import React, { useEffect, useState } from "react";
import "./Bookmarks.css";

export default function Bookmarks() {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("bookmarkedItems") || "[]");
    setItems(saved);
  }, []);

  const removeBookmark = title => {
    const updated = items.filter(i => i.title !== title);
    localStorage.setItem("bookmarkedItems", JSON.stringify(updated));
    setItems(updated);
  };

  const filtered = items.filter(i => i.title.toLowerCase().includes(searchQuery.toLowerCase()));
  const movies = filtered.filter(i => i.category === "Movie");
  const series = filtered.filter(i => i.category === "TV Series");

  const renderCard = i => {
    const img = i.thumbnail?.regular?.large || i.thumbnail?.regular?.medium || i.thumbnail?.regular?.small || "/assets/default-movie.jpg";
    return (
      <div key={i.title} className="card">
        <div className="image-container">
          <img src={img} alt={i.title} className="thumbnail" />
          <button className="bookmark-button" onClick={() => removeBookmark(i.title)}>
            <img src="/assets/icon-bookmark-full.svg" alt="bookmark" />
          </button>
        </div>
        <div className="card-meta">
          <p>{i.year}</p>
          <div className="divider"></div>
          <img width={15} height={15} src={i.category === "Movie" ? "/assets/icon-category-movie.svg" : "/assets/icon-category-tv.svg"} alt={i.category} />
          <p>{i.category}</p>
          <div className="divider"></div>
          <p>{i.rating}</p>
        </div>
        <h2 className="card-title">{i.title}</h2>
      </div>
    );
  };

  return (
    <div className="bookmarks-container">
      <h1>Bookmarked Items</h1>
      <div className="search-bar">
        <img src="/assets/icon-search.svg" alt="search" className="search-icon" />
        <input
          type="text"
          placeholder="Search bookmarked movies or TV series..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

      <h2>Bookmarked Movies</h2>
      <div className="grid-cards">{movies.length ? movies.map(renderCard) : <p>No bookmarked movies.</p>}</div>

      <h2>Bookmarked TV Series</h2>
      <div className="grid-cards">{series.length ? series.map(renderCard) : <p>No bookmarked TV series.</p>}</div>
    </div>
  );
}