import format from "date-fns/format";
import React from "react";
import { Comment } from "../types";

function unescape(str: string) {
  let result = str.replace(/&gt;/g, ">");
  result = result.replace(/&lt;/g, "<");
  result = result.replace(/&quot;/g, '"');
  result = result.replace(/&apos;/g, "'");
  result = result.replace(/&amp;/g, "&");
  result = result.replace(/&#x200B;/g, "");
  return result;
}

interface CommentItemProps {
  comment: Comment;
  index: number;
}

const CommentItem = ({
  comment: { author, body, created, score },
  index
}: CommentItemProps) => {
  return (
    <div className="comment-item">
      <div className="comment-info">
        <span>{format(created * 1000, "MMM D YY h:mm A")}</span>
      </div>
      <img
        className="comment-author-thumbnail"
        alt={author}
        src={`/static/avatar${index % 2 === 0 ? "-2" : ""}.png`}
      />
      <div className="comment-content">
        <div>
          <span className="comment-author-username">{author}</span>
          <span className="comment-score">
            {score > 1000 ? `${(score / 1000).toFixed(0)}k` : score} points
          </span>
        </div>
        <div
          className="comment-body reddit-markup"
          dangerouslySetInnerHTML={{ __html: unescape(body) }}
        />
      </div>
      <style jsx>{`
        .comment-item {
          position: relative;
          display: flex;
          align-items: flex-start;
          padding: 7px 21px 7px 11px;
          color: #2c2d30;
        }

        .comment-info {
          position: absolute;
          top: -8px;
          right: 21px;
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
          flex-shrink: 0;
          width: 36px;
          height: 36px;
          margin: 2px 8px 0 0;
          border-radius: 3px;
        }

        .comment-content {
          width: 100%;
        }

        .comment-author-username {
          font-weight: 900;
          color: #2c2d30;
          margin: 0 6px 0 0;
          text-transform: lowercase;
        }

        .comment-score {
          font-size: 12px;
          color: #717274;
        }

        .comment-body {
          margin: 4px 0 0 0;
          font-size: 15px;
          line-height: 1.46668;
        }

        @media screen and (min-width: 1024px) {
          .comment-item:hover .comment-info {
            display: flex;
          }
        }
      `}</style>
    </div>
  );
};

export default CommentItem;
