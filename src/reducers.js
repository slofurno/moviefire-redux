import {combineReducers} from 'redux'
import {
  LOGIN_USER,
  SEARCH_MOVIES_SUCCESS,
  GET_SUGGESTIONS_SUCCESS,
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

const rootReducer = combineReducers({
  user,
  searchResults,
  suggestions
})

export default rootReducer
