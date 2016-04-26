import firebase from './firebase'
import { union } from './utils'

export const LOGIN_USER = "LOGIN_USER"
export const SEARCH_MOVIES_SUCCESS = "SEARCH_MOVIES_SUCCESS"
export const GET_SUGGESTIONS_SUCCESS = "GET_SUGGESTIONS_SUCCESS"
export const GET_MOVIE_SUCCESS = "GET_MOVIE_SUCCESS"
export const GET_CAST_SUCCESS = "GET_CAST_SUCCESS"

const movies = firebase("https://firemovies.firebaseio.com/movies")
const cast = firebase("https://firemovies.firebaseio.com/cast")
const movielookup = firebase("https://firemovies.firebaseio.com/movielookup")

export function maybeFetchMovieDetails(id) {
  const { dispatch, flux } = this
  const { MovieStore } = flux.stores
  const { movieDetail } = MovieStore

  //TODO: move into willmount + rename fn
  if (movieDetail && movieDetail.Id === id) {
    return
  }

  movielookup.get([id])
  .then(([x]) => {
    dispatch(FETCH_DETAIL_SUCCESS, {movie: x})
  })
  .catch(err => console.log(err))
}

export function showMovieDetails(id) {
  const { dispatch, flux } = this
  movielookup.get([id])
  .then(([x]) => {
    dispatch(FETCH_DETAIL_SUCCESS, {movie: x})
  })
  .catch(err => console.log(err))

}

function searchMoviesSuccess(movies) {
  return {
    type: SEARCH_MOVIES_SUCCESS,
    movies
  }
}

export function searchMovies(title) {
  title = title.replace('\x20','').toLowerCase();
  return (dispatch, getState) => {
    movies.search(title)
    .then(movies => dispatch(searchMoviesSuccess(movies)))
    .catch(err => {
      console.error(err)
    })
  }
}

function getSuggestionsSuccess(movies) {
  return {
    type: GET_SUGGESTIONS_SUCCESS,
    movies
  }
}

export function getOrFetchCast(xs) {
  return (dispatch, getState) => {
    const { cast } = getState()
    return Promise.all(xs.map(x => _getOrFetchCast(x, cast, dispatch)))
  }
}

function _getOrFetchCast(id, mycast, dispatch) {
  if (mycast[id]) {
    return Promise.resolve(mycast[id])
  }

  return cast.get([id])
    .then(([x]) => {
      dispatch(getCastSuccess(x))
      return x
    })
}

function getOrFetchMovie(id, mymovies, dispatch) {
}

function getMovieSuccess(movie) {
  let m = {}
  m[movie.Id] = movie
  return {
    type: GET_MOVIE_SUCCESS,
    movie: m
  }
}

function _maybeLookupMovie(id, movies, dispatch) {
  if (movies[id]) {
    return Promise.resolve(movies[id])
  } else {
    return movielookup.get([id])
      .then(([x]) => {
        dispatch(getMovieSuccess(x))
        return x
      })
  }
}

export function maybeGetMovieDetails(id) {
  return (dispatch, getState) => {
    const { movies } = getState()
    return _maybeLookupMovie(id, movies, dispatch)
      .then(movie => {
        let xs = getAllCast(movie)
        const { cast } = getState()
        return Promise.all(xs.map(x => _getOrFetchCast(x, cast, dispatch)))
      })
      .catch(log)
  }
}

function getCastSuccess(actor) {
  let m = {}
  m[actor.Id] = actor
  return {
    type: GET_CAST_SUCCESS,
    actor: m
  }
}

export function getMovieSuggestions(movie) {
  return (dispatch, getState) => {
    const { movies } = getState()
    //return movielookup.get([movie])
    return _maybeLookupMovie(movie, movies, dispatch)
      .then((first) => getAllCast(first))
      .then(c => {
        const { cast } = getState()
        return Promise.all(c.map(x => _getOrFetchCast(x, cast, dispatch)))
      })
      //.then(cast.get)
      .then(xs => {
        let seen = {}
        xs.map(x => x.Movies)
          .reduce((a,c) => a.concat(c))
          .forEach(x => seen[x] = seen[x] ? seen[x] + 1 : 1)

        let kvp = Object.keys(seen).map(k => [k, seen[k]])
        kvp.sort((a,b) => b[1] - a[1])

        return kvp.slice(1,11).map(([k,v]) => k)
      })
      .then(matches => {
        const { movies } = getState()
        return Promise.all(matches.map(x => _maybeLookupMovie(x, movies, dispatch)))
      })
      .then(movies => dispatch(getSuggestionsSuccess(movies)))
      .catch(err => console.log(err.stack))
  }
}

export function loginUser(name) {
  return {
    type: LOGIN_USER,
    name
  }
}

function log(err) {
  console.error(err)
}

export function getAllCast(movie) {
  return ["Actors","Directors","Writers"]
      .map(x => movie[x] || [])
      .reduce((a,c) => a.concat(c))
}
