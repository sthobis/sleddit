import Link from "next/link";
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
  SearchIcon
} from "./Icons";

class Sidebar extends Component {
  state = {
    subreddits: ["all", "pics", "gifs", "videos"]
  };

  render() {
    const { subreddits } = this.state;
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
          <div className="jump-to">
            <span className="jump-to-icon">
              <MenuIcon />
              <SearchIcon />
            </span>
            Jump to...
          </div>
          <span className="all-threads hover">
            <MessageIcon />
            All Threads
          </span>
        </section>
        <section>
          <span className="section-title">
            Channels
            <PlusIcon />
          </span>
          <ul className="channel-list">
            {subreddits.map(subreddit => (
              <li key={subreddit}>
                <Link href={`/?subreddit=${subreddit}`}>
                  <a className="channel-item hover">
                    {subreddit === "all" ? <LockIcon /> : <HashIcon />}
                    {subreddit}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <span className="section-title">
            Direct Messages
            <PlusIcon />
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
            <PlusIcon />
          </span>
        </section>
        <style jsx>{`
          .root {
            display: flex;
            flex-direction: column;
            flex-basis: 220px;
            flex-shrink: 0;
            max-width: 260px;
            background: #4d394b;
            color: rgb(184, 176, 183);
            font-size: 16px;
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

          .jump-to-icon {
            position: relative;
            width: 18px;
            height: 18px;
            margin: 0 4px 0 0;
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

          .section-title :global(svg) {
            position: absolute;
            top: 2px;
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
