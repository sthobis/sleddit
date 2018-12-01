import PropTypes from "prop-types";
import React, { Component } from "react";
import PostDetail from "./PostDetail";
import PostList from "./PostList";
import Sidebar from "./Sidebar";

class Viewer extends Component {
  render() {
    const { subreddit, posts, expandedPost } = this.props;

    return (
      <div className="root">
        <Sidebar subreddit={subreddit} />
        <PostList subreddit={subreddit} posts={posts} />
        {expandedPost && (
          <PostDetail
            post={expandedPost.post}
            comments={expandedPost.comments}
          />
        )}
        <style jsx>{`
          .root {
            display: flex;
            align-items: stretch;
            min-height: 100vh;
          }
        `}</style>
        <style jsx global>{`
          body {
            margin: 0;
            font-family: Lato, sans-serif;
            font-size: 15px;
            font-variant-ligatures: common-ligatures;
            -moz-osx-font-smoothing: grayscale;
            -webkit-font-smoothing: antialiased;
          }
        `}</style>
      </div>
    );
  }
}

Viewer.propTypes = {
  subreddit: PropTypes.string,
  posts: PropTypes.arrayOf(PropTypes.object),
  expandedPost: PropTypes.shape({
    post: PropTypes.object.isRequired,
    comments: PropTypes.array
  })
};

export default Viewer;
