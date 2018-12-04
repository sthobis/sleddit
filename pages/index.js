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
      selfText: post.selftext_html,
      stickied: post.stickied,
      title: post.title,
      url: post.url,
      domain: post.domain
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
            body: comment.body_html,
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
    const { subreddit = "all", post } = query;

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
        posts: [],
        expandedPost: null,
        error: err.message || err
      };
    }
  }

  state = {
    // assume that reddit is blocked
    // and disable client-side routing
    // which means everything is server-rendered
    isRedditBlocked: true
  };

  componentDidMount() {
    let image = new Image();
    image.src = "https://reddit.com/favicon.ico";
    image.onload = () => {
      // user can access reddit from client-side
      this.setState({ isRedditBlocked: false });
    };
  }

  render() {
    const { subreddit, error, posts, expandedPost } = this.props;
    const { isRedditBlocked } = this.state;
    error && console.log(error);
    return (
      <>
        <Viewer
          subreddit={subreddit}
          posts={posts}
          expandedPost={expandedPost}
          isRedditBlocked={isRedditBlocked}
        />
      </>
    );
  }
}

export default HomePage;
