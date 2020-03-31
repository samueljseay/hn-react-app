import React, { Fragment } from "react";
import { Story } from "./Story";

export const StoryList = ({ stories }) => {
  return (
    <Fragment>
      <h1>Hacker News Story List</h1>
      <div aria-role="feed">
        {stories.map(s => (
          <Story key={s.detail.id} detail={s.detail} />
        ))}
      </div>
    </Fragment>
  );
};
