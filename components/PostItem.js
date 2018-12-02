import format from "date-fns/format";
import Router from "next/router";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { MessageIcon, StarIcon } from "./Icons";

class PostItem extends Component {
  expandPost = id => {
    const { subreddit } = this.props;
    Router.push(`/?subreddit=${subreddit}&post=${id}`);
  };

  render() {
    const {
      post: { id, author, commentsCount, created, score, title, url },
      index
    } = this.props;
    return (
      <div className="post-item" onClick={() => this.expandPost(id)}>
        <div className="post-info">
          <span>
            <StarIcon />
            {score > 1000 ? `${(score / 1000).toFixed(0)}k` : score}
          </span>
          <span>
            <MessageIcon />
            {commentsCount}
          </span>
        </div>
        <img
          className="post-author-thumbnail"
          src={`/static/avatar${index % 2 === 0 ? "-2" : ""}.png`}
        />
        <div className="post-content">
          <div>
            <span className="post-author-username">{author}</span>
            <span className="post-timestamp">
              {format(created * 1000, "YYYY-MM-DD h:mm A")}
            </span>
          </div>
          <div className="post-body">
            <p className="post-title">{title}</p>
            {/\.(gif|gifv|jpe?g|tiff|png)$/i.test(url) ? (
              <img
                className="post-url-image"
                alt={title}
                src={url.endsWith(".gifv") ? url.replace(".gifv", ".gif") : url}
              />
            ) : (
              <a className="post-url-text" href={url}>
                {url.length <= 40 ? url : url.substring(0, 40) + "..."}
              </a>
            )}
          </div>
        </div>
        <style jsx>{`
          .post-item {
            position: relative;
            display: flex;
            align-items: flex-start;
            padding: 7px 27px;
            color: #2c2d30;
            cursor: pointer;
          }

          .post-item:hover .post-info {
            display: flex;
          }

          .post-info {
            position: absolute;
            top: -8px;
            right: 27px;
            display: none;
            align-items: center;
            background: #fff;
            border: 1px solid rgba(0, 0, 0, 0.15);
            border-radius: 6px;
          }

          .post-info span {
            display: flex;
            align-items: center;
            font-size: 12px;
            color: #717274;
            padding: 4px 8px;
          }

          .post-info span + span {
            border-left: 1px solid rgba(0, 0, 0, 0.15);
          }

          .post-info :global(svg) {
            width: 20px;
            height: 20px;
            fill: #717274;
            margin: 0 4px 0 0;
            opacity: 0.75;
          }

          .post-item:hover {
            background: #f9f9f9;
          }

          .post-content {
            width: 100%;
          }

          .post-author-thumbnail {
            width: 36px;
            height: 36px;
            margin: 2px 8px 0 0;
            border-radius: 3px;
          }

          .post-author-username {
            font-weight: 900;
            color: #2c2d30;
            margin: 0 6px 0 0;
            text-transform: lowercase;
          }

          .post-timestamp {
            font-size: 12px;
            color: #717274;
          }

          .post-body {
            margin: 4px 0 0 0;
            font-size: 15px;
            line-height: 1.46668;
          }

          .post-title {
            margin: 0;
          }

          .post-url-image {
            max-width: 200px;
            max-height: 200px;
            border-radius: 4px;
            margin: 6px 0 0 0;
          }

          .post-url-text {
            color: #0576b9;
            text-decoration: none;
          }
        `}</style>
      </div>
    );
  }
}

PostItem.propTypes = {
  subreddit: PropTypes.string.isRequired,
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    commentsCount: PropTypes.number.isRequired,
    created: PropTypes.number.isRequired,
    score: PropTypes.number.isRequired,
    selfText: PropTypes.string.isRequired,
    stickied: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
  }).isRequired,
  index: PropTypes.number.isRequired
};

export default PostItem;
