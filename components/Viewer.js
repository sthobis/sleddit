import Head from "next/head";
import PropTypes from "prop-types";
import React, { Component } from "react";
import AppBar from "./AppBar";
import PostDetail from "./PostDetail";
import PostList from "./PostList";
import Sidebar from "./Sidebar";

class Viewer extends Component {
  state = {
    isSidebarOpened: false
  };

  componentDidUpdate(prevProps) {
    if (
      this.props.subreddit !== prevProps.subreddit &&
      this.state.isSidebarOpened
    ) {
      this.setState({ isSidebarOpened: false });
    }
  }

  openSidebar = () => {
    this.setState({ isSidebarOpened: true });
  };

  closeSidebar = () => {
    this.setState({ isSidebarOpened: false });
  };

  render() {
    const {
      subreddit,
      posts,
      expandedPost,
      isRedditBlocked,
      savedSubreddits
    } = this.props;
    const { isSidebarOpened } = this.state;

    return (
      <div className="root">
        <Head>
          <title>{subreddit} | sthobis Sleddit</title>
        </Head>
        <Sidebar
          isSidebarOpened={isSidebarOpened}
          subreddit={subreddit}
          isRedditBlocked={isRedditBlocked}
          savedSubreddits={savedSubreddits}
        />
        <main className="content">
          <AppBar subreddit={subreddit} openSidebar={this.openSidebar} />
          <div className="row">
            <PostList
              subreddit={subreddit}
              posts={posts}
              expandedPost={expandedPost}
              isRedditBlocked={isRedditBlocked}
            />
            {expandedPost && (
              <PostDetail
                subreddit={subreddit}
                post={expandedPost.post}
                comments={expandedPost.comments}
                isRedditBlocked={isRedditBlocked}
              />
            )}
          </div>
          {isSidebarOpened && (
            <div className="overlay" onClick={this.closeSidebar} />
          )}
        </main>
        <style jsx>{`
          .root {
            display: flex;
            align-items: stretch;
            height: 100vh;
          }

          .content {
            position: relative;
            display: flex;
            flex-direction: column;
            width: 100%;
            height: 100vh;
          }

          .row {
            display: flex;
            align-items: stretch;
            flex: 1;
            overflow-y: auto;
          }

          .overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 100;
            background: rgba(255, 255, 255, 0.75);
          }

          @media screen and (min-width: 1024px) {
            .overlay {
              display: none;
            }
          }
        `}</style>
        <style jsx global>{`
          * {
            box-sizing: border-box;
          }

          body {
            margin: 0;
            font-family: Lato, sans-serif;
            font-size: 15px;
            font-variant-ligatures: common-ligatures;
            -moz-osx-font-smoothing: grayscale;
            -webkit-font-smoothing: antialiased;
          }

          .reddit-markup :global(p) {
            margin: 0;
          }

          .reddit-markup :global(* + p) {
            margin-top: 5px;
          }

          .reddit-markup :global(p:empty) {
            display: none;
          }

          .reddit-markup :global(a) {
            color: #0576b9;
            word-break: break-all;
          }

          .reddit-markup :global(a:visited) {
            color: #0576b9;
          }

          .reddit-markup :global(ul),
          .reddit-markup :global(ol) {
            margin: 0;
            padding-left: 20px;
          }

          .reddit-markup :global(blockquote) {
            margin: 5px 0 0 0;
            border-left: 3px solid rgba(0, 0, 0, 0.15);
            padding: 0 0 0 8px;
          }
        `}</style>
      </div>
    );
  }
}

Viewer.propTypes = {
  subreddit: PropTypes.string.isRequired,
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  expandedPost: PropTypes.shape({
    post: PropTypes.object.isRequired,
    comments: PropTypes.array
  }),
  isRedditBlocked: PropTypes.bool.isRequired,
  savedSubreddits: PropTypes.array.isRequired
};

export default Viewer;
