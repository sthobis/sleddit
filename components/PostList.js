import Link from "next/link";
import PropTypes from "prop-types";
import React, { Component } from "react";

class PostList extends Component {
  render() {
    const { subreddit, posts } = this.props;
    return (
      <div>
        <ul>
          {posts.map(
            ({
              id,
              author,
              commentsCount,
              created,
              score,
              selfText,
              stickied,
              title,
              url
            }) => (
              <li key={id}>
                <Link href={`/?subreddit=${subreddit}&post=${id}`}>
                  <a>
                    <p>{author}</p>
                    <p>{title}</p>
                  </a>
                </Link>
              </li>
            )
          )}
        </ul>
      </div>
    );
  }
}

PostList.propTypes = {
  subreddit: PropTypes.string,
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      commentsCount: PropTypes.number.isRequired,
      created: PropTypes.number.isRequired,
      score: PropTypes.number.isRequired,
      selfText: PropTypes.string.isRequired,
      stickied: PropTypes.bool.isRequired,
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired
    })
  )
};

export default PostList;
