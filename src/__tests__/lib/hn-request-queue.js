import { HNRequestQueue } from "../../lib/hn-request-queue";

window.requestIdleCallback = jest.fn().mockImplementation(fn => fn());
window.navigator.serviceWorker = { register: jest.fn() };

const flushPromises = () => new Promise(setImmediate);

jest.mock("../../services/hn-service", () => ({
  fetchLatestStoryIds: jest.fn(),
  fetchStoryById: () => ({
    time: 1586121401,
    title: "A Story",
    by: "a user",
    url: "https://google.com",
    id: 1
  })
}));

describe("HNRequestQueue", () => {
  it("Processes a queue right to the end if it is not paused.", async () => {
    const mockDispatch = jest.fn();
    const queue = new HNRequestQueue();

    queue.start([1, 2, 3, 4], mockDispatch);

    await flushPromises();

    expect(queue.itemsProcessed).toEqual(4);
    expect(mockDispatch).toHaveBeenCalledTimes(4);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "ADD_STORY",
      id: 1,
      val: {
        time: 1586121401,
        title: "A Story",
        by: "a user",
        url: "https://google.com",
        id: 1
      }
    });
  });

  it("Processes a queue up to 5 items past the place where it was paused", async () => {
    const mockDispatch = jest.fn();
    const queue = new HNRequestQueue();

    queue.start([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], mockDispatch);

    const currentItem = queue.itemsProcessed;
    queue.pause();

    await flushPromises();

    expect(queue.itemsProcessed).toEqual(currentItem + 5);
    expect(mockDispatch).toHaveBeenCalledTimes(currentItem + 5);
  });

  it("Sets a 0 timeout on requestIdleCallback if less than 15 items have been processed", async () => {
    const mockDispatch = jest.fn();
    const queue = new HNRequestQueue();

    queue.start([1, 2, 3, 4], mockDispatch);

    await flushPromises();

    expect(window.requestIdleCallback).toHaveBeenLastCalledWith(
      expect.any(Function),
      {
        timeout: 0
      }
    );
  });

  it("Sets a higher timeout on requestIdleCallback after 15 items have been processed", async () => {
    const mockDispatch = jest.fn();
    const queue = new HNRequestQueue();
    queue.itemsProcessed = 15;

    queue.start(
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
      mockDispatch
    );

    await flushPromises();

    expect(window.requestIdleCallback).toHaveBeenLastCalledWith(
      expect.any(Function),
      {
        timeout: 200
      }
    );
  });
});
