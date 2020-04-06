import { fetchLatestStoryIds, fetchStoryById } from "../../services/hn-service";

const mockRequest = (response, isOk) => {
  return () =>
    Promise.resolve({
      ok: isOk,
      json: () => Promise.resolve(response)
    });
};

describe("fetchLatestStoryIds", () => {
  it("Throws an error if the response is not ok", async () => {
    window.fetch = jest.fn().mockImplementationOnce(mockRequest(null, false));

    expect(fetchLatestStoryIds()).rejects.toEqual(
      new Error("Could not fetch latest stories.")
    );
  });

  it("Goes to the cache to fetch story ids if the user is offline", async () => {
    const storyIds = [1, 2, 3, 4];

    window.localStorage.getItem.mockImplementation(() => {
      return JSON.stringify(storyIds);
    });

    jest.spyOn(navigator, "onLine", "get").mockImplementationOnce(() => false);

    const cachedIds = await fetchLatestStoryIds();

    expect(cachedIds).toEqual(storyIds);
  });

  it("Throws an error if it cannot retrieve story ids from cache", () => {
    jest.spyOn(navigator, "onLine", "get").mockImplementationOnce(() => false);

    window.localStorage.getItem.mockImplementation(() => {
      return null;
    });

    expect(fetchLatestStoryIds()).rejects.toEqual(
      new Error("Network is offline and there are no cached stories, sorry!")
    );
  });

  it("Stores story ids in the cache", async () => {
    const storyList = [1, 2, 3, 4];
    window.fetch = jest
      .fn()
      .mockImplementationOnce(mockRequest(storyList, true));

    await fetchLatestStoryIds();

    expect(localStorage.setItem).toHaveBeenCalledWith(
      "storyList",
      JSON.stringify(storyList)
    );
  });
});

describe("fetchStoryById", () => {
  it("Throws an error if the response is not ok", () => {
    window.fetch = jest.fn().mockImplementationOnce(mockRequest(null, false));

    expect(fetchStoryById(1)).rejects.toEqual(
      new Error("Could not fetch story.")
    );
  });

  it("Goes to the cache to fetch stories if the user is offline", async () => {
    const story = {
      time: 1586121401,
      title: "A Story",
      by: "a user",
      url: "https://google.com",
      id: 1
    };

    window.localStorage.getItem.mockImplementation(() => {
      return JSON.stringify(story);
    });

    jest.spyOn(navigator, "onLine", "get").mockImplementationOnce(() => false);

    const cachedStory = await fetchLatestStoryIds();

    expect(cachedStory).toEqual(story);
  });

  it("Throws an error if it cannot retrieve a story from the cache", () => {
    window.localStorage.getItem.mockImplementation(() => {
      return null;
    });

    jest.spyOn(navigator, "onLine", "get").mockImplementationOnce(() => false);

    expect(fetchStoryById(1)).rejects.toEqual(
      new Error("Network is offline and this story is not cached, sorry!")
    );
  });

  it("Stores stories in the cache", async () => {
    const story = {
      time: 1586121401,
      title: "A Story",
      by: "a user",
      url: "https://google.com",
      id: 1
    };

    window.fetch = jest.fn().mockImplementationOnce(mockRequest(story, true));
    window.requestIdleCallback = jest.fn().mockImplementation(fn => {
      fn();
    });

    await fetchStoryById(1);

    expect(localStorage.setItem).toHaveBeenCalledWith(
      `story.${story.id}`,
      JSON.stringify(story)
    );
  });
});
