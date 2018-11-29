import PropTypes from "prop-types";
import React, { Component } from "react";
import PostDetail from "./PostDetail";
import PostList from "./PostList";
import Sidebar from "./Sidebar";

class Viewer extends Component {
  render() {
    const { subreddit, posts, expandedPost } = this.props;

    return (
      <div>
        <Sidebar subreddit={subreddit} />
        <PostList subreddit={subreddit} posts={posts} />
        {expandedPost && (
          <PostDetail
            post={expandedPost.post}
            comments={expandedPost.comments}
          />
        )}
        <style jsx>{`
          div {
            display: flex;
            align-items: stretch;
            min-height: 100vh;
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
