import produce from "immer";
import Link from "next/link";
import Router from "next/router";
import PropTypes from "prop-types";
import React, { Component } from "react";
import {
  DropdownIcon,
  HashIcon,
  HeartIcon,
  LockIcon,
  MenuIcon,
  MessageIcon,
  NotificationIcon,
  PlusIcon,
  PlusOutlineIcon,
  SearchIcon
} from "./Icons";

class Sidebar extends Component {
  constructor(props) {
    super(props);
    const { subreddit } = this.props;
    let subreddits = ["all", "pics", "gifs", "videos"];
    if (subreddits.findIndex(s => s === subreddit) < 0) {
      subreddits.push(subreddit);
    }
    this.state = {
      subreddits,
      subredditInput: "",
      subredditInputHasFocus: false
    };
  }

  focusSubredditInput = () => {
    this.subredditInput && this.subredditInput.focus();
  };

  handleChange = e => {
    this.setState({
      subredditInput: e.target.value
    });
  };

  handleKeyPress = e => {
    const { subredditInput } = this.state;
    if (e.which === 13) {
      Router.push(`/?subreddit=${subredditInput}`);
      this.setState(
        produce(draft => {
          draft.subreddits.push(subredditInput);
          draft.subredditInput = "";
        })
      );
    }
  };

  handleFocus = e => {
    this.setState({ subredditInputHasFocus: true });
  };

  handleBlur = e => {
    this.setState({
      subredditInput: "",
      subredditInputHasFocus: false
    });
  };

  removeSubreddit = subreddit => e => {
    e.preventDefault();
    this.setState(
      produce(draft => {
        draft.subreddits.splice(
          draft.subreddits.findIndex(s => s === subreddit),
          1
        );
      })
    );
  };

