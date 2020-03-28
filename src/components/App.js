import React, { useEffect, useReducer } from "react";
import { StoryList } from "./StoryList";
import { fetchLatestStoryIds, fetchStoryById } from "../services/hn";
import {
  storyReducer,
  ADD_STORY_IDS,
  initialState,
  ADD_STORY
} from "../state/reducer";

export const App = () => {
  const [state, dispatch] = useReducer(storyReducer, initialState);

  useEffect(() => {
    const fetchAndUpdate = async () => {
      const ids = await fetchLatestStoryIds();

      dispatch({ type: ADD_STORY_IDS, val: ids });

      for (let i = 0; i < ids.length; i++) {
        const s = await fetchStoryById(ids[i]);
        dispatch({ type: ADD_STORY, val: s });
      }
    };

    fetchAndUpdate();
  }, []);

  return <StoryList stories={state.stories.filter(s => s.detail !== null)} />;
};
