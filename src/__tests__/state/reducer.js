import {
  initialState,
  storyReducer,
  ADD_STORY_IDS,
  ADD_STORY,
  RETRIEVAL_ERROR,
  createReducer
} from "../../state/reducer";

import * as middleware from "../../middleware/thunk";
import { render } from "@testing-library/react";
import React, { useEffect } from "react";

describe("storyReducer", () => {
  it("Replaces the current story ids on ADD_STORY_IDS action", () => {
    const storyIds = [1, 2, 3, 4];

    const newState = storyReducer(initialState, {
      type: ADD_STORY_IDS,
      val: storyIds
    });

    expect(newState.storyIds).toEqual(storyIds);
  });

  it("Adds a single story to state on ADD_STORY action", () => {
    const story = {
      time: 1586121401,
      title: "A Story",
      by: "a user",
      url: "https://google.com",
      id: 1
    };

    const newState = storyReducer(initialState, {
      type: ADD_STORY,
      val: story
    });

    expect(newState.stories.length).toEqual(1);
    expect(newState.stories[0].detail).toEqual(story);
  });

  it("Adds an error message on RETRIEVAL_ERROR action", () => {
    const errorMessage = "Something went wrong";

    const newState = storyReducer(initialState, {
      type: RETRIEVAL_ERROR,
      val: errorMessage
    });

    expect(newState.error).toEqual(errorMessage);
  });
});

describe("createReducer", () => {
  it("Applies the thunk middleware to the reducer", () => {
    const mock = jest.fn();
    jest.spyOn(middleware, "thunkMiddleware").mockImplementation(() => mock);

    const Dummy = () => {
      const [_, dispatch] = createReducer(storyReducer);

      useEffect(() => {
        dispatch({ type: "NOTHING" });
        dispatch({ type: "NOTHING" });
      });

      return <div></div>;
    };

    render(<Dummy />);

    expect(mock).toHaveBeenCalledTimes(2);
  });
});
