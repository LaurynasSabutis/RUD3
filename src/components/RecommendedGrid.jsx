import React, { useEffect, useState } from "react";
import "../pages/bookmarks/Bookmarks.css"; // reuse same grid styles for consistent layout

const RecommendedGrid = () => {
  const [recommendedMovies, setRecommendedMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await fetch("/data.json");
      const json = await res.json();
      // ✅ only non-trending movies (the “recommended” ones)
      const recommended = json.filter((movie) => !movie.isTrending);
      setRecommendedMovies(recommended);
    };
    fetchMovies();
  }, []);

  const toggleBookmark = (title) => {
    setRecommendedMovies((prev) =>
      prev.map((movie) =>
        movie.title === title
          ? { ...movie, isBookmarked: !movie.isBookmarked }
          : movie
      )
    );
  };

  return (
    <>
      <h1 style={{ marginBottom: "2rem" }}>Recommended for you</h1>
      <section>
        <div className="container-of-movies">
          <div className="grid-cards">
            {recommendedMovies.map((movie, i) => (
              <div key={i} className="card">
                {/* ✅ Thumbnail */}
                <div className="image-container">
                  <img
                    className="thumbnail"
                    src={
                      movie.thumbnail.regular.large ||
                      movie.thumbnail.regular.medium ||
                      movie.thumbnail.regular.small
                    }
                    alt={movie.title}
                    onError={(e) => (e.target.src = "https://picsum.photos/400/250")}
                  />
                  {/* ✅ Bookmark icon */}
                  <button
                    type="button"
                    className="bookmark-button"
                    onClick={() => toggleBookmark(movie.title)}
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
                      alt="Bookmark icon"
                    />
                  </button>
                </div>

                {/* ✅ Info line */}
                <div
                  style={{
                    display: "flex",
                    gap: "8px",
                    height: "10px",
                    alignItems: "center",
                    marginTop: "5px",
                  }}
                >
                  <p>{movie.year}</p>
                  <div className="divider"></div>
                  <img
                    width={15}
                    height={15}
                    src={
                      movie.category === "Movie"
                        ? "/assets/icon-category-movie.svg"
                        : "/assets/icon-category-tv.svg"
                    }
                    alt=""
                  />
                  <p>{movie.category}</p>
                  <div className="divider"></div>
                  <p>{movie.rating}</p>
                </div>

                {/* ✅ Title */}
                <h2 style={{ marginTop: "10px" }}>{movie.title}</h2>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default RecommendedGrid;
