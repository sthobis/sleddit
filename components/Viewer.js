import PropTypes from "prop-types";
import React, { Component } from "react";
import AppBar from "./AppBar";
import PostDetail from "./PostDetail";
import PostList from "./PostList";
import Sidebar from "./Sidebar";

class Viewer extends Component {
  render() {
    const { subreddit, posts, expandedPost } = this.props;

    return (
      <div className="root">
        <Sidebar subreddit={subreddit} />
        <main className="content">
          <AppBar subreddit={subreddit} />
          <div className="row">
            <PostList subreddit={subreddit} posts={posts} />
            {expandedPost && (
              <PostDetail
                subreddit={subreddit}
                post={expandedPost.post}
                comments={expandedPost.comments}
              />
            )}
          </div>
        </main>
        <style jsx>{`
          .root {
            display: flex;
            align-items: stretch;
            min-height: 100vh;
          }

          .content {
            width: 100%;
          }

          .row {
            display: flex;
            align-items: stretch;
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

Viewer.defaultProps = {
  subreddit: "all"
};

Viewer.propTypes = {
  subreddit: PropTypes.string.isRequired,
  posts: PropTypes.arrayOf(PropTypes.object),
  expandedPost: PropTypes.shape({
    post: PropTypes.object.isRequired,
    comments: PropTypes.array
  })
};

export default Viewer;