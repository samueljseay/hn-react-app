import { useReducer } from "react";
import { thunkMiddleware } from "../middleware/thunk";

export const ADD_STORY = "ADD_STORY";
export const ADD_STORY_IDS = "ADD_STORY_IDS";

export const storyReducer = (state, action) => {
  switch (action.type) {
    case ADD_STORY_IDS:
      return {
        ...state,
        storyIds: action.val
      };
    case ADD_STORY:
      if (action.val.url) {
        return {
          ...state,
          stories: [...state.stories, { detail: action.val }]
        };
      } else {
        return state;
      }
    default:
      return state;
  }
};

export const initialState = {
  storyIds: [],
  stories: [],
  pauseLoading: false
};

export const createReducer = (reducer, initialState) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // apply thunk middleware
  return [state, thunkMiddleware(dispatch, state)];
};
