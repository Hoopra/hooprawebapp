import { combineReducers } from 'redux';
import authenticationReducer from './auth';
import contentReducer from './content';
import errorReducer from './error';
import userReducer from './user';

const rootReducer = combineReducers({
  auth: authenticationReducer,
  error: errorReducer,
  user: userReducer,
  content: contentReducer,
});

export default rootReducer;
