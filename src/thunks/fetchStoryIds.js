import { fetchLatestStoryIds } from "../services/hn";
import { ADD_STORY_IDS } from "../state/reducer";
import { HNRequestQueue } from "../lib/HNRequestQueue";

const queue = new HNRequestQueue();

export const fetchStoryIds = () => {
  return async dispatch => {
    const ids = await fetchLatestStoryIds();
    dispatch({ type: ADD_STORY_IDS, val: ids });

    queue.start(ids, dispatch);
  };
};

export const pauseQueue = () => {
  return () => {
    queue.pause();
  };
};

export const unpauseQueue = () => {
  return () => {
    queue.unpause();
  };
};
