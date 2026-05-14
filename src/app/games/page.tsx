"use client";

import { useState } from "react";

import GameCard from "@/components/GameCard";
import { games } from "@/data/games";

const GENRE_OPTIONS = [
  "All",
  "Action",
  "RPG",
  "Adventure",
  "Fantasy",
  "Strategy",
];

const PLATFORM_OPTIONS = ["All", "PC", "PS5", "Xbox", "Switch"];

const YEAR_RANGE_OPTIONS = [
  { label: "All", value: "All" },
  { label: "2024-2025", value: "2024-2025" },
  { label: "2022-2023", value: "2022-2023" },
  { label: "2020-2021", value: "2020-2021" },
  { label: "Before 2020", value: "before-2020" },
];

const SORT_OPTIONS = [
  { label: "Highest Rating", value: "rating" },
  { label: "Newest", value: "newest" },
  { label: "Lowest Price", value: "price" },
  { label: "Alphabetical", value: "title" },
];

function matchesYearRange(releaseDate: string, selectedYearRange: string) {
  if (selectedYearRange === "All") {
    return true;
  }

  const releaseYear = new Date(releaseDate).getFullYear();

  if (selectedYearRange === "2024-2025") {
    return releaseYear >= 2024 && releaseYear <= 2025;
  }

  if (selectedYearRange === "2022-2023") {
    return releaseYear >= 2022 && releaseYear <= 2023;
  }

  if (selectedYearRange === "2020-2021") {
    return releaseYear >= 2020 && releaseYear <= 2021;
  }

  if (selectedYearRange === "before-2020") {
    return releaseYear < 2020;
  }

  return true;
}

export default function GamesPage() {
  const gamesPerPage = 15;

  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [selectedPlatform, setSelectedPlatform] = useState("All");
  const [selectedYearRange, setSelectedYearRange] = useState("All");
  const [sortBy, setSortBy] = useState("rating");

  const resetPageAndSet =
    (setter: (value: string) => void) => (value: string) => {
      setter(value);
      setCurrentPage(1);
    };

  const filteredGames = games
    .filter((game) => {
      const matchSearch = game.title
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchGenre =
        selectedGenre === "All" || game.genres.includes(selectedGenre);
      const matchPlatform =
        selectedPlatform === "All" || game.platforms.includes(selectedPlatform);
      const matchYear = matchesYearRange(game.releaseDate, selectedYearRange);

      return matchSearch && matchGenre && matchPlatform && matchYear;
    })
    .sort((a, b) => {
      if (sortBy === "rating") {
        return b.rating - a.rating;
      }

      if (sortBy === "price") {
        return a.price - b.price;
      }

      if (sortBy === "title") {
        return a.title.localeCompare(b.title);
      }

      if (sortBy === "newest") {
        return (
          new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
        );
      }

      return 0;
    });

  const totalPages = Math.max(
    1,
    Math.ceil(filteredGames.length / gamesPerPage),
  );
  const currentGames = filteredGames.slice(
    (currentPage - 1) * gamesPerPage,
    currentPage * gamesPerPage,
  );
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1,
  );

  return (
    <div className="min-h-screen space-y-14 px-4 md:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="mb-3 text-5xl font-bold tracking-tight">Browse Games</h1>
        <p className="text-lg leading-relaxed text-slate-400">
          Discover your next favorite game
        </p>
      </div>

      <div className="mx-auto max-w-6xl rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl shadow-black/20 backdrop-blur">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300 ">
              Search
            </label>
            <input
              type="text"
              placeholder="Search game..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 outline-none transition 
              placeholder:text-slate-500 focus:border-violet-500 focus:bg-slate-800/90 px-5"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Genre
            </label>
            <select
              value={selectedGenre}
              onChange={(e) =>
                resetPageAndSet(setSelectedGenre)(e.target.value)
              }
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 focus:border-violet-500 px-5"
            >
              {GENRE_OPTIONS.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Platform
            </label>
            <select
              value={selectedPlatform}
              onChange={(e) =>
                resetPageAndSet(setSelectedPlatform)(e.target.value)
              }
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 focus:border-violet-500 px-5"
            >
              {PLATFORM_OPTIONS.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Year Range
            </label>
            <select
              value={selectedYearRange}
              onChange={(e) =>
                resetPageAndSet(setSelectedYearRange)(e.target.value)
              }
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 focus:border-violet-500 px-5"
            >
              {YEAR_RANGE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 focus:border-violet-500 px-5 "
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl ">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold tracking-tight">All Games</h2>
          <p className="text-slate-400">{filteredGames.length} games found</p>
        </div>

        {filteredGames.length > 0 ? (
          <>
            <div className="mb-6 mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {currentGames.map((game) => (
                <GameCard
                  key={game.id}
                  slug={game.slug}
                  title={game.title}
                  image={game.coverImage}
                  genres={game.genres}
                  platforms={game.platforms}
                  rating={game.rating}
                  price={game.price}
                />
              ))}
            </div>

            <div className="mt-16 flex w-full justify-center">
              <div className="mx-auto flex w-fit flex-wrap items-center justify-center gap-6">
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="min-w-[8rem] rounded-xl bg-slate-800 px-6 py-3 text-center transition duration-200 hover:-translate-y-0.5 hover:scale-105 hover:bg-slate-700 hover:shadow-lg hover:shadow-violet-500/10 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:scale-100"
                >
                  Previous
                </button>

                {pageNumbers.map((pageNumber) => (
                  <button
                    key={pageNumber}
                    onClick={() => setCurrentPage(pageNumber)}
                    className={`min-w-[8rem] rounded-xl bg-slate-800 px-6 py-3 text-center text-base font-semibold leading-none transition duration-200 hover:-translate-y-0.5 hover:scale-105 hover:bg-slate-700 hover:shadow-lg hover:shadow-violet-500/10 ${
                      currentPage === pageNumber
                        ? "bg-violet-500 text-white shadow-lg shadow-violet-500/30"
                        : "text-slate-200"
                    }`}
                  >
                    {pageNumber}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="min-w-[8rem] rounded-xl bg-slate-800 px-6 py-3 text-center transition duration-200 hover:-translate-y-0.5 hover:scale-105 hover:bg-slate-700 hover:shadow-lg hover:shadow-violet-500/10 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:scale-100"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900/80 py-20 text-center shadow-2xl shadow-black/20">
            <h2 className="mb-3 text-3xl font-bold">No Games Found</h2>
            <p className="text-slate-400">Try another keyword or filter</p>
          </div>
        )}
      </div>
    </div>
  );
}
