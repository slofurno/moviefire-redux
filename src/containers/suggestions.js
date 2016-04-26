import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link, browserHistory } from 'react-router'

import { getMovieSuggestions } from '../actions'

function loadData(props) {
  const { getMovieSuggestions, movieId } = props
  getMovieSuggestions(movieId)
}

class Suggestions extends Component {
  componentWillMount() {
    loadData(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.movieId !== this.props.movieId) {
      loadData(nextProps)
    }
  }

  render() {
    const { suggestions } = this.props
    let movies = suggestions.map(({ Name, Rating, Year, Id }, i) =>
          <li key={i}>
            <Link to={`/movies/${Id}`} >{ Name } { Year } { Rating }</Link>
          </li> )

    return (
      <div>
        {movies}
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
	const { movieId } = ownProps.params
  return {
		...state,
    movieId
	}
}

export default connect(mapStateToProps, {getMovieSuggestions})(Suggestions)
