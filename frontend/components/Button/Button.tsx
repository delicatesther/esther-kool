import Link from "next/link";
import React from "react";

export const Button = ({ anchor = false, external = false, children, ...props }) => {
  if (anchor && external) {
    return (
      <a href={props.href} rel="noreferrer noopener" className="button">
        <span className="button-text" data-text={children}>
          {children}
        </span>
      </a>
    );
  }
  if (anchor) {
    return (
      <Link href={props.href}>
        <a className="button">
          <span className="button-text" data-text={children}>
            {children}
          </span>
        </a>
      </Link>
    );
  }
  return (
    <button {...props}>
      <span className="button-text" data-text={children}>
        {children}
      </span>
    </button>
  );
};
