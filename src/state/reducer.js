export const ADD_STORY = "ADD_STORY";
export const ADD_STORY_IDS = "ADD_STORY_IDS";

export const storyReducer = (state, action) => {
  switch (action.type) {
    case "ADD_STORY_IDS":
      return {
        ...state,
        stories: action.val.map(id => ({
          id,
          detail: null
        }))
      };
    case "ADD_STORY":
      return {
        ...state,
        stories: state.stories.map(s => {
          if (s.id === action.val.id) {
            return {
              id: s.id,
              detail: action.val
            };
          } else {
            return s;
          }
        })
      };
    default:
      return state;
  }
};

export const initialState = {
  storyIds: [],
  stories: []
};
