import {combineReducers} from 'redux'
import {
  LOGIN_USER,
  SEARCH_MOVIES_SUCCESS,
  GET_SUGGESTIONS_SUCCESS,
  GET_MOVIE_SUCCESS,
  GET_CAST_SUCCESS,
} from './actions'

const initialUser = {
  loggedIn: false,
  userName: ""
}

function user(state = initialUser, action) {
  switch(action.type) {
  case LOGIN_USER:
    return {
      loggedIn: true,
      userName: action.name
    }
  default:
    return state
  }
}

function searchResults(state = [], action) {
  switch(action.type) {
  case SEARCH_MOVIES_SUCCESS:
    return action.movies
  default:
    return state
  }
}

function suggestions(state = [], action) {
  switch(action.type) {
  case GET_SUGGESTIONS_SUCCESS:
    return action.movies
  default:
    return state
  }
}

function movies(state = {}, action) {
  switch(action.type) {
  case GET_MOVIE_SUCCESS:
    return Object.assign({}, state, action.movie)
  default:
    return state
  }
}

function cast(state = {}, action) {
  switch(action.type) {
  case GET_CAST_SUCCESS:
    return Object.assign({}, state, action.actor)
  default:
    return state
  }
}

const rootReducer = combineReducers({
  user,
  searchResults,
  suggestions,
  movies,
  cast
})

export default rootReducer
