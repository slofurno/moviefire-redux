import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
import { render } from 'react-dom'

import configureStore from './store'
import App from './containers/app'
import Welcome from './containers/welcome'
import Login from './containers/login'
import MovieSearch from './containers/search'
import Suggestions from './containers/suggestions'

const store = configureStore()
let unsubscribe = store.subscribe(() => console.log(store.getState()))

class Root extends Component {
  render() {
    const { store, history } = this.props
    return (
      <Provider store={store}>
        <Router history={history}>
          <Route path="/" component={App}>
            <Route path="/search/:title" component={MovieSearch}/>
            <Route path="/suggestions/:movieId" component={Suggestions}/>
            <Route path="/login/:name" component={Welcome}/>
            <Route path="/login" component={Login}/>
          </Route>
        </Router>
      </Provider>
    )
  }
}

render(
  <Root store={store} history={browserHistory}/>,
  document.getElementById('root')
)
