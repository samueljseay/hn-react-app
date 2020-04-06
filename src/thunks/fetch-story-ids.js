import { fetchLatestStoryIds } from "../services/hn-service";
import { ADD_STORY_IDS, RETRIEVAL_ERROR } from "../state/reducer";
import { HNRequestQueue } from "../lib/hn-request-queue";

export const queue = new HNRequestQueue();

export const fetchStoryIds = () => {
  return async dispatch => {
    try {
      const ids = await fetchLatestStoryIds();
      dispatch({ type: ADD_STORY_IDS, val: ids });

      queue.start(ids, dispatch);
    } catch (error) {
      dispatch({ type: RETRIEVAL_ERROR, val: error.message });
    }
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
