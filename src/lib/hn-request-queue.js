import { fetchStoryById } from "../services/hn-service";
import { ADD_STORY, RETRIEVAL_ERROR } from "../state/reducer";

// To take load off the browser when fetching stories, this class utilises requestIdleCallback to load stories
// one by one in a more performant manner.
export class HNRequestQueue {
  constructor() {
    this.paused = false;
    this.hasRegisteredServiceWorker = false;
    this.itemsProcessed = 0;
    this.nextPause = null;
  }

  start(list, dispatch) {
    this.list = list.slice();
    this.dispatch = dispatch;
    this.handle = this.queueNextJob();
  }

  async processQueue() {
    const nextFetch = this.fetchNextStory();

    if (nextFetch) {
      try {
        const story = await this.fetchNextStory();

        this.dispatch({ type: ADD_STORY, val: story, id: story.id });
        this.itemsProcessed++;

        if (this.nextPause && this.itemsProcessed >= this.nextPause) {
          this.paused = true;
        } else {
          this.handle = this.queueNextJob();
        }
      } catch (error) {
        this.dispatch({ type: RETRIEVAL_ERROR, val: error });
      }
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
    // Rather than pause immediately we load a few extra items as overflow
    // for better scrolling, then pause.
    if (!this.paused) {
      this.nextPause = this.itemsProcessed + 5;
    }

    if (!this.hasRegisteredServiceWorker) {
      this.registerServiceWorker();
      this.hasRegisteredServiceWorker = true;
    }
  }

  unpause() {
    if (this.paused) {
      this.paused = false;
      this.nextPause = null;
      this.handle = this.queueNextJob();
    }
  }

  registerServiceWorker() {
    navigator.serviceWorker.register("sw.js");
  }
}
