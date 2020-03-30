import React, { Fragment } from "react";

export const Story = ({ detail }) => {
  return (
    <Fragment>
      <a href={detail.url}>
        <h2>{detail.title}</h2>
      </a>
    </Fragment>
  );
};
