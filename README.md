# HN-REACT-APP

A basic Hacker News newsfeed implemented in React.

# Setup

1. Run `npm install` to install dependencies
2. To run in development run `npm run dev`

# Test

After running setup you can run the tests via `npm test`

# Notes

I've made some assumptions in the implementation and I've also left some things out
due to time constraints.

Known limitations:

- Inertia scrolling in Mac OS doesn't work too well with the IntersectionObserver and
  produces some jank when scrolling to the end of the list. In hindsight I think it
  would have been better to create the IntersectionObserver "anchor" higher up the page and load
  at least an additional page of results before pausing loading of stories to try keep
  ahead of the bottom of page. The only reason I didn't do this was due to time constraints.

- There is only cursory styling applied at the moment, it didn't appear to be an important
  part of this exercise. I've applied temporary styles in React mostly just to make the content
  readable.

- For the offline implementation, I realised later that I could have used IndexedDB to cache
  the stories and that would have made the caching implementation cleaner than it is. I didn't
  change it due to time constraints.
