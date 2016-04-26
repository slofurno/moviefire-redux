import React, { Component, PropTypes } from 'react'
import { getAllCast } from '../actions'

function castDetails(cast) {
  return function(id) {
    return cast[id] || {}
  }
}

const Movie = ({movie, cast}) => {
  let mycast = getAllCast(movie)
  let details = castDetails(cast)
  let directors = (movie.Directors || []).map(details)
  let writers = (movie.Writers || []).map(details)
  let actors = (movie.Actors || []).map(details)

  return (
    <div>
    <h3>
      {movie.Name} {` (${movie.Year})`} {` ${movie.Rating}/10`}
    </h3>
      <ul>
        Director
        { directors.map(({Name},i) => <li key={i}>{Name}</li>) }
      </ul>
      <ul>
        Writer
        { writers.map(({Name},i) => <li key={i}>{Name}</li>) }
      </ul>
      <ul>
        Actors
        { actors.map(({Name},i) => <li key={i}>{Name}</li>) }
      </ul>
    </div>
  )
}

export default Movie
