import { IAction } from '../../models/redux';
// import { ITimelineBlock } from './../../models/timeline';
import { about, skills, timelineBlocks } from './defaults/content';
// import { timelineBlocks } from './blocks';

const initialState = {
  timelineBlocks, skills, about,
};

const contentReducer = (state = initialState, action: IAction) =>
{
  switch (action.type)
  {
    case 'UPDATE_TIMELINE': {
      const data = (action.payload) ? (action.payload) : ({});
      return { ...state, timelineBlocks: data };
    }
    case 'UPDATE_SKILLS': {
      const data = (action.payload) ? (action.payload) : ({});
      return { ...state, timelineBlocks: data };
    }
    default: { return state; }
  }
};

export default contentReducer;
