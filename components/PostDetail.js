import PropTypes from "prop-types";
import React, { Component } from "react";
import CommentList from "./CommentList";

class PostDetail extends Component {
  render() {
    const {
      post: {
        author,
        commentsCount,
        created,
        id,
        score,
        selfText,
        stickied,
        title,
        url
      },
      comments
    } = this.props;
    return (
      <div>
        <p>{author}</p>
        <p>{title}</p>
        <CommentList comments={comments} />
      </div>
    );
  }
}

PostDetail.propTypes = {
  post: PropTypes.shape({
    author: PropTypes.string.isRequired,
    commentsCount: PropTypes.number.isRequired,
    created: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    selfText: PropTypes.string.isRequired,
    stickied: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
  }).isRequired,
  comments: PropTypes.arrayOf(PropTypes.object)
};

export default PostDetail;
