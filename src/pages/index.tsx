import cookie from "cookie";
import React, { useState, useEffect } from "react";
import { NextPage, NextPageContext } from "next";
import Viewer from "../components/Viewer";
import { COOKIE_KEY_SUBREDDITS, COOKIE_KEY_SORTING } from "../config";
import { Nullable, Post, Thread, Subreddit, Settings } from "../types";
import { fetchSubredditPosts, fetchPostThread } from "../libs/api";
import { formatPosts, formatComments } from "../libs/formatter";

export interface HomePageProps {
  savedSubreddits: Subreddit[];
  subreddit: Subreddit;
  posts: Post[];
  expandedPost: Nullable<Thread>;
  settings: Settings;
  error: Nullable<any>;
}

const HomePage: NextPage<HomePageProps> = ({ error, ...props }) => {
  // assume that reddit is blocked
  // and disable client-side routing
  // which means everything is server-rendered
  const [isRedditBlocked, setIsRedditBlocked] = useState<boolean>(true);

  useEffect(() => {
    let image = new Image();
    image.src = "https://reddit.com/favicon.ico";
    image.onload = () => {
      // user can access reddit from client-side
      setIsRedditBlocked(false);
    };
  }, []);

  error && console.log(error);
  return <Viewer {...props} isRedditBlocked={isRedditBlocked} />;
};

interface HomePageContext extends NextPageContext {
  query: {
    subreddit: Subreddit;
    postId: string;
  };
}

HomePage.getInitialProps = async ({
  req,
  query
}: HomePageContext): Promise<HomePageProps> => {
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
};

export default HomePage;
