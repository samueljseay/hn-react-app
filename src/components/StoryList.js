import React, { Fragment } from "react";
import { Story } from "./Story";
import { Error } from "./Error";

export const StoryList = ({ stories, error }) => {
  return (
    <Fragment>
      <h1>Hacker News Story List</h1>
      {error && <Error message={error} />}
      <div>
        {stories.map(s => (
          <Story key={s.detail.id} detail={s.detail} />
        ))}
      </div>
    </Fragment>
  );
};
