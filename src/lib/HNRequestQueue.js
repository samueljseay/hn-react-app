import { fetchStoryById } from "../services/hn";
import { ADD_STORY } from "../state/reducer";

// To take load off the browser when fetching stories, this class utilises requestIdleCallback to load stories
// one by one in a more performant manner.
export class HNRequestQueue {
  constructor() {
    this.started = false;
    this.paused = false;
    this.itemsProcessed = 0;
  }

  start(list, dispatch) {
    this.list = list.slice();
    this.dispatch = dispatch;
    this.handle = this.queueNextJob();
    this.started = true;
  }

  processQueue() {
    const nextFetch = this.fetchNextStory();

    if (nextFetch) {
      nextFetch.then(story => {
        this.itemsProcessed++;
        this.dispatch({ type: ADD_STORY, val: story, id: story.id });
        this.handle = this.queueNextJob();
      });
    }
  }

  queueNextJob() {
    return window.requestIdleCallback(
      () => {
        this.processQueue();
      },
      {
        // Set a lower timeout for the first few items to ensure that data reaches
        // the page as quick as possible. After that a timeout of 200ms is a good
        // compromise for loading items as the page is scrolled.
        timeout: this.itemsProcessed > 15 ? 200 : 0
      }
    );
  }

  fetchNextStory() {
    const nextId = this.list.shift();

    if (nextId) {
      return fetchStoryById(nextId);
    }
  }

  pause() {
    if (!this.paused && this.handle) {
      this.paused = true;
      window.cancelIdleCallback(this.handle);
    }
  }

  unpause() {
    if (this.paused) {
      this.paused = false;
      this.handle = this.queueNextJob();
    }
  }
}
