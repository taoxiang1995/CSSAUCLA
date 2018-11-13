import { REQUEST_SIGNUP, RECEIVE_SIGNUP, LOG_OUT, DID_SIGNIN, WILL_SIGNIN} from '../Actions/UserAction';
import { browserHistory } from 'react-router';

export default function Users (state = {is_signed_in : sessionStorage.getItem('token')}, action){
  switch (action.type) {
    case REQUEST_SIGNUP:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })

    case RECEIVE_SIGNUP:
      sessionStorage.setItem('email', action.email);
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        is_signed_in : true
      })

    case LOG_OUT:
      sessionStorage.setItem('token', '')
      return Object.assign({}, state, {
        is_signed_in : sessionStorage.getItem('token')
      })

    case WILL_SIGNIN:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })

    case DID_SIGNIN:
      sessionStorage.setItem('email', action.email);
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        is_signed_in : true
      })

    default:
      return state;
  }
}
