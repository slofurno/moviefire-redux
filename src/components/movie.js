import React, { Component, PropTypes } from 'react'
import { getAllCast } from '../actions'

const Movie = ({movie, cast}) => {
  let mycast = getAllCast(movie)
  return (
    <div>
      {movie.Name} {movie.Year} {movie.Rating}
      <ul>
        { mycast.map((x,i) => <li key={i}>{x}</li>)}
      </ul>
    </div>
  )
}

export default Movie
