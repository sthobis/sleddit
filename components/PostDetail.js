import Link from "next/link";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import CommentList from "./CommentList";
import { HashIcon, LockIcon, PlusIcon } from "./Icons";
import PostItem from "./PostItem";
import ReplyBar from "./ReplyBar";

class PostDetail extends Component {
  componentDidMount() {
    this.scrollToTop();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.post.id !== this.props.post.id) {
      this.scrollToTop();
    }
  }

  scrollToTop = () => {
    this.scrollbar.scrollToTop();
  };

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
            <a className="heading-close" aria-label="close">
              <PlusIcon />
            </a>
          </Link>
        </div>
        <div className="scroll-container">
          <Scrollbars
            ref={el => (this.scrollbar = el)}
            universal
            style={{ height: "100%" }}
            renderThumbVertical={props => (
              <div {...props} className="thumb-vertical" />
            )}
            renderTrackVertical={props => (
              <div {...props} className="track-vertical" />
            )}
          >
            <article className="post">
              <PostItem
                subreddit={subreddit}
                post={post}
                index={1}
                type="comment"
              />
              <div className="separator">replies</div>
              <CommentList comments={comments} />
            </article>
            <ReplyBar type="comment" />
          </Scrollbars>
        </div>
        <style jsx>{`
          .root {
            width: 492px;
            height: 100%;
            display: flex;
            flex-direction: column;
            flex-shrink: 0;
            border-left: 1px solid rgba(0, 0, 0, 0.1);
          }

          .heading {
            display: flex;
            align-items: center;
            flex-shrink: 0;
            flex-grow: 0;
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

          .scroll-container {
            flex: 1;
          }

          .scroll-container :global(.thumb-vertical) {
            border-radius: 4px;
            width: 8px !important;
            background-color: #8b8b8d;
          }

          .scroll-container :global(.track-vertical) {
            border-radius: 4px;
            top: 4px;
            bottom: 4px;
            right: 4px;
            width: 8px !important;
            background-color: #f3f3f3;
          }

          .post :global(.post-item) {
            padding-left: 11px;
            padding-right: 21px;
          }

          .post :global(.post-info) {
            top: 3px;
            right: 21px;
          }

          .separator {
            display: flex;
            align-items: center;
            color: #717274;
            font-size: 12px;
            padding: 6px 21px 6px 11px;
          }

          .separator::after {
            content: "";
            flex: 1;
            width: 100%;
            height: 1px;
            background: rgba(0, 0, 0, 0.1);
            margin: 2px 0 0 10px;
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
