/// <reference path="../typings/index.d.ts" />
/// <reference path="../react-router.d.ts" />

import React from 'react';
import { render } from 'react-dom';
import {
	IRouterProps,
	Router,
	ILinkProps,
	Link,
	IndexLink,
	IRouterContext,
	IRouter,
	RouterContext,
	IRouteProps,
	Route,
	PlainRoute,
	IRedirectProps,
	Redirect,
	IndexRoute,
	IIndexRouteProps,
	IndexRedirect,
	IInjectedProps,
	browserHistory,
	hashHistory,
	createMemoryHistory,
	useRouterHistory,
	IMatchArgs,
	match,
	createRoutes
} from '../react-router'

const App = React.createClass({
  render() {
    return (
      <div>
        <ul>
          <li><Link to="/dashboard" activeClassName="active">Dashboard</Link></li>
          <li><Link to="/form" activeClassName="active">Form</Link></li>
        </ul>
        {this.props.children}
      </div>
    )
  }
})

const Dashboard = React.createClass({
  render() {
    return <h1>Dashboard</h1>
  }
})

const Form = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  componentWillMount() {
    this.context.router.setRouteLeaveHook(
      this.props.route,
      this.routerWillLeave
    )
  },

  getInitialState() {
    return {
      textValue: 'ohai'
    }
  },

  routerWillLeave() {
    if (this.state.textValue)
      return 'You have unsaved information, are you sure you want to leave this page?'
  },

  handleChange(event:any) {
    this.setState({
      textValue: event.target.value
    })
  },

  handleSubmit(event:any) {
    event.preventDefault()

    this.setState({
      textValue: ''
    }, () => {
      this.context.router.push('/')
    })
  },

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <p>Click the dashboard link with text in the input.</p>
          <input type="text" ref="userInput" value={this.state.textValue} onChange={this.handleChange} />
          <button type="submit">Go</button>
        </form>
      </div>
    )
  }
})

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="dashboard" component={Dashboard} />
      <Route path="form" component={Form} />
    </Route>
  </Router>
), document.getElementById('example'))