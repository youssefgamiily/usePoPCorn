import { useEffect, useState } from 'react'
import StarRating from './components/StarRating'
import './App.css'

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const ratedMovies = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

function Searchbar({ setSearchResults, setIsLoading }) {
  const [searchValue, setSearchValue] = useState("")
  
  function handleSearch(e) {
    e.preventDefault()
    setIsLoading(true)
    setSearchValue(()=>e.target.value)
    let searchResArr
    fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=94a55c5a&s=${e.target.value}`).then(data => data.json()).then(res => {
      console.log(res);
      setSearchResults(res.Search);
      setIsLoading(()=>false)
      return res.Search
    })


  }
  return (
    <input type="search" value={searchValue} onChange={(e) => handleSearch(e)} placeholder="movie name"></input>
  )
}

function Logo() {
  return (<div className='logo'>
    <h1>🍿</h1>
    <h2>usePopCorn</h2>
  </div>)
}

function FoundResults({number}) {
  return (<div className='foundResults'>
    <h2>found <strong>{number}</strong> results</h2>
  </div>)
}
function Navbar({ searchResults, setSearchResults, setIsLoading }) {
  console.log(searchResults)

  return (
    <div className='Navbar'>
      <Logo />
      <Searchbar searchResults={searchResults} setSearchResults={setSearchResults} setIsLoading={setIsLoading} />
      <FoundResults number={searchResults?.length} />
    </div>
  )
}

// function Box({ list, Component, boxTitle, isLoading, setClickedMovie=null}) {
//   return (
//     <div className={`box box-${boxTitle}`}>
//     {isLoading===true? <p className='loading-para'>Loading</p>:
//       <>
//       {boxTitle==='watchedMovies'? (<div className='watchedMovies-overview'>overview</div>)}
//       list?.map(listElement => {
//         return (<Component listElement={listElement} setClickedMovie={setClickedMovie} />)
//       })
//       </>
//       }
//     </div>
//   )
// }


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
                  <p>{list.reduce((acc, curr) => acc+parseFloat(curr.imdbRating),0)}</p>
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

function MoviePort ({movie, ratedMovies, setRatedMovies, clickedMovie, setClickedMovie}){
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
  )}

function App() {
  const [searchResults, setSearchResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [clickedMovie, setClickedMovie] = useState(null)
  const [ratedMovies, setRatedMovies] = useState([])
  console.log(ratedMovies)

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
