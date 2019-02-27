// import { WindowStorage } from './../windowStorage';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import thunk from 'redux-thunk';
// import { AuthActions } from './actions/authActions';
import { IStoreDispatch } from '../models/redux';
import rootReducer from './reducers';

const composeEnhancers = composeWithDevTools({ /* options like actionSanitizer, stateSanitizer */ });

const initialState = {

};
const middleware = [thunk];
const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(
    applyMiddleware(...middleware),
  ),
);

export default store;

export function storeDispatch(action: IStoreDispatch) { store.dispatch<any>(action); }
