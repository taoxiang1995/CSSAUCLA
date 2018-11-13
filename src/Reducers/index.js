import { combineReducers } from 'redux';

import Users from './User';
import Products from './Products';
import Alert from './Alert';

var rootUsers = combineReducers({Products, Users, Alert});

export default rootUsers;
