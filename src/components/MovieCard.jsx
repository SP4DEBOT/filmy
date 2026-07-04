function MovieCard({
  poster_path,
  title,
  name,
  handleAddtoWatchList,
  handleRemoveFromWatchList,
  movieObj,
  watchList = [],
}) {
  function doesContain(movieObj) {
    return watchList.some((movie) => movie.id === movieObj.id);
  }

  const isInWatchlist = doesContain(movieObj);

  return (
    <div
      className="flex flex-col justify-between items-end h-[40vh] w-[200px] bg-cover bg-center rounded-xl cursor-pointer transition duration-300 transform-gpu will-change-transform hover:scale-105 hover:shadow-xl relative overflow-hidden"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/w500${poster_path})`,
      }}
    >
      {isInWatchlist ? (
        <div
          onClick={() => handleRemoveFromWatchList(movieObj)}
          className="m-4 flex justify-center h-8 w-8 items-center rounded-lg bg-gray-900/70 text-white font-bold text-lg absolute top-2 right-2"
        >
          &#10060;
        </div>
      ) : (
        <div
          onClick={() => handleAddtoWatchList(movieObj)}
          className="m-4 flex justify-center h-8 w-8 items-center rounded-lg bg-gray-900/70 text-white font-bold text-lg absolute top-2 right-2"
        >
          &#128525;
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 bg-gray-900/70 text-white text-sm font-semibold text-center p-2">
        {title || name || "Untitled"}
      </div>
    </div>
  );
}

export default MovieCard;
