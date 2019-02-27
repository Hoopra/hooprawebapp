// import { withRouter } from 'react-router';
import { IAsyncActionDispatch } from '../../models/redux';
import { storeDispatch } from '../store';
import { ITimelineBlock } from './../../models/content';

export class TimelineActions
{
  public static updateTimelineBlocks = (blocks: ITimelineBlock[]) =>
  {
    console.log(blocks);
    const action: IAsyncActionDispatch = (dispatch: any) =>
    {
      setTimeout(() =>
      {
        dispatch({ payload: blocks, type: 'UPDATE_TIMELINE' });
      }, 0);
    };
    storeDispatch(action);
  }

  public static loginUser = (userData: any) =>
  {
    const action: IAsyncActionDispatch = (dispatch) =>
    {
      setTimeout(() =>
      {
        dispatch({ type: 'LOGIN_USER', payload: { accessToken: 'AFGHJFLD' } });
        dispatch({ type: 'UPDATE_USER_DATA', payload: { name: 'Thomas', email: 'hoopra12@gmail.com' } });
      }, 3000);
    };
    storeDispatch(action);
  }

  public static applyExistingToken = (accessToken: string) =>
  {
    // verify token
    if (!accessToken || accessToken.length < 5) { return; }

    storeDispatch({ type: 'LOGIN_USER', payload: { accessToken: 'AFGHJFLD' } });
    storeDispatch({ type: 'UPDATE_USER_DATA', payload: { name: 'Thomas', email: 'hoopra12@gmail.com' } });
  }

  public static logoutUser = () => { storeDispatch({ type: 'LOGOUT_USER' }); };
}

// export const registerUser = (userData: any) =>
// {
//   const action: IAsyncActionDispatch = (dispatch) =>
//   {
//     setTimeout(() =>
//     {
//       dispatch({ payload: userData, type: 'REGISTER_USER' });
//     }, 3000);
//   };
//   storeDispatch(action);
// };

// export const loginUser = (userData: any) =>
// {
//   const action: IAsyncActionDispatch = (dispatch) =>
//   {
//     setTimeout(() =>
//     {
//       dispatch({ type: 'LOGIN_USER', payload: { accessToken: 'AFGHJFLD' } });
//       dispatch({ type: 'UPDATE_USER_DATA', payload: { name: 'Thomas', email: 'hoopra12@gmail.com' } });
//     }, 3000);
//   };
//   storeDispatch(action);
// };

// export const applyExistingToken = (accessToken: string) =>
// {
//   // verify token
//   if (accessToken.length < 5) { return; }

//   storeDispatch({ type: 'LOGIN_USER', payload: { accessToken: 'AFGHJFLD' } });
//   storeDispatch({ type: 'UPDATE_USER_DATA', payload: { name: 'Thomas', email: 'hoopra12@gmail.com' } });
// };

// export const logoutUser = () => { storeDispatch({ type: 'LOGOUT_USER' }); };
