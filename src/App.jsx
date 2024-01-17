import { useEffect, useState } from 'react'
import StarRating from './components/StarRating'
import MoviePort from './components/Displays'
import './App.css'
import { Box } from './components/Displays'
import { Navbar } from './components/NavBar'
import {WatchedMovie, FoundMovie} from './components/Movies'

function App() {
  const [searchResults, setSearchResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [clickedMovie, setClickedMovie] = useState(null)
  const [ratedMovies, setRatedMovies] = useState([])
  console.log(ratedMovies)

  useEffect(function () {
    document.title= clickedMovie?.Title || "usePopCorn" 
  }, [clickedMovie])

  useEffect (function () {
    let ratedMoviesFromStorage = JSON.parse(localStorage.getItem("ratedMovies"));
    console.log("ratedMoviesFromStorage is: ", ratedMoviesFromStorage)
    if ( (ratedMoviesFromStorage) !== null ) {
      console.log (ratedMoviesFromStorage)
      setRatedMovies(ratedMoviesFromStorage)
    }
  }, [])
  async function setMoviePort (id) {
    let fetchedMovie
    await fetch(`http://www.omdbapi.com/?i=${id}&apikey=94a55c5a`).then(data => data.json()).then(res => {
      console.log(res);
      setClickedMovie(res)
      console.log("clickedMovieState is now: ",clickedMovie)
    })
  }

  return (
    <div className='app'>
      <Navbar searchResults={searchResults} setSearchResults={setSearchResults} setIsLoading={setIsLoading} />
      <div className='main'>
        {/* <Box list={tempMovieData} Component={FoundMovie} boxTitle="searchResults"/>  */}
        <Box list={searchResults} Component={FoundMovie} boxTitle="searchResults" isLoading={isLoading} setClickedMovie={setMoviePort}/> { /* Found Movies Box */}
        {clickedMovie ===null ? <Box list={ratedMovies} Component={WatchedMovie} boxTitle="watchedMovies" isLoading={false} setClickedMovie={setMoviePort} />:<MoviePort movie={clickedMovie} ratedMovies={ratedMovies} setRatedMovies={setRatedMovies} clickedMovie={clickedMovie} setClickedMovie={setClickedMovie}/> }
      </div>
    </div>
  )
}

export default App
