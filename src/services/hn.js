export const fetchLatestStoryIds = async () => {
  const response = await window.fetch(
    "https://hacker-news.firebaseio.com/v0/newstories.json"
  );

  return await response.json();
};

export const fetchStoryById = async storyId => {
  const response = await window.fetch(
    `https://hacker-news.firebaseio.com/v0/item/${storyId}.json`
  );

  return await response.json();
};
