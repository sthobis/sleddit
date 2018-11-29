import axios from "axios";
import React, { Component } from "react";

function formatPosts(posts) {
  return posts.map(post => {
    const { author, score, created, stickied, num_comments } = post.data;
    return {
      author,
      score,
      created,
      stickied,
      commentsCount: num_comments
    };
  });
}

function formatComments(comments) {
  return comments
    ? comments.map(comment => {
        const { author, score, created, replies } = comment.data;
        return {
          author,
          score,
          created,
          comments: replies ? formatComments(replies.data.children) : []
        };
      })
    : [];
}

class HomePage extends Component {
  static async getInitialProps({ req, res, store, query }) {
    const { subreddit, post } = query;

    if (!subreddit) {
      return {
        posts: null,
        expandedPost: null,
        error: null
      };
    }

    try {
      let fetchRequest = [
        axios(`https://www.reddit.com/r/${subreddit}/hot.json?limit=10`, {
          headers: {
            "User-Agent": "sleddit:1.0.0 (by /u/instacl)"
          }
        })
      ];
      if (post) {
        fetchRequest.push(
          axios(
            `https://www.reddit.com/r/${subreddit}/comments/${post}.json?limit=5&depth=1`,
            {
              headers: {
                "User-Agent": "sleddit:1.0.0 (by /u/instacl)"
              }
            }
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
        posts,
        expandedPost,
        error: null
      };
    } catch (err) {
      console.error(err);
      return {
        posts: null,
        expandedPost: null,
        error: err
      };
    }
  }

  render() {
    const { error, posts, expandedPost } = this.props;
    return <div>Ready</div>;
  }
}

export default HomePage;
