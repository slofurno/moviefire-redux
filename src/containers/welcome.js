import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { loginUser } from '../actions'

function loadData(props) {
  const { name, loginUser } = props
  console.log(name)
  loginUser(name)
}

class Welcome extends Component {
  componentWillMount() {
    loadData(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.name !== this.props.name) {
      loadData(nextProps)
    }
  }

  render() {
		const { user } = this.props
    const { userName, loggedIn } = user
    return (
      <div>
        <h2>welcome { userName }</h2>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  console.log(state, ownProps)
	const { name } = ownProps.params
  return {
		...state,
    name
	}
}

export default connect(mapStateToProps, {loginUser})(Welcome)
