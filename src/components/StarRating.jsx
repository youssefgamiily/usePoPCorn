import { useState } from 'react'
console.log(useState)
// import React from 'react';
let StarStyle = {
    color: "white"
}
function Star ({clicked, setClickedStar, index, setTempRating, tempRating}) {
    return (
        <svg
        className='star'
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill={index < tempRating? "yellow": clicked? "yellow": "none"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        onClick={(e) => {console.log(e.target.value);setClickedStar(index+1)}}
        onMouseEnter={(e)=> {console.log(e.target.value);setTempRating(index+1)}}
        onMouseLeave={(e)=> {setTempRating(null)}}
        >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
    ); 
}
  
export default function StarRating ({maxRating, movie, array, setArray}) {
    console.log("maxRating: ", maxRating, "\n movie: ", movie, " \narray: ", array)
    const [tempRating, setTempRating] = useState(0);
    const [clickedStar, setClickedStar] = useState(0);
    (function () {
        if(clickedStar !== 0) {
            let movieClone= structuredClone(movie)
            movieClone.userRating=clickedStar
            console.log(movie)
            setArray([...array, movieClone])
            localStorage.setItem("ratedMovies", JSON.stringify([...array, movieClone]) )
            console.log("stringify([...array, movieClone]) is: ", JSON.stringify([...array, movieClone]))
        }
    })()
    return <div className='rating'>
        {Array.from({length: maxRating},(_,i)=> (
        <Star clicked={tempRating === null ? i<clickedStar? true: false :i<clickedStar? true: false} setClickedStar={setClickedStar} index={i} setTempRating={setTempRating} tempRating={tempRating}/>
        ))}
    </div>
}