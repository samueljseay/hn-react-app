import React, { useEffect, useRef, Fragment } from "react";
import { StoryList } from "./StoryList";
import { storyReducer, createReducer } from "../state/reducer";
import {
  fetchStoryIds,
  pauseQueue,
  unpauseQueue
} from "../thunks/fetch-story-ids";

export const App = () => {
  const [state, dispatch] = createReducer(storyReducer);
  const anchorRef = useRef(null);

  useEffect(() => {
    dispatch(fetchStoryIds());
  }, []);

  useEffect(createIntersectionObserver(dispatch, anchorRef), [anchorRef]);

  return (
    <Fragment>
      <StoryList error={state.error} stories={state.stories} />
      <div
        ref={anchorRef}
        data-testid="bottom-anchor"
        style={{ height: "100px", width: "100%" }}
      />
    </Fragment>
  );
};

export const createIntersectionObserver = (dispatch, anchorRef) => {
  return () => {
    const startLoadingOpts = {
      root: null,
      rootMargin: "0px",
      threshold: 0
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
  };
};
