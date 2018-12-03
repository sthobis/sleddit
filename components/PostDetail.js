import Link from "next/link";
import PropTypes from "prop-types";
import React, { Component } from "react";
import CommentList from "./CommentList";
import { HashIcon, LockIcon, PlusIcon } from "./Icons";
import PostItem from "./PostItem";
import ReplyBar from "./ReplyBar";

class PostDetail extends Component {
  render() {
    const { subreddit, post, comments } = this.props;
    return (
      <div className="root">
        <div className="heading">
          <h2>
            <span>Thread</span>
            <span>
              {subreddit === "all" ? <LockIcon /> : <HashIcon />}
              {subreddit}
            </span>
          </h2>
          <Link href={`/?subreddit=${subreddit}`}>
            <a className="heading-close">
              <PlusIcon />
            </a>
          </Link>
        </div>
        <article className="post">
          <PostItem
            subreddit={subreddit}
            post={post}
            index={1}
            type="comment"
          />
          <CommentList comments={comments} />
        </article>
        <ReplyBar id="reply-comment" type="comment" />
        <style jsx>{`
          .root {
            width: 492px;
            flex-shrink: 0;
            border-left: 1px solid rgba(0, 0, 0, 0.1);
          }

          .heading {
            display: flex;
            align-items: center;
            padding: 19px 12px;
            background: #f9f9f9;
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
          }

          .heading h2 {
            width: 100%;
            margin: 0;
          }

          .heading h2 span:first-child {
            display: block;
            font-size: 17.25px;
            font-weight: 900;
            color: #2c2d30;
            margin: 0 0 4px 0;
          }

          .heading h2 span:last-child {
            display: flex;
            align-items: center;
            font-size: 12px;
            font-weight: 400;
            color: #717274;
          }

          .heading h2 span:last-child :global(svg) {
            width: 11px;
            height: 11px;
            fill: #717274;
          }

          .heading-close {
            flex-shrink: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 40px;
            height: 40px;
          }

          .heading-close :global(svg) {
            width: 26px;
            height: 26px;
            fill: #717274;
            transform: rotateZ(45deg);
          }

          .post :global(.post-item) {
            padding-left: 11px;
            padding-right: 11px;
          }

          .post :global(.post-url-image) {
            max-width: 100%;
            max-height: none;
          }

          .post :global(.post-info),
          .post :global(.comment-info) {
            top: 8px;
            right: 5px;
          }

          @media screen and (max-width: 1440px) {
            .root {
              width: 442px;
            }
          }

          @media screen and (max-width: 1366px) {
            .root {
              width: 392px;
            }
          }
        `}</style>
      </div>
    );
  }
}

PostDetail.propTypes = {
  subreddit: PropTypes.string.isRequired,
  post: PropTypes.object.isRequired,
  comments: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default PostDetail;
