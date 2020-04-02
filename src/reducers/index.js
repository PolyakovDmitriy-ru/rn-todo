import {combineReducers} from 'redux';
import auth from './auth';
import services from './services';
import dashboard from './dashboard';

export default combineReducers({
  auth,
  services,
  dashboard,
});
