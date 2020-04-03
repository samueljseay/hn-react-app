export const fetchLatestStoryIds = async () => {
  if (isOnline()) {
    const response = await window.fetch(
      "https://hacker-news.firebaseio.com/v0/newstories.json"
    );

    if (!response.ok) {
      throw new Error("Could not fetch latest stories.");
    } else {
      const storyList = await response.json();

      // Always overwrite the story list with the latest retrieved one
      saveStoryListInCache(storyList);

      return storyList;
    }
  } else {
    const cachedList = getStoryListFromCache();

    if (!cachedList) {
      throw "Network is offline and there are no cached stories, sorry!";
    } else {
      return cachedList;
    }
  }
};

export const fetchStoryById = async storyId => {
  if (isOnline()) {
    const response = await window.fetch(
      `https://hacker-news.firebaseio.com/v0/item/${storyId}.json`
    );

    if (!response.ok) {
      throw new Error("Could not fetch story.");
    } else {
      const story = await response.json();

      // Always overwrite the story with the latest retrieved one
      saveStoryInCache(story);

      return story;
    }
  } else {
    const cachedStory = getStoryFromCache(storyId);

    if (!cachedStory) {
      throw new Error(
        "Network is offline and this story is not cached, sorry!"
      );
    } else {
      return cachedStory;
    }
  }
};

const getStoryListFromCache = () => {
  const storyList = localStorage.getItem("storyList");
  return storyList && JSON.parse(storyList);
};

const saveStoryListInCache = storyList => {
  localStorage.setItem("storyList", JSON.stringify(storyList));
};

const saveStoryInCache = story => {
  localStorage.setItem(`story.${story.id}`, JSON.stringify(story));
};

const getStoryFromCache = storyId => {
  const story = localStorage.getItem(`story.${storyId}`);
  return story && JSON.parse(story);
};

const isOnline = () => {
  return navigator.onLine;
};
