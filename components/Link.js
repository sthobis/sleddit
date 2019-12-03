import Link from "next/link";
import PropTypes from "prop-types";
import React, { Component } from "react";

class DynamicLink extends Component {
  render() {
    const { isRedditBlocked, children, href, ...rest } = this.props;
    return (
      <>
        {isRedditBlocked ? (
          <a href={href} {...rest}>
            {children}
          </a>
        ) : (
          <Link href={href}>
            <a {...rest}>{children}</a>
          </Link>
        )}
      </>
    );
  }
}

DynamicLink.propTypes = {
  isRedditBlocked: PropTypes.bool.isRequired,
  href: PropTypes.string.isRequired,
  children: PropTypes.any
};

export default DynamicLink;
