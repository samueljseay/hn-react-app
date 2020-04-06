import {
  fetchStoryIds,
  queue,
  pauseQueue,
  unpauseQueue
} from "../../thunks/fetch-story-ids";

const mockStoryIdsResponse = [1, 2, 3];
const mockStoryIdJson = Promise.resolve(mockStoryIdsResponse);

jest.mock("../../lib/hn-request-queue");

const mockFetchStoryIdsSuccess = Promise.resolve({
  ok: true,
  json: () => mockStoryIdJson
});

const mockFetchStoryIdsFail = Promise.resolve({
  ok: false,
  json: () => null
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("fetchStoryIds", () => {
  it("Dispatches a ADD_STORY_IDS action after fetch", async () => {
    const mockDispatch = jest.fn();
    window.fetch = jest
      .fn()
      .mockImplementationOnce(() => mockFetchStoryIdsSuccess);

    await fetchStoryIds()(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "ADD_STORY_IDS",
      val: mockStoryIdsResponse
    });
  });

  it("Dispatches a retrieval error if it cannot fetch story ids", async () => {
    const mockDispatch = jest.fn();
    window.fetch = jest
      .fn()
      .mockImplementationOnce(() => mockFetchStoryIdsFail);

    await fetchStoryIds()(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "RETRIEVAL_ERROR",
      val: "Could not fetch latest stories."
    });
  });

  it("Starts the story fetch queue after getting story ids", async () => {
    const mockDispatch = jest.fn();
    window.fetch = jest
      .fn()
      .mockImplementationOnce(() => mockFetchStoryIdsSuccess);

    await fetchStoryIds()(mockDispatch);

    expect(queue.start).toHaveBeenCalledTimes(1);
  });
});

describe("pauseQueue", () => {
  it("Initiates a pause of the request queue", () => {
    pauseQueue()();

    expect(queue.pause).toHaveBeenCalledTimes(1);
  });
});

describe("unpauseQueue", () => {
  it("It initiates an unpause of the request queue", () => {
    unpauseQueue()();

    expect(queue.unpause).toHaveBeenCalledTimes(1);
  });
});
