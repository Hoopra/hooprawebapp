import { IAction } from '../../models/redux';

const initialState = {

};

const errorReducer = (state = initialState, action: IAction) =>
{
  switch (action.type)
  {
    default: { return state; }
  }
};

export default errorReducer;
