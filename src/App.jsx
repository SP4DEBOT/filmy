import React, { useEffect } from "react";
import Navbar from "./components/Navbar.jsx";
import Movies from "./components/Movies.jsx";
import WatchList from "./components/watchList.jsx";
import Banner from "./components/Banner.jsx";
import MovieCard from "./components/MovieCard.jsx";
import { useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  let [watchList, setWatchList] = useState([]);

  let handleAddtoWatchList = (movieObj) => {
    let newWatchList = [...watchList, movieObj];
    localStorage.setItem("moviesapp", JSON.stringify(newWatchList));
    setWatchList(newWatchList);

    console.log(newWatchList);
  }

  let handleRemoveFromWatchList = (movieObj) => {
    let filteredWatchList = watchList.filter((movie) => {
       return movie.id != movieObj.id }
    );
    localStorage.setItem("moviesapp", JSON.stringify(filteredWatchList));
    setWatchList(filteredWatchList);
    console.log(filteredWatchList);
  }

  useEffect(() => {
    let moviesFromLocalStorage = localStorage.getItem("moviesapp");
    if (!moviesFromLocalStorage) {
      return;
    }
    setWatchList(JSON.parse(moviesFromLocalStorage));
  }, [])

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Banner /> <Movies watchList={watchList} handleAddtoWatchList={handleAddtoWatchList} handleRemoveFromWatchList={handleRemoveFromWatchList} />
              </>
            }
          />
          <Route path="/watchlist" element={<WatchList  watchList={watchList} 
          setWatchList={setWatchList}  handleRemoveFromWatchList={handleRemoveFromWatchList}/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
