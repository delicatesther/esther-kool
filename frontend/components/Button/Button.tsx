import React from "react";

export const Button = ({ children, ...props }) => {
  return (
    <button {...props}>
      <span className="button-text" data-text={children}>
        {children}
      </span>
    </button>
  );
};
