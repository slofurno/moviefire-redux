import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

class Login extends Component {
  handleChange(next) {
    browserHistory.push(`/login/${next}`)
  }

  render() {
    const { loginUser } = this.props
    return (
      <div>
        <input type="text" ref="login" placeholder="login as.."/>
        <input type="button" value="login" onClick={() => this.handleChange(this.refs.login.value)}/>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {}
}

export default connect(mapStateToProps, {})(Login)
