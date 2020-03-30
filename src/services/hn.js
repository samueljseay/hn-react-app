export const fetchLatestStoryIds = async () => {
  const response = await window.fetch(
    "https://hacker-news.firebaseio.com/v0/newstories.json"
  );

  // TODO check a localstorage cache here

  return await response.json();
};

export const fetchStoryById = async storyId => {
  const response = await window.fetch(
    `https://hacker-news.firebaseio.com/v0/item/${storyId}.json`
  );

  // TODO check a local storage cache here

  return await response.json();
};
