import React, { useState } from "react";

const movies = [
  {
    id: 1,
    year: 2019,
    type: "Movie",
    rating: "PG",
    title: "The Great Lands",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 2,
    year: 2017,
    type: "Movie",
    rating: "18+",
    title: "Earth’s Untouched",
    image:
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 3,
    year: 2019,
    type: "Movie",
    rating: "E",
    title: "No Land Beyond",
    image:
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 4,
    year: 2017,
    type: "Movie",
    rating: "E",
    title: "Same Answer II",
    image:
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=400&q=80",
  },
  // Add more movies here similarly, matching your screenshot images or placeholders
];

const Sidebar = () => {
  return (
    <div style={styles.sidebar}>
      <div style={styles.logo}>
        <svg
          style={{ width: 32, height: 32 }}
          fill="#f44336"
          viewBox="0 0 24 24"
          stroke="none"
        >
          <path d="M5 3h14v18H5z" />
        </svg>
      </div>
      <div style={styles.sidebarIcons}>
        <div style={styles.iconBox}>
          <svg
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
            width={24}
            height={24}
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>
        <div style={styles.iconBox}>
          <svg
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
            width={24}
            height={24}
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
        </div>
        <div style={styles.iconBox}>
          <svg
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
            width={24}
            height={24}
          >
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
            <path d="M16 3v4M8 3v4M2 11h20"></path>
          </svg>
        </div>
        <div style={styles.iconBox}>
          <svg
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
            width={24}
            height={24}
          >
            <path d="M5 3v18l15-9z"></path>
          </svg>
        </div>
      </div>
      <div style={styles.profilePic}>
        <img
          src="https://randomuser.me/api/portraits/men/45.jpg"
          alt="profile"
          style={{ borderRadius: "50%", width: 40, height: 40 }}
        />
      </div>
    </div>
  );
};

const MovieCard = ({ movie }) => {
  const [bookmarked, setBookmarked] = useState(false);

  return (
    <div style={styles.movieCard}>
      <div style={styles.imageWrapper}>
        <img src={movie.image} alt={movie.title} style={styles.movieImage} />
        <div
          onClick={() => setBookmarked(!bookmarked)}
          style={styles.bookmarkIcon}
          title={bookmarked ? "Remove bookmark" : "Bookmark"}
        >
          {bookmarked ? (
            <svg
              fill="#f44336"
              stroke="#f44336"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
              width={20}
              height={20}
            >
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
            </svg>
          ) : (
            <svg
              fill="none"
              stroke="#ccc"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
              width={20}
              height={20}
            >
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
            </svg>
          )}
        </div>
      </div>
      <div style={styles.movieInfo}>
        <small style={{ color: "#999" }}>
          {movie.year} • {movie.type} • {movie.rating}
        </small>
        <div style={{ fontWeight: "bold", marginTop: 4 }}>{movie.title}</div>
      </div>
    </div>
  );
};

export default function MovieGallery() {
  const [search, setSearch] = useState("");

  const filteredMovies = movies.filter((m) =>
    m.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <Sidebar />
      <main style={styles.mainContent}>
        <div style={styles.searchWrapper}>
          <svg
            fill="none"
            stroke="#bbb"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
            width={24}
            height={24}
            style={{ marginRight: 8 }}
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            placeholder="Search for movies"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.searchInput}
          />
        </div>

        <h2 style={{ color: "white", marginBottom: 16 }}>Movies</h2>

        <div style={styles.moviesGrid}>
          {filteredMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </main>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    backgroundColor: "#161b22",
    height: "100vh",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  sidebar: {
    width: 72,
    backgroundColor: "#1f2937",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 20,
    justifyContent: "space-between",
  },
  logo: {
    marginBottom: 24,
  },
  sidebarIcons: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    gap: 30,
    alignItems: "center",
  },
  iconBox: {
    cursor: "pointer",
  },
  profilePic: {
    marginTop: 24,
  },
  mainContent: {
    flexGrow: 1,
    padding: "24px 40px",
    overflowY: "auto",
  },
  searchWrapper: {
    display: "flex",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#22272e",
    padding: "10px 16px",
    borderRadius: 6,
  },
  searchInput: {
    flexGrow: 1,
    border: "none",
    backgroundColor: "transparent",
    color: "white",
    fontSize: 16,
    outline: "none",
  },
  moviesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))",
    gap: 16,
  },
  movieCard: {
    backgroundColor: "#22272e",
    borderRadius: 8,
    overflow: "hidden",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
  },
  imageWrapper: {
    position: "relative",
  },
  movieImage: {
    width: "100%",
    height: 140,
    objectFit: "cover",
  },
  bookmarkIcon: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "rgba(0,0,0,0.4)",
    borderRadius: "50%",
    padding: 6,
    cursor: "pointer",
  },
  movieInfo: {
    padding: 12,
    color: "white",
  },
};
