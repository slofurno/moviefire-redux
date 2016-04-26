import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

function searchMovies(title) {
  title = title.replace(/[^\w\d]/g, "")
  browserHistory.push(`/search/${title}`)
}

class App extends Component {
  render() {
    const { children } = this.props
		return (
      <div style = {{
        display: "flex",
        flexDirection: "column",
        height: "600px",
        width: "400px",
        backgroundColor: "ghostwhite"
      }}>
       <input type="text" ref="movieTitle" placeholder="movie title..."/>
       <input type="button" value="Search" onClick = { () => searchMovies(this.refs.movieTitle.value) }/>

        { children }
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return state
}

export default connect(mapStateToProps, {})(App)
