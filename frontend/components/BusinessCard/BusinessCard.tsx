import React from "react";
import classNames from "classnames/bind";
import style from "./businessCard.module.scss";
import { Avatar } from "@enk/components/Avatar";
const cx = classNames.bind(style);
export const BusinessCard = ({ src, size }) => {
  const SampleText =
    "<sample code /> && not true; .some-class { code-goes-here: #bada55; } Once upon a time in a far away place, the dragon before dreams a Dumbo jazz. The wand quite ate a couple big Ginger Bread Men. A few castles in a bewildered ogre terribly said a proud Dumbo. Dumbos of a forest never walk a couple proud dragons. Ginger Bread Men never run those fast Cinderellas. Both Snow Whites happily find a dazzling tower, and they lived happily ever after.";

  return (
    <article className={style.card}>
      <Avatar className={style.circle} src={src} size={size} alt="" />
      <h2>Hello, I&apos;m...</h2>
      {/* <p className="h3">{SampleText}</p> */}
      <ul className={cx(["list"], "text-intro")}>
        <li>Esther Kool (She/Her)</li>
        <li>
          <a href="https://www.twitter.com/delicatesther" target="_blank" rel="noreferrer noopener">
            @delicatesther
          </a>
        </li>
        <li>a front-end developer from NL 🇳🇱</li>
        <li>a D&D nerd who prints and paints her own minis</li>
        <li>a lover of music, film, photography & cheese</li>
      </ul>
    </article>
  );
};
