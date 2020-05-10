import { SORTING_OPTIONS } from "./constants";

export type Nullable<T> = T | null;

export type PostItemEnum = "post" | "comment";

export type Subreddit = string;

export type Post = {
  id: string;
  author: string;
  commentsCount: number;
  created: number;
  score: number;
  selfText: string;
  stickied: boolean;
  title: string;
  url: string;
  domain: string;
  nsfw: boolean;
};

export type Comment = {
  id: string;
  author: string;
  body: string;
  created: number;
  score: number;
};

export type Thread = {
  post: Post;
  comments: Comment[];
};

export type Settings = {
  sorting: typeof SORTING_OPTIONS[number];
};

export type PageProps = {
  savedSubreddits: Subreddit[];
  subreddit: Subreddit;
  posts: Post[];
  expandedPost: Nullable<Thread>;
  settings: Settings;
  error: Nullable<any>;
  isRedditBlocked?: boolean;
};
