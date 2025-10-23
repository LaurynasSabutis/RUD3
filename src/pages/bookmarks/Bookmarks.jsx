import React, { useEffect, useState } from "react";
import "./Bookmarks.css";


const Bookmarks = () => {
  const [bookmarkedItems, setBookmarkedItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await fetch("/data.json");
      const json = await res.json();
      const movies = Array.isArray(json) ? json : json.movies || [];
      setBookmarkedItems(movies);
    };
    fetchMovies();
  }, []);

  const toggleBookmark = (title) => {
    setBookmarkedItems((prev) =>
      prev.map((item) =>
        item.title === title
          ? { ...item, isBookmarked: !item.isBookmarked }
          : item
      )
    );
  };

  const renderCard = (listing) => (
    <div key={listing.title} className="card">
      <div className="image-container">
        <img
          className="thumbnail"
          src={
            listing.thumbnail?.regular?.large ||
            listing.thumbnail?.regular?.medium ||
            listing.thumbnail?.regular?.small
          }
          alt={listing.title}
        />
        <button
          type="button"
          className="bookmark-button"
          onClick={() => toggleBookmark(listing.title)}
          aria-label={`${
            listing.isBookmarked ? "Remove from" : "Add to"
          } bookmarks`}
        >
          <img
            src={
              listing.isBookmarked
                ? "/assets/icon-bookmark-full.svg"
                : "/assets/icon-bookmark-empty.svg"
            }
            alt="Bookmark icon"
          />
        </button>
      </div>
      <div className="card-meta">
        <p>{listing.year}</p>
        <div className="divider"></div>
        <img
          width={15}
          height={15}
          src={
            listing.category === "Movie"
              ? "/assets/icon-category-movie.svg"
              : "/assets/icon-category-tv.svg"
          }
          alt={listing.category}
        />
        <p>{listing.category}</p>
        <div className="divider"></div>
        <p>{listing.rating}</p>
      </div>
      <h2 >{listing.title}</h2>
    </div>
  );

  const bookmarkedMovies = bookmarkedItems.filter(
    (item) => item.isBookmarked && item.category === "Movie"
  );

  const bookmarkedSeries = bookmarkedItems.filter(
    (item) => item.isBookmarked && item.category === "TV Series"
  );
 const filteredEverything = bookmarkedItems.filter((bookmark) =>
    bookmark.isBookmarked && bookmark.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
     
      <h1 style={{ marginBottom: "2rem" }}>Bookmarked movies</h1>
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
      
      {searchQuery === "" ? (
        <span>
          <section>
        <div className="container-of-movies">
          <div className="grid-cards">
            {bookmarkedMovies.map(renderCard)}
          </div>
        </div>
      </section>



      <h1>Bookmarked TV series</h1>
      <section>
        <div className="container-of-movies">
          <div className="grid-cards">
            {bookmarkedSeries.map(renderCard)}
          </div>
        </div>
      </section>
        </span>
      ) : (
        <section>
        <div className="container-of-movies">
          <div className="grid-cards">
        {filteredEverything.map(renderCard)}
          </div>
        </div>
      </section>
      )}
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
    </>
  );
};

export default Bookmarks;
