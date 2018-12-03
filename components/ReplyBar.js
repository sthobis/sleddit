import PropTypes from "prop-types";
import React, { Component } from "react";
import { AtIcon, PlusIcon } from "./Icons";

class ReplyBox extends Component {
  render() {
    const { id, style, subreddit } = this.props;
    return (
      <div className="root">
        <span className="attachment">
          <PlusIcon />
        </span>
        <label for={id}>Reply</label>
        <input
          type="text"
          defaultValue=""
          placeholder={
            style === "post" && subreddit ? `Message #${subreddit}` : "Reply.."
          }
        />
        <span className="mention">
          <AtIcon />
        </span>
        <style jsx>{`
          .root {
            display: flex;
            justify-content: space-between;
            align-items: stretch;
            border-color: ${style === "post"
              ? "rgba(145, 145, 147, 0.7)"
              : "#919193"};
            border-style: solid;
            border-width: ${style === "post" ? "2px" : "1px"};
            border-radius: ${style === "post" ? "6px" : "4px"};
            margin-top: 6px;
            margin-left: ${style === "post" ? "20px" : "10px"};
            margin-right: ${style === "post" ? "20px" : "10px"};
            margin-bottom: 20px;
          }

          .root :global(svg) {
            width: 22px;
            height: 22px;
            fill: ${style === "post" ? "rgba(145, 145, 147, 0.7)" : "#919193"};
          }

          .attachment {
            display: flex;
            width: ${style === "post" ? "40px" : "34px"};
            height: ${style === "post" ? "40px" : "34px"};
            justify-content: center;
            align-items: center;
            flex-shrink: 0;
            border-right-style: solid;
            border-right-color: ${style === "post"
              ? "rgba(145, 145, 147, 0.7)"
              : "#919193"};
            border-right-width: ${style === "post" ? "2px" : "1px"};
          }

          label {
            display: none;
            visibility: hidden;
          }

          input {
            width: 100%;
            height: ${style === "post" ? "40px" : "34px"};
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
            width: ${style === "post" ? "40px" : "34px"};
            height: ${style === "post" ? "40px" : "34px"};
            justify-content: center;
            align-items: center;
            flex-shrink: 0;
            margin: 0 2px 0 0;
          }

          .mention :global(svg) {
            fill: #717274;
          }
        `}</style>
      </div>
    );
  }
}

ReplyBox.propTypes = {
  id: PropTypes.string.isRequired,
  style: PropTypes.oneOf(["post", "comment"]).isRequired,
  subreddit: PropTypes.string
};

export default ReplyBox;
