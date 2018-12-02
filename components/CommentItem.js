import format from "date-fns/format";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { StarIcon } from "./Icons";

class CommentItem extends Component {
  render() {
    const {
      comment: { author, body, created, score },
      index
    } = this.props;
    return (
      <div className="comment-item">
        <div className="comment-info">
          <span>
            <StarIcon />
            {score > 1000 ? `${(score / 1000).toFixed(0)}k` : score}
          </span>
        </div>
        <img
          className="comment-author-thumbnail"
          src={`/static/avatar${index % 2 === 0 ? "-2" : ""}.png`}
        />
        <div>
          <div>
            <span className="comment-author-username">{author}</span>
            <span className="comment-timestamp">
              {format(created * 1000, "YYYY-MM-DD h:mm A")}
            </span>
          </div>
          <p className="comment-body">{body}</p>
        </div>
        <style jsx>{`
          .comment-item {
            position: relative;
            display: flex;
            align-items: flex-start;
            padding: 7px 27px;
            color: #2c2d30;
            cursor: pointer;
          }

          .comment-item:hover .comment-info {
            display: flex;
          }

          .comment-info {
            position: absolute;
            top: -8px;
            right: 27px;
            display: none;
            align-items: center;
            background: #fff;
            border: 1px solid rgba(0, 0, 0, 0.15);
            border-radius: 6px;
          }

          .comment-info span {
            display: flex;
            align-items: center;
            font-size: 12px;
            color: #717274;
            padding: 4px 8px;
          }

          .comment-info span + span {
            border-left: 1px solid rgba(0, 0, 0, 0.15);
          }

          .comment-info :global(svg) {
            width: 20px;
            height: 20px;
            fill: #717274;
            margin: 0 4px 0 0;
            opacity: 0.75;
          }

          .comment-item:hover {
            background: #f9f9f9;
          }

          .comment-author-thumbnail {
            width: 36px;
            height: 36px;
            margin: 2px 8px 0 0;
            border-radius: 3px;
          }

          .comment-author-username {
            font-weight: 900;
            color: #2c2d30;
            margin: 0 6px 0 0;
            text-transform: lowercase;
          }

          .comment-timestamp {
            font-size: 12px;
            color: #717274;
          }

          .comment-body {
            margin: 4px 0 0 0;
            font-size: 15px;
            line-height: 1.46668;
          }
        `}</style>
      </div>
    );
  }
}

CommentItem.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    comments: PropTypes.array.isRequired,
    created: PropTypes.number.isRequired,
    score: PropTypes.number.isRequired
  }).isRequired,
  index: PropTypes.number.isRequired
};

export default CommentItem;
