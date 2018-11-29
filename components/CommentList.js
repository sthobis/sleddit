import PropTypes from "prop-types";
import React, { Component } from "react";

class CommentList extends Component {
  render() {
    const { comments } = this.props;
    return (
      <ul>
        {comments.map(({ id, author, body, comments, created, score }) => (
          <li key={id}>
            <div>
              <p>{author}</p>
              <p>{body}</p>
            </div>
          </li>
        ))}
      </ul>
    );
  }
}

CommentList.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      comments: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.object),
        PropTypes.string
      ]),
      created: PropTypes.number.isRequired,
      score: PropTypes.number.isRequired
    })
  )
};

export default CommentList;
