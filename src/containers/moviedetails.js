import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link, browserHistory } from 'react-router'

import { maybeGetMovieDetails } from '../actions'
import Movie from '../components/movie'

function loadData(props) {
  const { maybeGetMovieDetails, movieId } = props
  maybeGetMovieDetails(movieId)
}

class MovieDetails extends Component {
  componentWillMount() {
    loadData(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.movieId !== this.props.movieId) {
      loadData(nextProps)
    }
  }

  render() {
    const { movieId, movies, cast } = this.props
    let movie = movies[movieId] || {}
    return (
      <Movie movie={movie} cast={cast}/>
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

export default connect(mapStateToProps, {maybeGetMovieDetails})(MovieDetails)
