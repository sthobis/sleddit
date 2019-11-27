import axios from "axios";
import cookie from "cookie";
import PropTypes from "prop-types";
import React, { Component } from "react";
import Viewer from "../components/Viewer";
import { SORTING_OPTIONS } from "../constants";
import { COOKIE_KEY_SUBREDDITS, COOKIE_SETTINGS } from "../config";

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
      domain: post.domain,
      nsfw: post.over_18
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
  static async getInitialProps({ req, res, query }) {
    const { subreddit = "all", post } = query;

    const cookies = req
      ? cookie.parse(req.headers.cookie || "")
      : cookie.parse(window.document.cookie);
    const savedSubreddits = cookies[COOKIE_KEY_SUBREDDITS]
      ? cookies[COOKIE_KEY_SUBREDDITS].split(",")
      : ["all", "gifs", "pics", "videos"];
    const settings = cookies[COOKIE_SETTINGS]
      ? JSON.parse(cookies[COOKIE_KEY_SORTING])
      : { preferredSorting: "top" };
    if (savedSubreddits.findIndex(el => el === subreddit) < 0) {
      savedSubreddits.push(subreddit);
    }
    savedSubreddits.sort();

    try {
      let fetchRequest = [
        axios(
          `https://www.reddit.com/r/${subreddit}/${
            settings.preferredSorting
          }.json?limit=20`
        )
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
        settings,
        subreddit,
        posts,
        expandedPost,
        savedSubreddits,
        error: null
      };
    } catch (err) {
      console.error(err);
      return {
        settings,
        subreddit,
        posts: [],
        expandedPost: null,
        savedSubreddits,
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
    const {
      settings,
      subreddit,
      error,
      posts,
      expandedPost,
      savedSubreddits
    } = this.props;
    const { isRedditBlocked } = this.state;
    error && console.log(error);
    return (
      <>
        <Viewer
          subreddit={subreddit}
          settings={settings}
          posts={posts}
          expandedPost={expandedPost}
          isRedditBlocked={isRedditBlocked}
          savedSubreddits={savedSubreddits}
        />
      </>
    );
  }
}

HomePage.propTypes = {
  settings: PropTypes.shape({
    preferredSorting: PropTypes.oneOf(SORTING_OPTIONS)
  }),
  subreddit: PropTypes.string.isRequired,
  posts: PropTypes.array.isRequired,
  expandedPost: PropTypes.shape({
    post: PropTypes.object.isRequired,
    comments: PropTypes.array
  }),
  savedSubreddits: PropTypes.array.isRequired,
  error: PropTypes.any
};

export default HomePage;
