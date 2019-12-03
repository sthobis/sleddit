import React from "react";
import { AtIcon, PlusIcon } from "./Icons";
import { Subreddit, PostItemEnum } from "../types";

interface ReplyBoxProps {
  type: PostItemEnum;
  subreddit: Subreddit;
}

const ReplyBox = ({ type, subreddit }: ReplyBoxProps) => {
  return (
    <div className="root">
      <span className="attachment">
        <PlusIcon />
      </span>
      <label>
        <span className="label">Reply</span>
        <input
          type="text"
          defaultValue=""
          placeholder={
            type === "post" && subreddit ? `Message #${subreddit}` : "Reply.."
          }
        />
      </label>
      <span className="mention">
        <AtIcon />
      </span>
      <style jsx>{`
        .root {
          display: flex;
          justify-content: space-between;
          align-items: stretch;
          border-color: ${type === "post"
            ? "rgba(145, 145, 147, 0.7)"
            : "#919193"};
          border-style: solid;
          border-width: ${type === "post" ? "2px" : "1px"};
          border-radius: ${type === "post" ? "6px" : "4px"};
          margin-top: 0;
          margin-left: ${type === "post" ? "20px" : "10px"};
          margin-right: ${type === "post" ? "20px" : "10px"};
          margin-bottom: 20px;
        }

        .root :global(svg) {
          width: 22px;
          height: 22px;
          fill: ${type === "post" ? "rgba(145, 145, 147, 0.7)" : "#919193"};
        }

        .attachment {
          display: flex;
          width: ${type === "post" ? "40px" : "34px"};
          height: ${type === "post" ? "40px" : "34px"};
          justify-content: center;
          align-items: center;
          flex-shrink: 0;
          border-right-style: solid;
          border-right-color: ${type === "post"
            ? "rgba(145, 145, 147, 0.7)"
            : "#919193"};
          border-right-width: ${type === "post" ? "2px" : "1px"};
        }

        label {
          display: block;
          width: 100%;
        }

        .label {
          display: none;
          visibility: hidden;
        }

        input {
          width: 100%;
          height: ${type === "post" ? "40px" : "34px"};
          padding: 6px 10px;
          border: none;
          outline: none;
          font-size: 15px;
          filter: grayscale(100%);
        }

        input::placeholder {
          color: rgba(0, 0, 0, 0.375);
        }

        .mention {
          display: flex;
          width: ${type === "post" ? "40px" : "34px"};
          height: ${type === "post" ? "40px" : "34px"};
          justify-content: center;
          align-items: center;
          flex-shrink: 0;
          margin: 0 2px 0 0;
        }

        .mention :global(svg) {
          fill: #717274;
        }

        @media screen and (min-width: 1024px) {
          .root {
            margin-right: 20px;
            margin-bottom: ${type === "post" ? "20px" : "65px"};
          }
        }
      `}</style>
    </div>
  );
};

export default ReplyBox;
