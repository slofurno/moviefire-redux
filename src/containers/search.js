import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link, browserHistory } from 'react-router'

import { searchMovies } from '../actions'

function loadData(props) {
  const { searchMovies, title } = props
  searchMovies(title)
}

class MovieSearch extends Component {
  componentWillMount() {
    loadData(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.title !== this.props.title) {
      loadData(nextProps)
    }
  }

  render() {
    const { searchResults } = this.props

    let movies = searchResults.map(({ Name, Rating, Year, Id }, i) =>
          <li key={i}>
            <Link to={`/suggestions/${Id}`} >{ Name } { Year } { Rating }</Link>
          </li> )

    return (
      <div>
        {movies}
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
	const { title } = ownProps.params
  return {
		...state,
    title
	}
}

export default connect(mapStateToProps, {searchMovies})(MovieSearch)
