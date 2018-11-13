import axios from 'axios';
import {serverAddress} from '../config';
export const REQUEST_SIGNUP = 'REQUEST_SIGNUP';
export const RECEIVE_SIGNUP = 'RECEIVE_SIGNUP';
export const DID_SIGNIN = 'DID_SIGNIN';
export const WILL_SIGNIN = 'WILL_SIGNIN';
export const LOG_OUT = 'LOG_OUT';
export const POST_PHONE_NUMBER = 'POST_PHONE_NUMBER';
import { browserHistory } from 'react-router';
import { show_alert_message } from './AlertAction';
import {get_selling_product} from './productsAction';



export function requestSignup() {
  return {
    type: REQUEST_SIGNUP
  }
}


export function receiveSignup(email) {
  return {
    type: RECEIVE_SIGNUP,
    email
  }
}

export function post_phone_number(phoneNumber){
  return function (dispatch){
    axios.post('https://free-in-for-sale-messanger.herokuapp.com/api/message', {
      number : phoneNumber,
      token : sessionStorage.getItem('token')
    })
    .then(function(response){
      dispatch(get_selling_product());
      console.log(response);
    })
    .catch(function(error){
      console.log(error);
    })
  }
}

export function signup(email, password, callback) {
  return function (dispatch) {
    dispatch(requestSignup());
    axios.post(serverAddress+'api/v1/register_user', {
        email,
        password
      })
      .then(function (response) {
        console.log(response,"======>");
        sessionStorage.setItem('token', response['data']['data']['json']['auth_token']);
        console.log(sessionStorage.getItem('token'), "=====>");
        dispatch(receiveSignup(email));
        dispatch(show_alert_message('success', 'Congrats! You are sucessfully signed up.'))
        callback&&callback();
      })
      .catch(function (error, response) {
        dispatch(show_alert_message('error', error.response.data.errors[0]));
      });

  }
}

export function logOut(){
  return function (dispatch){
    dispatch(show_alert_message('success', 'Congrats! You are sucessfully logged out.'));
    dispatch({
      type:LOG_OUT
    });
  }
}

//SIGN_IN
export function signin(email, password, callback){
  return function (dispatch) {
    dispatch(will_signin());
    axios.post(serverAddress+'api/v1/auth_user', {
        email,
        password
      })
      .then(function (response) {
        console.log(response,"======>");
        sessionStorage.setItem('token', response['data']['data']['json']['auth_token']);
        console.log(sessionStorage.getItem('token'), "=====>");
        dispatch(did_signin(email));
        dispatch(show_alert_message('success', 'Congrats! You are sucessfully signed in.'))
        callback&&callback();
      })
      .catch(function (error) {
        dispatch(show_alert_message('error', error.response.data.errors));
      });

  }
}

export function will_signin(){
  return {
    type : WILL_SIGNIN
  }
}

export function did_signin(email){
  return {
    type : DID_SIGNIN,
    email
  }
}
