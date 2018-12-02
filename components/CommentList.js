import PropTypes from "prop-types";
import React, { Component } from "react";
import CommentItem from "./CommentItem";

class CommentList extends Component {
  render() {
    const { comments } = this.props;
    return (
      <ul className="comment-list">
        {comments.map((comment, index) => (
          <li key={comment.id}>
            <CommentItem comment={comment} index={index} />
          </li>
        ))}
        <style jsx>{`
          .comment-list {
            margin: 0 0 10px 0;
            padding: 0;
            list-style-type: none;
          }
        `}</style>
      </ul>
    );
  }
}

CommentList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default CommentList;
