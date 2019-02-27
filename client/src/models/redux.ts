// interface IObjectLiteral { [key: string]: any; }
export interface IAction
{
  type: ActionType;
  // payload?: IObjectLiteral | null | any[];
  payload?: any;
}
export type IAsyncActionDispatch = (dispatch: (action: IAction) => (void)) => (void);
export type IStoreDispatch = (IAction | IAsyncActionDispatch);
// export type IActionDispatch = (...args: any[]) => (void);

type AuthActionType = 'REGISTER_USER' | 'LOGIN_USER' | 'LOGOUT_USER';

type UserActionType = 'UPDATE_USER_DATA';

type ErrorActionType = 'AUTHENTICATION_ERROR';

type TimelineActionType = 'UPDATE_TIMELINE' | 'UPDATE_SKILLS';

type ActionType = AuthActionType | UserActionType | ErrorActionType | TimelineActionType;
