import { IAction } from '../../models/redux';

const initialState = {
  name: '',
  email: '',
};

const userReducer = (state = initialState, action: IAction) =>
{
  switch (action.type)
  {
    case 'UPDATE_USER_DATA': {
      return (action.payload) ? (action.payload) : ({});
    }
    case 'LOGOUT_USER': {
      return ({});
    }
    default: { return state; }
  }
};

export default userReducer;
