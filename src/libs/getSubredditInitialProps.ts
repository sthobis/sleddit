import { NextPageContext } from "next";
import cookie from "cookie";
import { COOKIE_KEY_SUBREDDITS, COOKIE_KEY_SORTING } from "../config";
import { Nullable, Thread, Subreddit, Settings, PageProps } from "../types";
import { fetchSubredditPosts, fetchPostThread } from "../libs/api";
import { formatPosts, formatComments } from "../libs/formatter";

type PageContext = NextPageContext & {
  query: {
    subreddit: Subreddit;
    postId: string;
  };
};

async function getSubredditInitialProps({
  req,
  query
}: PageContext): Promise<PageProps> {
  const { subreddit = "all", postId } = query;

  const cookies = req
    ? cookie.parse(req.headers.cookie || "")
    : cookie.parse(window.document.cookie);

  const savedSubreddits = cookies[COOKIE_KEY_SUBREDDITS]
    ? cookies[COOKIE_KEY_SUBREDDITS].split(",")
    : ["all", "gifs", "pics", "videos"];

  const sorting: Settings["sorting"] = cookies[COOKIE_KEY_SORTING] || "hot";
  const settings = {
    sorting
  };

  if (savedSubreddits.findIndex(el => el === subreddit) < 0) {
    savedSubreddits.push(subreddit);
  }
  savedSubreddits.sort();

  try {
    const [subredditJson, postJson] = await Promise.all([
      fetchSubredditPosts(subreddit, sorting),
      postId && fetchPostThread(subreddit, postId)
    ]);

    const posts = formatPosts(
      subredditJson.data.data.children.map(item => item.data)
    );
    let expandedPost: Nullable<Thread> = null;
    if (postId) {
      const postData = postJson.data[0].data.children.map(item => item.data);
      const commentsData = postJson.data[1].data.children
        .filter(item => item.kind !== "more")
        .map(item => item.data);
      expandedPost = {
        post: formatPosts(postData)[0],
        comments: formatComments(commentsData)
      };
    }

    return {
      savedSubreddits,
      subreddit,
      posts,
      expandedPost,
      settings,
      error: null
    };
  } catch (err) {
    console.error(err);
    return {
      savedSubreddits,
      subreddit,
      posts: [],
      expandedPost: null,
      settings,
      error: err.message || err
    };
  }
}

export default getSubredditInitialProps;
