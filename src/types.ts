export type Nullable<T> = T | null;

export type PostItemEnum = "post" | "comment";

export type Subreddit = string;

export interface Post {
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
}

export interface Comment {
  id: string;
  author: string;
  body: string;
  created: number;
  score: number;
}

export interface Thread {
  post: Post;
  comments: Comment[];
}
