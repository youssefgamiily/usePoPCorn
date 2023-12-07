import { useEffect, useState } from 'react'
import StarRating from './StarRating'
import '../App.css'

export default function MoviePort ({movie, ratedMovies, setRatedMovies, clickedMovie, setClickedMovie}){
    const [isHidden, setIsHidden] = useState(false)
    let foundRatedMovie = ratedMovies.find((film) => film.imdbID ===movie.imdbID)
    console.log(foundRatedMovie)
    let styles = {
        color: "white",
        display: isHidden?"none":""
    }

    function handleMinimize () {
        setIsHidden(true)
        setClickedMovie(null)
    }

    return (
        <div className='MoviePort-wrapper'>
        <button className='hide-MoviePort' onClick={handleMinimize}>-</button>
        <div className='box moviePort-box' style={styles}>
            <div className='top-div'>
            <img src={movie.Poster} className='pic-MoviePort'></img>
            <div className='top-movie-details'>
                <h4>{movie.Title}</h4>
                <p>{movie.Released}</p>
                <p>{movie.Genre}</p>
                <p>⭐ {movie.Ratings[0].Value} IMDB rating</p>
            </div>
            </div>
            <div className='body-div'>
            {foundRatedMovie? (<p style={{margin:"auto"}}>You rated this movie <strong>{foundRatedMovie.userRating}</strong> ⭐🌟</p>) : <StarRating maxRating={10} movie={movie} array={ratedMovies} setArray={setRatedMovies}/>}
            <p><strong>Plot</strong> {movie.Plot}</p>
            <p><strong>starring</strong> {movie.Actors}</p>
            <p><strong>directed by</strong> {movie.Director}</p>
            </div>
        </div>
        </div>
    )
}

function Box({ list, Component, boxTitle, isLoading, setClickedMovie = null }) {
    console.log(list)
    return (
      <div className={`box box-${boxTitle}`}>
        {isLoading === true ? (
          <p className='loading-para'>Loading</p>
        ) : (
          <>
            {boxTitle === 'watchedMovies' && (
              <div className='watchedMovies-overview'>
                <h3>Movies You Watched</h3>
                <div className='overview-details'>
                  <div>
                    <p>#️⃣</p>
                    <p>{list.length}</p>
                  </div>
                  <div>
                    <p>⭐</p>
                    <p>{list.reduce((acc, curr) => acc+parseFloat(curr.imdbRating),0).toFixed(2)}</p>
                  </div>
                  <div>
                    <p>🌟</p>
                    <p>{list.reduce((acc, curr) => acc+parseFloat(curr.userRating),0)}</p>
                  </div>
                  <div>
                    <p>⏳</p>
                    <p>{list.reduce((acc, curr) => acc+parseFloat(curr.Runtime),0)} min</p>
                  </div>
                </div>
              </div>
            )}
            {list?.map(listElement => (
              <Component
                key={listElement.id} // Ensure to include a unique key for each mapped element
                listElement={listElement}
                setClickedMovie={setClickedMovie}
              />
            ))}
          </>
        )}
      </div>
    );
  }

  export {Box}
