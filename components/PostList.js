import PropTypes from "prop-types";
import React, { Component } from "react";
import PostItem from "./PostItem";
import ReplyBar from "./ReplyBar";

class PostList extends Component {
  render() {
    const { posts, subreddit } = this.props;
    return (
      <div className="root">
        <ul className="post-list">
          {posts.map((post, index) => (
            <li key={post.id}>
              <PostItem subreddit={subreddit} post={post} index={index} />
            </li>
          ))}
        </ul>
        <ReplyBar id="reply-post" style="post" subreddit={subreddit} />
        <style jsx>{`
          .root {
            width: 100%;
          }

          .post-list {
            margin: 0;
            padding: 0;
            list-style-type: none;
          }
        `}</style>
      </div>
    );
  }
}

PostList.propTypes = {
  subreddit: PropTypes.string.isRequired,
  posts: PropTypes.arrayOf(PropTypes.object)
};

export default PostList;
