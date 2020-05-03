import Head from "next/head";
import React, { useState, useEffect } from "react";
import AppBar from "./AppBar";
import PostDetail from "./PostDetail";
import PostList from "./PostList";
import Sidebar from "./Sidebar";
import { usePrevious } from "../libs/hooks";
import { Nullable, Thread, Post, Subreddit, Settings } from "../types";

export interface ViewerProps {
  savedSubreddits: string[];
  subreddit: Subreddit;
  posts: Post[];
  expandedPost: Nullable<Thread>;
  isRedditBlocked: boolean;
  settings: Settings;
}

const Viewer = ({
  savedSubreddits,
  subreddit,
  posts,
  expandedPost,
  isRedditBlocked,
  settings
}: ViewerProps) => {
  const [isSidebarOpened, setIsSidebarOpened] = useState(false);
  const prevSubreddit = usePrevious<Subreddit>(subreddit);

  useEffect(() => {
    if (subreddit !== prevSubreddit && isSidebarOpened) {
      setIsSidebarOpened(false);
    }
  }, [isSidebarOpened]);

  const openSidebar = () => {
    setIsSidebarOpened(true);
  };

  const closeSidebar = () => {
    setIsSidebarOpened(false);
  };

  return (
    <div className="root">
      <Head>
        <title>{subreddit} | sthobis Sleddit</title>
      </Head>
      <Sidebar
        isSidebarOpened={isSidebarOpened}
        activeSubreddit={subreddit}
        isRedditBlocked={isRedditBlocked}
        savedSubreddits={savedSubreddits}
      />
      <main className="content">
        <AppBar
          subreddit={subreddit}
          openSidebar={openSidebar}
          settings={settings}
        />
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
        {isSidebarOpened && <div className="overlay" onClick={closeSidebar} />}
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

        .settings-modal-overlay {
          background-color: 0;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .settings-modal {
          font-family: Lato, sans-serif;
          font-size: 15px;
          font-variant-ligatures: common-ligatures;
          -moz-osx-font-smoothing: grayscale;
          -webkit-font-smoothing: antialiased;
          box-shadow: 0 0 0 1px lightgrey, 0 4px 12px 0 rgba(0, 0, 0, 0.12);
          color: rgb(29, 28, 29);
          background-color: #f8f8f8;
          border-radius: 6px;
          user-select: none;
          padding: 20px;
          position: absolute;
          right: 380px;
          top: 50px;
        }
      `}</style>
    </div>
  );
};

export default Viewer;
