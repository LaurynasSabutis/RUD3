import React, { useState } from "react";
import MovieCarousel from "../components/MovieCarousel";
import RecommendedGrid from "../components/RecommendedGrid";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="bg-[#10141E] text-white min-h-screen px-6 md:px-10 py-8">
      {/* There should be working search */}
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
      {/* Trending section */}
      <MovieCarousel searchQuery={searchQuery} />

      {/* Recommended section */}
      <RecommendedGrid searchQuery={searchQuery} />
    </div>
  );
};

export default Home;
