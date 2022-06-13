import {useMemo} from "react";

export const useSortedPosts = (posts, selectedSort) => {
  return useMemo(() => {
    if (selectedSort) {
      return [...posts].sort((a, b) =>
        a[selectedSort].localeCompare(b[selectedSort]))
    } else {
      return posts
    }
  }, [selectedSort, posts])
}

export const usePosts = (posts, selectedSort, searchQuery) => {
  const sortedPosts = useSortedPosts(posts, selectedSort)

  return useMemo(() => {
    return sortedPosts.filter(post =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()))
  }, [searchQuery, sortedPosts])
}