  render() {
    const { subreddit: activeSubreddit } = this.props;
    const { subreddits, subredditInput, subredditInputHasFocus } = this.state;
    return (
      <aside className="root">
        <section>
          <div className="team hover">
            <NotificationIcon />
            <span className="team-name">
              sleddit
              <DropdownIcon />
            </span>
            <span className="team-user">sthobis</span>
          </div>
          <div className={`jump-to${subredditInputHasFocus ? " active" : ""}`}>
            <span className="jump-to-icon">
              <MenuIcon />
              <SearchIcon />
            </span>
            <label>
              <span className="jump-to-label">Go to subreddit</span>
              {subredditInput && <span className="jump-to-prefix">/r/</span>}
              <input
                ref={el => (this.subredditInput = el)}
                type="text"
                placeholder="Jump to..."
                value={subredditInput}
                className="jump-to-input"
                onChange={this.handleChange}
                onKeyPress={this.handleKeyPress}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
              />
            </label>
          </div>
          <span className="all-threads hover">
            <MessageIcon />
            All Threads
          </span>
        </section>
        <section>
          <span
            className="section-title"
            style={{ cursor: "pointer" }}
            onClick={this.focusSubredditInput}
          >
            Channels
            <PlusOutlineIcon />
          </span>
          <ul className="channel-list">
            {subreddits.map(subreddit => (
              <li key={subreddit}>
                <Link href={`/?subreddit=${subreddit}`}>
                  <a
                    className={`channel-item hover${
                      subreddit === activeSubreddit ? " active" : ""
                    }`}
                  >
                    {subreddit === "all" ? <LockIcon /> : <HashIcon />}
                    {subreddit}
                    {subreddit !== "all" && (
                      <button
                        type="button"
                        className="channel-item-remove"
                        onClick={this.removeSubreddit(subreddit)}
                        aria-label="remove subreddit"
                      >
                        <PlusIcon />
                      </button>
                    )}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <span className="section-title">
            Direct Messages
            <PlusOutlineIcon />
          </span>
          <ul className="dm-list">
            <li>
              <span className="dm-item hover">
                <HeartIcon />
                slackbot
              </span>
            </li>
            <li>
              <span className="dm-item hover">sthobis (you)</span>
            </li>
          </ul>
        </section>
        <section>
          <span className="section-title">
            Apps
            <PlusOutlineIcon />
          </span>
        </section>
        <style jsx>{`
          .root {
            display: flex;
            flex-direction: column;
            width: 220px;
            flex-shrink: 0;
            max-width: 260px;
            background: #4d394b;
            color: rgb(184, 176, 183);
            font-size: 16px;
            cursor: default;
          }

          section {
            display: flex;
            flex-direction: column;
            margin: 0 0 18px;
          }

          .hover:hover {
            background-color: #3e313c;
          }

          .team {
            position: relative;
            display: flex;
            flex-direction: column;
            padding: 9px 16px 10px;
          }

          .team :global(> svg) {
            position: absolute;
            top: 10px;
            right: 14px;
            width: 22px;
            height: 22px;
            fill: rgb(184, 176, 183);
          }

          .team-name {
            display: flex;
            align-items: center;
            color: #fff;
            font-size: 18px;
            font-weight: 900;
          }

          .team-name :global(svg) {
            width: 12px;
            height: 12px;
            fill: rgb(184, 176, 183);
            margin: 0 0 1px 4px;
          }

          .team-user {
            display: flex;
            align-items: center;
            font-size: 14px;
            margin: 2px 0 0 0;
            color: #ab9ba9;
          }

          .team-user::before {
            content: "";
            display: block;
            width: 9px;
            height: 9px;
            background: #39948c;
            border-radius: 50%;
            margin: 1px 6px 0 0;
          }

          .team:hover .team-user {
            color: #fff;
          }

          .jump-to {
            display: flex;
            align-items: center;
            margin: 6px 14px 14px;
            padding: 7px;
            background: rgb(52, 32, 50);
            border-radius: 4px;
          }

          .jump-to.active,
          .jump-to:hover {
            background: rgb(42, 22, 40);
          }

          .jump-to-icon {
            position: relative;
            width: 18px;
            height: 18px;
            margin: 0 4px 0 0;
          }

          .jump-to-label {
            display: none;
            visibility: hidden;
          }

          .jump-to-prefix {
            margin-left: 2px;
          }

          .jump-to-input {
            background: transparent;
            font-family: inherit;
            border: none;
            font-size: 16px;
            color: rgb(184, 176, 183);
            outline: none;
          }

          .jump-to-input::placeholder {
            color: rgb(184, 176, 183);
          }

          .jump-to :global(svg:first-child) {
            width: 18px;
            height: 18px;
            fill: rgb(184, 176, 183);
          }

          .jump-to :global(svg:last-child) {
            position: absolute;
            bottom: 2px;
            right: 0;
            width: 10px;
            height: 10px;
            background: #4d394b;
            fill: rgb(184, 176, 183);
          }

          .all-threads {
            display: flex;
            align-items: center;
            padding: 3px 14px 4px;
          }

          .all-threads :global(svg) {
            width: 16px;
            height: 16px;
            fill: rgb(184, 176, 183);
            opacity: 0.64;
            margin: 0 5px 0 0;
            transform: rotateY(180deg);
          }

          .section-title {
            position: relative;
            margin: 0 14px 5px;
          }

          .section-title:hover {
            color: #fff;
          }

          .section-title:hover :global(svg) {
            fill: #fff;
          }

          .section-title :global(svg) {
            position: absolute;
            top: 1px;
            right: 0;
            width: 20px;
            height: 20px;
            fill: rgb(184, 176, 183);
            opacity: 0.64;
          }

          .channel-list,
          .dm-list {
            margin: 0;
            padding: 0;
            list-style-type: none;
          }

          .channel-item {
            position: relative;
            display: flex;
            align-items: center;
            padding: 3px 14px 4px;
            color: inherit;
            text-decoration: none;
          }

          .channel-item :global(svg) {
            width: 14px;
            height: 14px;
            fill: rgb(184, 176, 183);
            opacity: 0.64;
            margin: 0 4px 0 0;
          }

          .channel-item:visited {
            color: inherit;
          }

          .channel-item.active {
            background-color: #4c9689;
            color: #fff;
          }

          .channel-item.active :global(svg) {
            fill: #fff;
          }

          .channel-item:hover .channel-item-remove {
            display: flex;
          }

          .channel-item-remove {
            position: absolute;
            top: 4px;
            right: 12px;
            display: none;
            justify-content: center;
            align-items: center;
            width: 18px;
            height: 18px;
            background: transparent;
            border: none;
            cursor: pointer;
            padding: 0;
          }

          .channel-item-remove :global(svg) {
            width: 19px;
            height: 19px;
            transform: rotateZ(45deg);
          }

          .dm-item {
            display: flex;
            align-items: center;
            padding: 3px 14px 4px;
          }

          .dm-item::before {
            content: "";
            display: block;
            width: 9px;
            height: 9px;
            background: #39948c;
            border-radius: 50%;
            margin: 2px 6px 0 0;
          }
        `}</style>
      </aside>
    );
  }
}

Sidebar.propTypes = {
  subreddit: PropTypes.string
};

export default Sidebar;
