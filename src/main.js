import React, { Component } from 'react';
import SignUpForm from './Components/Auth/SignUpForm';
import SignInForm from './Components/Auth/SignInForm';
import SignOutLink from './Components/Auth/SignOutLink';
import LandingPage from './Containers/LandingPage';
import UploadProduct from './Containers/uploadProduct';
import { Router, Route, Link, browserHistory } from 'react-router'

import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import rootReducer from './Reducers/index';
import { Provider } from 'react-redux'

import './App.css';
var $ = require('jquery');


const loggerMiddleware = createLogger();
const Store = createStore(rootReducer,
  applyMiddleware(
      thunkMiddleware, // lets us dispatch() functions
      loggerMiddleware // neat middleware that logs actions
    ));


class App extends Component {
  constructor (props)
  {
    super(props);
    this.state = {
      signedIn : null
    }
  }

  render() {
    return (
      <Provider store={Store}>
        <Router history={browserHistory}>
            <Route path="/" component={LandingPage}/>
            <Route path="signin" component={SignInForm}/>
            <Route path="signout" component={SignOutLink}/>
            <Route path="signup" component={SignUpForm}/>
            <Route path="uploadproduct" component={UploadProduct}/>
        </Router>
      </Provider>
    );
  }
}

export default App;
