import { useEffect, useState } from 'react'

function WatchedMovie({ listElement, setClickedMovie,setIsHidden }) {
    console.log(listElement)
    /*onClick={setClickedMovie(list)}*/
    function handleClick () {
      // setIsHidden(()=>!isHidden)
      setClickedMovie(listElement.imdbID)
    }
    return (
      <div className='watchedMovie movie' onClick={handleClick} >
        <img src={listElement.Poster} />
        <div className='watchedMovie-details movie-details'>
          <h2 className='watchedMovie-title'> {listElement.Title}</h2>
          <div className='watchedMovie-rating movie-details'>
            <p className='imdb-rating'>⭐ {listElement.imdbRating}</p>
            <p className='user-rating'>🌟 {listElement.userRating}</p>
            <p className='movie-duration'>⏳ {listElement.Runtime}</p>
          </div>
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