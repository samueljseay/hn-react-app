import React, { Fragment } from "react";
import { Story } from "./Story";

export const StoryList = ({ stories }) => {
  return (
    <Fragment>
      <div>
        {stories.map(s => (
          <Story key={s.detail.id} detail={s.detail} />
        ))}
      </div>
    </Fragment>
  );
};
