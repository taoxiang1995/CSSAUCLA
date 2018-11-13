//react/components/auth/SignUpForm.js
var React          = require('react');
var _              = require('lodash');
var Functions      = require('../../util/Functions.js');
var $              = require('jquery');


import { browserHistory } from 'react-router';
import {signup} from '../../Actions/UserAction';
import { connect } from 'react-redux';
import Modal from '../Modal';
import '../../css/Auth/signupForm.css';


var SignUpForm =
  React.createClass({
    _handleInputChange: function(ev) {
      // Get a deep clone of the component's state before the input change.
      var nextState = _.cloneDeep(this.state);

      //Update the state of the component
      nextState[ev.target.name] = ev.target.value;


      this.setState(nextState);
    },
    getInitialState: function() {
      return {
        email: '',
        password: '',
        password_confirmation: '',
        name: ''
      };
    },

    _handleRegistrationClick: function(e) {
      e.preventDefault();
      const { dispatch } = this.props;
      dispatch (signup(this.state.email, this.state.password, this.props.onSucessSignUp));
    },

    render:function(){
      return (
        <Modal onModalClose={this.props.onModalClose}  showModal={this.props.showModal}  className="signupForm-Modal">
          <form className="signupForm-formContainer">

              <input type='name'
                name='name'
                placeholder='name'
                />

              <input type='email'
                name='email'
                placeholder='email'
                value={this.state.email}
                onChange={this._handleInputChange}/>

              <input type='password'
                name='password'
                placeholder='password'
                value={this.state.password}
                onChange={this._handleInputChange} />

              <button className="signupForm-formContainer-signupButton" onClick={this._handleRegistrationClick}>
                Sign Up
              </button>
          </form>
        </Modal>
      )
    }
  });




export default connect(null, null)(SignUpForm);
