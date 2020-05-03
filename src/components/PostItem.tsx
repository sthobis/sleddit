import format from "date-fns/format";
import React from "react";
import EmbedMedia from "./EmbedMedia";
import { MessageIcon } from "./Icons";
import Link from "./Link";
import { Post, Subreddit, PostItemEnum } from "../types";

function unescape(str) {
  let result = str.replace(/&gt;/g, ">");
  result = result.replace(/&lt;/g, "<");
  result = result.replace(/&quot;/g, '"');
  result = result.replace(/&apos;/g, "'");
  result = result.replace(/&amp;/g, "&");
  result = result.replace(/&#x200B;/g, "");
  return result;
}

type PostItemProps = {
  subreddit: Subreddit;
  type: PostItemEnum;
  post: Post;
  index: number;
  active: boolean;
  isRedditBlocked: boolean;
};

const PostItem = ({
  subreddit,
  type,
  post,
  index,
  active,
  isRedditBlocked
}: PostItemProps) => {
  const getImage = () => {
    return `/avatar${index % 2 === 0 ? "-2" : ""}.png`;
  };

  const {
    id,
    author,
    commentsCount,
    created,
    score,
    selfText,
    title,
    url,
    domain,
    nsfw
  } = post;

  return (
    <div className={`post-item${active ? " active" : ""}`}>
      {type === "post" && (
        <Link
          href={`/?subreddit=${subreddit}&postId=${id}`}
          className="post-link"
          aria-label={`go to ${title}`}
          isRedditBlocked={isRedditBlocked}
        />
      )}
      <div className="post-info">
        <span>
          <MessageIcon />
          {commentsCount}
        </span>
        <span>{format(created * 1000, "MMM D YY h:mm A")}</span>
      </div>
      {nsfw ? (
        <div className="post-author-thumbnail nsfw" />
      ) : (
        <img className="post-author-thumbnail" alt={author} src={getImage()} />
      )}
      <div className="post-content">
        <div>
          <span className="post-author-username">{author}</span>
          <span className="post-score">
            {score > 1000 ? `${(score / 1000).toFixed(0)}k` : score} points
          </span>
        </div>
        <div className="post-body">
          <p className="post-title">{title}</p>
          <EmbedMedia type={type} url={url} domain={domain} />
          {selfText && type === "comment" && (
            <div
              className="post-self-text reddit-markup"
              dangerouslySetInnerHTML={{ __html: unescape(selfText) }}
            />
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

        .post-item :global(.post-link) {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .post-info {
          position: absolute;
          top: ${index === 0 ? "3px" : "-8px"};
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

        .post-item:hover,
        .post-item.active {
          background: #f9f9f9;
        }

        .post-content {
          width: 100%;
        }

        .post-author-thumbnail {
          flex-shrink: 0;
          width: 36px;
          height: 36px;
          margin: 2px 8px 0 0;
          border-radius: 3px;
        }

        .post-author-thumbnail.nsfw::before {
          content: "18+";
          color: #fff;
          font-size: 14px;
        }

        .post-author-thumbnail.nsfw {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-shrink: 0;
          width: 36px;
          height: 36px;
          margin: 2px 8px 0 0;
          border-radius: 3px;
          background-color: #b30000;
        }

        .post-author-username {
          font-weight: 900;
          color: #2c2d30;
          margin: 0 6px 0 0;
          text-transform: lowercase;
        }

        .post-score {
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

        .post-self-text {
          margin: 5px 0 0 0;
        }

        @media screen and (min-width: 1024px) {
          .post-item:hover .post-info {
            display: flex;
          }
        }
      `}</style>
    </div>
  );
};

export default PostItem;
