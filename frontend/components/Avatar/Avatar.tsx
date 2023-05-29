import Image from "next/image";
import React from "react";
import classNames from "classnames/bind";
import style from "./avatar.module.scss";

const cx = classNames.bind(style);

export const Avatar = ({ className, src, size = "medium", alt }) => {
  return (
    <div className={cx(["avatar"], [size], [className])}>
      <Image src={src} width={200} height={200} alt={alt} />
    </div>
  );
};
