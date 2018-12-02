import axios from "axios";
import React, { Component } from "react";
import Viewer from "../components/Viewer";

function formatPosts(posts) {
  return posts.map(({ data: post }) => {
    return {
      id: post.id,
      author: post.author,
      commentsCount: post.num_comments,
      created: post.created_utc,
      score: post.score,
      selfText: post.selftext,
      stickied: post.stickied,
      title: post.title,
      url: post.url
    };
  });
}

function formatComments(comments) {
  return comments
    ? comments
        .filter(({ kind }) => kind !== "more")
        .map(({ data: comment }) => {
          return {
            id: comment.id,
            author: comment.author,
            body: comment.body,
            comments: comment.replies
              ? formatComments(comment.replies.data.children)
              : [],
            created: comment.created_utc,
            score: comment.score
          };
        })
    : [];
}

class HomePage extends Component {
  static async getInitialProps({ req, res, store, query }) {
    const { subreddit, post } = query;

    if (!subreddit) {
      return {
        subreddit,
        posts: null,
        expandedPost: null,
        error: null
      };
    }

    try {
      let fetchRequest = [
        axios(`https://www.reddit.com/r/${subreddit}/hot.json?limit=20`)
      ];
      if (post) {
        fetchRequest.push(
          axios(
            `https://www.reddit.com/r/${subreddit}/comments/${post}.json?limit=20&depth=1`
          )
        );
      }
      // TODO: find out why these requests are so slow
      const [subredditJson, postJson] = await Promise.all(fetchRequest);

      const posts = formatPosts(subredditJson.data.data.children);
      const expandedPost = post
        ? {
            post: formatPosts(postJson.data[0].data.children)[0],
            comments: formatComments(postJson.data[1].data.children)
          }
        : null;

      return {
        subreddit,
        posts,
        expandedPost,
        error: null
      };
    } catch (err) {
      console.error(err);
      return {
        subreddit,
        posts: null,
        expandedPost: null,
        error: err.message || err
      };
    }
  }

  render() {
    const { subreddit, error, posts, expandedPost } = this.props;
    return (
      <>
        <Viewer
          subreddit={subreddit}
          posts={posts}
          expandedPost={expandedPost}
        />
        {error && (
          <div>
            ERROR:
            <br />
            {error}
          </div>
        )}
      </>
    );
  }
}

export default HomePage;
