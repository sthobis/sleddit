import { PostResponse, CommentResponse } from "./api";
import { Post, Comment } from "../types";

export function formatPosts(posts: PostResponse[]): Post[] {
  return posts.map(post => {
    return {
      id: post.id,
      author: post.author,
      commentsCount: post.num_comments,
      created: post.created_utc,
      score: post.score,
      selfText: post.selftext_html,
      stickied: post.stickied,
      title: post.title,
      url: post.url,
      domain: post.domain,
      nsfw: post.over_18
    };
  });
}

export function formatComments(comments: CommentResponse[]): Comment[] {
  return comments
    ? comments.map(comment => {
        return {
          id: comment.id,
          author: comment.author,
          body: comment.body_html,
          created: comment.created_utc,
          score: comment.score
        };
      })
    : [];
}
