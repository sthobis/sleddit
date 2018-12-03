import PropTypes from "prop-types";
import React, { Component } from "react";
import {
  AtIcon,
  EditIcon,
  HashIcon,
  InfoIcon,
  LockIcon,
  MoreIcon,
  PersonIcon,
  PhoneIcon,
  PickerIcon,
  SearchIcon,
  SettingIcon,
  StarIcon
} from "./Icons";

class AppBar extends Component {
  render() {
    const { subreddit } = this.props;
    return (
      <div className="root">
        <div className="subreddit">
          <div className="subreddit-name">
            {subreddit === "all" ? <LockIcon /> : <HashIcon />}
            {subreddit}
          </div>
          <ul className="subreddit-info">
            <li>
              <StarIcon />
            </li>
            <li>
              <PersonIcon />2
            </li>
            <li>
              <PickerIcon />0
            </li>
            <li>
              <EditIcon />
              Add a topic
            </li>
          </ul>
        </div>
        <ul className="menu">
          <li>
            <PhoneIcon />
          </li>
          <li>
            <InfoIcon />
          </li>
          <li>
            <SettingIcon />
          </li>
          <li className="menu-search">
            <SearchIcon />
            Search
          </li>
          <li>
            <AtIcon />
          </li>
          <li>
            <StarIcon />
          </li>
          <li>
            <MoreIcon />
          </li>
        </ul>
        <style jsx>{`
          .root {
            flex-shrink: 0;
            display: flex;
            justify-content: space-between;
            align-items: stretch;
            padding: 9px 12px 9px 18px;
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
          }

          .subreddit {
            flex-grow: 0;
            flex-shrink: 0;
          }

          .subreddit-name {
            display: flex;
            align-items: center;
            color: #2c2d30;
            font-size: 18px;
            font-weight: 900;
            margin: 0 0 5px 0;
          }

          .subreddit-name :global(svg) {
            width: 15px;
            height: 15px;
            fill: #2c2d30;
            margin: 0 2px 0 0;
          }

          .subreddit-info {
            display: flex;
            align-items: center;
            margin: 0;
            padding: 0;
            list-style-type: none;
            color: #717274;
            font-size: 13px;
          }

          .subreddit-info li {
            position: relative;
            display: flex;
            align-items: center;
            padding: 0 7px;
          }

          .subreddit-info li::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            display: block;
            width: 1px;
            background: #d0d0d1;
          }

          .subreddit-info li:first-child {
            padding-left: 0;
          }

          .subreddit-info li:first-child::before {
            display: none;
          }

          .subreddit-info li:first-child :global(svg) {
            margin-right: 0;
          }

          .subreddit-info :global(svg) {
            width: 15px;
            height: 15px;
            fill: #717274;
            margin: 0 2px 1px 0;
          }

          .menu {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            width: 100%;
            margin: 0;
            padding: 0;
            list-style-type: none;
          }

          .menu li {
            display: flex;
            align-items: center;
            height: 34px;
            padding: 0 6px;
          }

          .menu :global(svg) {
            width: 22px;
            height: 22px;
            fill: #717274;
          }

          .menu-search {
            display: flex;
            align-items: center;
            border: 1px solid #717274;
            border-radius: 5px;
            margin: 0 6px;
            color: rgba(0, 0, 0, 0.375);
            font-size: 15px;
            width: 100%;
            max-width: 250px;
          }

          .menu .menu-search :global(svg) {
            width: 18px;
            height: 18px;
            margin: 0 5px 0 0;
          }
        `}</style>
      </div>
    );
  }
}

AppBar.propTypes = {
  subreddit: PropTypes.string.isRequired
};

export default AppBar;
