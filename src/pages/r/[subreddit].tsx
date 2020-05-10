import React from "react";
import { NextPage } from "next";
import Viewer from "../../components/Viewer";
import { PageProps } from "../../types";
import getSubredditInitialProps from "../../libs/getSubredditInitialProps";

const SubredditPage: NextPage<PageProps> = ({ error, ...props }) => {
  error && console.log(error);
  return <Viewer {...props} />;
};

SubredditPage.getInitialProps = getSubredditInitialProps;

export default SubredditPage;
