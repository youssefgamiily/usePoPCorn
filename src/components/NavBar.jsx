import { useEffect, useState } from 'react'
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

  export {Searchbar, Logo, FoundResults, Navbar}