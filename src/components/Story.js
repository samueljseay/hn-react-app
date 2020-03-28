import React, { Fragment } from "react";

export const Story = ({ url, title }) => {
  return (
    <Fragment>
      <a href={url}>
        <h2>{title}</h2>
      </a>
    </Fragment>
  );
};
