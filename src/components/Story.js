import React from "react";

export const Story = ({ detail }) => {
  const postedDate = new Date(detail.time * 1000);
  const formattedDate = postedDate.toLocaleString("en-US");

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
        data-testid={"story-time"}
        aria-label={`Published on ${formattedDate}`}
        dateTime={postedDate.toISOString()}
      >
        Date: {formattedDate}
      </time>
    </article>
  );
};
