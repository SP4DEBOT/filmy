import MovieCard from './MovieCard';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Pagination from './Pagination';

function Movies({handleAddtoWatchList, handleRemoveFromWatchList, watchList}) {
  const [movies, setMovies] = useState([]);
  const [pageNo, setPageNo] = useState(1);

  const handlePrev = () => {
    if(pageNo==1){
      setPageNo(pageNo);
    }
    else{
      setPageNo(pageNo - 1);
    }
    
  }
  
  const handleNext = () => {
    setPageNo(pageNo + 1);
  }
  useEffect(() => {
    
    axios
    .get(
      `https://api.themoviedb.org/3/movie/popular?api_key=e4357bbd493b2e5d8c4897ab73edff7f&language=en-US&page=${pageNo}`
    )
  
      .then(function (res) {
        setMovies(res.data.results); 
      })
      .catch(function (err) {
        console.error('Error fetching movies:', err);
      });
  }, [pageNo]);

  return (
    <div className='p-5'>
      <div className='text-2xl font-bold text-center mb-6'>Trending Movies</div>
      <div className='flex flex-row flex-wrap justify-around gap-6'>
        {movies.map((movieObj) => (
          <MovieCard
            key={movieObj.id}
            poster_path={movieObj.poster_path}
            name={movieObj.original_title}
            handleAddtoWatchList={handleAddtoWatchList}
            handleRemoveFromWatchList={handleRemoveFromWatchList}
            movieObj={movieObj}
            watchList={watchList}

          />
        ))}
      </div>
      <Pagination pageNo={pageNo} handlePrev={handlePrev} handleNext={handleNext} />
    </div>
  );
}

export default Movies;
