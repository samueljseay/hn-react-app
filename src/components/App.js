import React, { useEffect, useRef, Fragment } from "react";
import { StoryList } from "./StoryList";
import { storyReducer, initialState, createReducer } from "../state/reducer";
import {
  fetchStoryIds,
  pauseQueue,
  unpauseQueue
} from "../thunks/fetchStoryIds";

export const App = () => {
  const [state, dispatch] = createReducer(storyReducer, initialState);
  const anchorRef = useRef(null);

  useEffect(() => {
    dispatch(fetchStoryIds());
  }, []);

  useEffect(() => {
    const startLoadingOpts = {
      root: null,
      rootMargin: "0px",
      threshold: [0, 1]
    };

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          dispatch(pauseQueue());
        } else {
          dispatch(unpauseQueue());
        }
      });
    }, startLoadingOpts);

    if (anchorRef.current) {
      observer.observe(anchorRef.current);
    }

    return () => {
      observer.unobserve(anchorRef.current);
    };
  }, []);

  return (
    <Fragment>
      <StoryList stories={state.stories} />
      <div
        ref={anchorRef}
        id="bottom-anchor"
        style={{ height: "150px", width: "100%", paddingBottom: "20px" }}
      />
    </Fragment>
  );
};
