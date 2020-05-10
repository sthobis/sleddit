import axios from "axios";
import { Nullable, Settings } from "../types";

export type RedditResponse<T> = {
  kind: "Listing";
  data: {
    modhash: string;
    dist: number;
    children: {
      kind: string;
      data: T;
    }[];
    after: string;
    before: Nullable<string>;
  };
};

export type PostResponse = {
  id: string;
  author: string;
  num_comments: number;
  created_utc: number;
  score: number;
  selftext_html: string;
  stickied: boolean;
  title: string;
  url: string;
  domain: string;
  over_18: boolean;
};

export type CommentResponse = {
  id: string;
  author: string;
  body_html: string;
  created_utc: number;
  score: number;
};

export const fetchSubredditPosts = (
  subreddit: string,
  sorting: Settings["sorting"]
) =>
  axios.get<RedditResponse<PostResponse>>(
    `https://www.reddit.com/r/${subreddit}/${sorting}.json?limit=20`
  );

export const fetchPostThread = (subreddit: string, postId: string) =>
  axios.get<[RedditResponse<PostResponse>, RedditResponse<CommentResponse>]>(
    `https://www.reddit.com/r/${subreddit}/comments/${postId}.json?limit=20&depth=1`
  );
