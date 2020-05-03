import Link from "next/link";
import React, { PropsWithChildren, HTMLAttributes } from "react";

type DynamicLinkProps = HTMLAttributes<HTMLAnchorElement> & {
  isRedditBlocked: boolean;
  href: string;
};

const DynamicLink = ({
  isRedditBlocked,
  href,
  children,
  ...rest
}: PropsWithChildren<DynamicLinkProps>) => {
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
};

export default DynamicLink;
