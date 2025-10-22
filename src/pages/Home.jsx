import React from "react";
import MovieCarousel from "../components/MovieCarousel";
import RecommendedGrid from "../components/RecommendedGrid";

const Home = () => {
  return (
    <div className="bg-[#10141E] text-white min-h-screen px-6 md:px-10 py-8">
      {/* Trending section */}
      <MovieCarousel />

      {/* Recommended section */}
      <RecommendedGrid />
    </div>
  );
};

export default Home;
