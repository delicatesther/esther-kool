import Image from "next/image";
import React from "react";
import classNames from "classnames/bind";
import style from "./avatar.module.scss";

const cx = classNames.bind(style);

export const Avatar = ({ className, src, size = "medium", alt }) => {
    // const theme: UseThemeProps = useTheme();
  // console.log(theme.theme);
  // const isLight = theme.theme === "light";
  return (
    <div className={cx(["avatar"], [size], [className])}>
      <Image src={src} width={200} height={200} alt={alt} />
      {/* <Image
          src={isLight ? "/me-light.png" : "/dark-mode-esther.png"}
          alt="Esther"
          width={600}
          height={isLight ? 484 : 443}
        /> */}
    </div>
  );
};
