import cookie from "cookie";
import Router from "next/router";
import React, {
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  KeyboardEvent,
  FocusEvent,
  MouseEvent
} from "react";
import { useImmer } from "use-immer";
import Scrollbars from "react-custom-scrollbars";
import { COOKIE_KEY_SUBREDDITS } from "../config";
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
import Link from "./Link";
import { Subreddit } from "../types";

type SidebarProps = {
  isSidebarOpened: boolean;
  activeSubreddit: Subreddit;
  isRedditBlocked: boolean;
  savedSubreddits: Subreddit[];
};

const Sidebar = ({
  isSidebarOpened,
  activeSubreddit,
  isRedditBlocked,
  savedSubreddits
}: SidebarProps) => {
  const [subreddits, updateSubreddits] = useImmer<Subreddit[]>(savedSubreddits);
  const [subredditInput, setSubredditInput] = useState<string>("");
  const [subredditInputHasFocus, setSubredditInputHasFocus] = useState<boolean>(
    false
  );

  const subredditInputRef = useRef<HTMLInputElement>();

  const focusSubredditInput = () => {
    if (subredditInputRef.current) {
      subredditInputRef.current.focus();
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSubredditInput((e.target.value || "").toLowerCase());
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.which === 13) {
      goToUrl(`/r/${subredditInput}`);
      addSubreddit(subredditInput);
    }
  };

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    setSubredditInputHasFocus(true);
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    setSubredditInput("");
    setSubredditInputHasFocus(false);
  };

  const addSubreddit = (newSubreddit: Subreddit) => {
    updateSubreddits(subreddits => {
      if (subreddits.findIndex(el => el === newSubreddit) < 0) {
        subreddits.push(newSubreddit);
        subreddits.sort();
        setSubredditInput("");
      }
    });
  };

  const removeSubreddit = (removedSubreddit: Subreddit) => (
    e: MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    updateSubreddits(subreddits => {
      subreddits.splice(
        subreddits.findIndex(s => s === removedSubreddit),
        1
      );
    });

    if (removedSubreddit === activeSubreddit) {
      goToUrl("/");
    }
  };

  const goToUrl = (url: string) => {
    if (isRedditBlocked) {
      window.location.href = url;
    } else {
      Router.push(url);
    }
  };

  const updateSubredditsCookie = () => {
    window.document.cookie = cookie.serialize(
      COOKIE_KEY_SUBREDDITS,
      subreddits.join(","),
      {
        expires: new Date("1 Jan 2030")
      }
    );
  };

  useEffect(updateSubredditsCookie, [subreddits]);

  return (
    <aside className={`root${isSidebarOpened ? "" : " closed"}`}>
      <div className="team hover">
        <NotificationIcon />
        <span className="team-name">
          sleddit
          <DropdownIcon />
        </span>
        <span className="team-user">sthobis</span>
      </div>
      <div className="scroll-container">
        <Scrollbars
          universal
          autoHide
          style={{ height: "100%" }}
          renderThumbVertical={props => (
            <div {...props} className="thumb-vertical" />
          )}
          renderTrackVertical={props => (
            <div {...props} className="track-vertical" />
          )}
        >
          <section>
            <div
              className={`jump-to${subredditInputHasFocus ? " active" : ""}`}
            >
              <span className="jump-to-icon">
                <MenuIcon />
                <SearchIcon />
              </span>
              <label>
                <span className="jump-to-label">Go to subreddit</span>
                {subredditInput && <span className="jump-to-prefix">/r/</span>}
                <input
                  ref={subredditInputRef}
                  type="text"
                  placeholder="Jump to..."
                  value={subredditInput}
                  className="jump-to-input"
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
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
              onClick={focusSubredditInput}
            >
              Channels
              <PlusOutlineIcon />
            </span>
            <ul className="channel-list">
              {subreddits.map(subreddit => (
                <li key={subreddit}>
                  <Link
                    isRedditBlocked={isRedditBlocked}
                    href={`/r/${subreddit}`}
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
                        onClick={removeSubreddit(subreddit)}
                        aria-label="remove subreddit"
                      >
                        <PlusIcon />
                      </button>
                    )}
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
                <span className="dm-item hover bot">
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
        </Scrollbars>
      </div>
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

        .root.closed {
          display: none;
        }

        .hover:hover {
          background-color: #3e313c;
        }

        .team {
          position: relative;
          display: flex;
          flex-shrink: 0;
          flex-grow: 0;
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

        .scroll-container {
          flex: 1;
        }

        .scroll-container :global(.thumb-vertical) {
          border-radius: 4px;
          width: 8px !important;
          background-color: rgba(255, 255, 255, 0.5);
        }

        .scroll-container :global(.track-vertical) {
          border-radius: 4px;
          top: 4px;
          bottom: 4px;
          right: 3px;
          width: 8px !important;
          background-color: transparent;
        }

        section {
          display: flex;
          flex-direction: column;
          margin: 0 0 18px;
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
          width: 136px;
          padding: 0;
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

        .root :global(.channel-item) {
          position: relative;
          display: flex;
          align-items: center;
          padding: 3px 14px 4px;
          color: inherit;
          text-decoration: none;
        }

        .root :global(.channel-item svg) {
          width: 14px;
          height: 14px;
          fill: rgb(184, 176, 183);
          opacity: 0.64;
          margin: 0 4px 0 0;
        }

        .root :global(.channel-item:visited) {
          color: inherit;
        }

        .root :global(.channel-item.active) {
          background-color: #4c9689;
          color: #fff;
        }

        .root :global(.channel-item.active svg) {
          fill: #fff;
        }

        .root :global(.channel-item-remove) {
          position: absolute;
          top: 4px;
          right: 12px;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 18px;
          height: 18px;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 0;
        }

        .root :global(.channel-item-remove svg) {
          width: 19px;
          height: 19px;
          transform: rotateZ(45deg);
        }

        .dm-item {
          display: flex;
          align-items: center;
          padding: 3px 14px 4px;
        }

        .dm-item :global(svg) {
          width: 12px;
          height: 12px;
          margin: 2px 4px 0 0.5px;
        }

        .dm-item:not(.bot)::before {
          content: "";
          display: block;
          width: 9px;
          height: 9px;
          background: #39948c;
          border-radius: 50%;
          margin: 2px 6px 0 2px;
        }

        @media screen and (min-width: 1024px) {
          .root.closed {
            display: flex;
          }

          .root :global(.channel-item-remove) {
            display: none;
          }

          .root :global(.channel-item:hover .channel-item-remove) {
            display: flex;
          }
        }
      `}</style>
    </aside>
  );
};

export default Sidebar;
