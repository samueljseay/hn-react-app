import React from "react";
import { render, screen } from "@testing-library/react";
import { Story } from "../../components/Story";

const detail = {
  time: 1586121401,
  title: "A Story",
  by: "a user",
  url: "https://google.com",
  id: 1
};

describe("Story", () => {
  test("Displays the details of a story", () => {
    render(<Story detail={detail} />);

    const title = screen.queryByText(detail.title);
    const author = screen.queryByText(`Author: ${detail.by}`);
    const link = screen.queryByRole("link");

    expect(title).not.toBeNull();
    expect(author).not.toBeNull();
    expect(link.getAttribute("href")).toEqual(detail.url);
  });

  test("Sets aria attributes to improve screen reader experience", () => {
    render(<Story detail={detail} />);

    const article = screen.queryByRole("article");
    const author = screen.queryByText(`Author: ${detail.by}`);
    // role querying does not support time at the moment.
    const time = screen.queryByTestId("story-time");

    expect(article.getAttribute("aria-label")).toEqual(`${detail.title}.`);

    // This expectation is a little too coupled to the component internals, but I'd rather
    // have it to cover against regressions.
    expect(time.getAttribute("aria-label")).toEqual(
      `Published on ${new Date(detail.time * 1000).toLocaleString("en-US")}`
    );

    // Adding pauses with period to elements makes voiceover read the article detail more naturally.
    expect(author.getAttribute("aria-label")).toEqual(`${author.textContent}.`);
  });
});
