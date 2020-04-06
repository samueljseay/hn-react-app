import React from "react";
import { render, screen } from "@testing-library/react";
import { StoryList } from "../../components/StoryList";

const stories = [1, 2, 3, 4].map(n => ({
  detail: {
    time: 1586121401,
    title: "A Story",
    by: "a user",
    url: "https://google.com",
    id: n
  }
}));

describe("StoryList", () => {
  it("Displays a heading", () => {
    render(<StoryList stories={[]} error={null} />);

    expect(screen.queryByText("Hacker News Story List")).not.toBeNull();
  });

  it("displays a list of stories", () => {
    render(<StoryList stories={stories} error={null} />);

    const storyElements = screen.queryAllByRole("article");

    expect(storyElements.length).toEqual(stories.length);
  });

  it("displays an error message if one is present", () => {
    const errorMessage = "Could not load stories.";

    render(<StoryList stories={[]} error={errorMessage} />);

    expect(screen.queryByText(errorMessage)).not.toBeNull();
  });
});
