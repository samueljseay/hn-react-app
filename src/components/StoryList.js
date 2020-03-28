import React, { Fragment } from "react";
import { Story } from "./Story";

export const StoryList = ({ stories }) => {
  return (
    <Fragment>
      <h1>Hacker News Story List</h1>
      {stories.map(s => (
        <Story key={s.id} title={s.detail.title} url={s.detail.url} />
      ))}
    </Fragment>
  );
};
