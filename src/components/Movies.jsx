import { useEffect, useState } from 'react'
import '../assets/Movies.css'

function WatchedMovie({ listElement, setClickedMovie,setIsHidden, ratedMovies, setRatedMovies }) {
    console.log(listElement)
    /*onClick={setClickedMovie(list)}*/
    function handleClick () {
      // setIsHidden(()=>!isHidden)
      setClickedMovie(listElement.imdbID)
    }
    function deleteMovie (imdbID) {
      console.log("ratedMovies is: ", ratedMovies)
      let newRatedMovies = ratedMovies.filter((movie) => movie.imdbID !== imdbID)
      localStorage.setItem("ratedMovies", JSON.stringify(newRatedMovies) )
      setRatedMovies(newRatedMovies)
      
      console.log("ratedMovies is: ", ratedMovies)

    }
    return (
      <div className='watchedMovie movie' onClick={(e) => {
        if(e.target.className !== 'deleteButton') return handleClick}} >
        <img src={listElement.Poster} />
        <div className='watchedMovie-details movie-details'>
          <h2 className='watchedMovie-title'> {listElement.Title}</h2>
          <div className='watchedMovie-rating movie-details'>
            <p className='imdb-rating'>⭐ {listElement.imdbRating}</p>
            <p className='user-rating'>🌟 {listElement.userRating}</p>
            <p className='movie-duration'>⏳ {listElement.Runtime}</p>
          </div>
          <button className='deleteButton' onClick={() => deleteMovie(listElement.imdbID)}>Delete</button>
        </div>
      </div>
    )
  }
  function FoundMovie({ listElement, setClickedMovie }) {
    return (
      <div onClick={()=>{setClickedMovie(listElement.imdbID)}} className='foundMovie movie'>
        <img src={listElement.Poster} />
        <div className='foundMovie-data movie-details'>
          <h2 className='foundMovie-title'>{listElement.Title}</h2>
          <h3 className='foundMovie-releaseDate'>{listElement.Year}</h3>
        </div>
      </div>
    )
  }

  export{WatchedMovie, FoundMovie}