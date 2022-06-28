import React from "react";
import style from "./businessCard.module.scss";
import { Avatar } from "@enk/components/Avatar";

export const BusinessCard = ({ src, size }) => {
  return (
    <article className={style.card}>
      <Avatar className={style.circle} src={src} size={size} alt="" />
      <h2>I'm...</h2>
      <ul className={style.list}>
        <li>Esther Kool (She/Her)</li>
        <li>
          <a href="https://www.twitter.com/delicatesther">@delicatesther</a>
        </li>
        <li>a front-end developer from NL 🇳🇱</li>
        <li>a D&D nerd who prints and paints her own minis</li>
        <li>a lover of music, film, photography & cheese</li>
      </ul>
    </article>
  );
};
