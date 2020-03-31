import React from "react";

export const Story = ({ detail }) => {
  const postedDate = new Date(detail.time * 1000);

  return (
    <article
      aria-label={`${detail.title}.`}
      tabIndex={0}
      style={{ marginBottom: "30px" }}
    >
      <a style={{ display: "block" }} href={detail.url}>
        <h2 style={{ marginBottom: 0, marginTop: "5px" }}>{detail.title}</h2>
      </a>
      <p aria-label={`Author: ${detail.by}.`} style={{ marginBottom: "5px" }}>
        Author: {detail.by}
      </p>
      <time
        aria-label={`Published on ${postedDate.toLocaleString("en-US")}`}
        dateTime={postedDate.toISOString()}
      >
        Date: {postedDate.toLocaleString("en-US")}
      </time>
    </article>
  );
};
