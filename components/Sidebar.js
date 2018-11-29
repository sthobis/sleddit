import Link from "next/link";
import PropTypes from "prop-types";
import React, { Component } from "react";

class Sidebar extends Component {
  state = {
    subreddits: ["all", "pics", "gifs", "videos"]
  };

  render() {
    const { subreddits } = this.state;
    return (
      <div>
        {subreddits.map(subreddit => (
          <Link href={`/?subreddit=${subreddit}`} key={subreddit}>
            <a>{subreddit}</a>
          </Link>
        ))}
      </div>
    );
  }
}

Sidebar.propTypes = {
  subreddit: PropTypes.string
};

export default Sidebar;
