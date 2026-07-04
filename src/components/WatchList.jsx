import React, { useState, useEffect } from "react";
import genreMap from "../utility/genre.js";

function WatchList({ watchList, setWatchList, handleRemoveFromWatchList }) {
  const [search, setSearch] = useState("");
  const [genreList, setGenreList] = useState(["All Genres"]);
  const [currentGenre, setCurrentGenre] = useState("All Genres");

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleFilter = (genre) => {
    setCurrentGenre(genre);
  };

  const sortIncreasing = () => {
    const sortedIncreasing = [...watchList].sort(
      (a, b) => a.vote_average - b.vote_average
    );
    setWatchList(sortedIncreasing);
  };

  const sortDecreasing = () => {
    const sortedDecreasing = [...watchList].sort(
      (a, b) => b.vote_average - a.vote_average
    );
    setWatchList(sortedDecreasing);
  };

  useEffect(() => {
    const temp = new Set(
      watchList.map((movie) => genreMap[movie.genre_ids?.[0]])
    );
    setGenreList(["All Genres", ...temp]);
  }, [watchList]);

  return (
    <>
      {/* Genre Filter Buttons */}
      <div className="flex justify-center flex-wrap m-4">
        {genreList.map((genre) => (
          <div
            key={genre}
            onClick={() => handleFilter(genre)}
            className={
              currentGenre === genre
                ? "flex justify-center h-[3rem] w-[9rem] rounded-xl items-center text-white font-bold bg-blue-400 mx-4 my-4"
                : "flex justify-center h-[3rem] w-[9rem] rounded-xl items-center text-white font-bold bg-gray-400/50 mx-4 my-4 transition duration-300 hover:scale-105 hover:shadow-xl relative overflow-hidden"
            }
          >
            {genre}
          </div>
        ))}
      </div>

      {/* Search Input */}
      <div className="flex justify-center my-4">
        <input
          onChange={handleSearch}
          value={search}
          type="text"
          className="h-[2rem] w-[18rem] bg-gray-200 outline-none px-2"
          placeholder="Search here"
        />
      </div>

      {/* Movie Table */}
      <div className="overflow-hidden rounded-lg border border-gray-200 m-8">
        <table className="w-full text-gray-500 text-center">
          <thead className="border-b-2">
            <tr>
              <th>Name</th>
              <th className="flex justify-center items-center">
                <div onClick={sortIncreasing} className="p-2 cursor-pointer">
                  <i className="fa-solid fa-arrow-up"></i>
                </div>
                <div className="p-2">Ratings</div>
                <div onClick={sortDecreasing} className="p-2 cursor-pointer">
                  <i className="fa-solid fa-arrow-down"></i>
                </div>
              </th>
              <th>Popularity</th>
              <th>Genre</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {watchList
              .filter((movie) =>
                currentGenre === "All Genres"
                  ? true
                  : genreMap[movie.genre_ids?.[0]] === currentGenre
              )
              .filter((movie) =>
                movie.title
                  ?.toLowerCase()
                  .includes(search.toLowerCase())
              )
              .map((movie) => (
                <tr key={movie.id} className="border-b-2">
                  <td className="flex items-center px-6 py-4">
                    <img
                      className="h-[6em] w-[10rem] object-cover rounded"
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title || movie.name}
                    />
                    <div className="mx-10">{movie.title || movie.name}</div>
                  </td>
                  <td>{movie.vote_average}</td>
                  <td>{movie.popularity}</td>
                  <td>{genreMap[movie.genre_ids?.[0]] || "Unknown"}</td>
                  <td
                    onClick={() => handleRemoveFromWatchList(movie)}
                    className="text-red-600 cursor-pointer"
                  >
                    Delete
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default WatchList;
