import { IAction } from '../../models/redux';
import { WindowStorage } from '../../utilities/window';

const initialState = {
  isAuthenticated: false,
  accessToken: null,
};

const authenticationReducer = (state = initialState, action: IAction) =>
{
  switch (action.type)
  {
    case 'REGISTER_USER': { return state; }
    case 'LOGIN_USER': {
      const newState = { ...state, ...action.payload, isAuthenticated: true };
      if (newState.accessToken)
      {
        WindowStorage.save('access_token', newState.accessToken);
      }
      return newState;
    }
    case 'LOGOUT_USER': {
      WindowStorage.delete('access_token');
      return { ...state, isAuthenticated: false, accessToken: null };
    }
    case 'UPDATE_USER_DATA': {
      const isAuthenticated = (action.payload !== null);
      return { ...state, isAuthenticated };
    }
    default: { return state; }
  }
};

export default authenticationReducer;
