import React from 'react'
import { useUser } from '@enk/utils';
import classNames from "classnames/bind";

import style from "./experience.module.scss";

const cx = classNames.bind(style);

export const Experience = ({title, status, summary, tags, fromYear, toYear, years, className }) => {
  const me = useUser();
  const style = { "--experience-height": years.length } as React.CSSProperties;
  if(!me && status === "draft") {
    return null;
  }

  return (
    <article className={cx(["experience"], [status], [className])} style={style}>
          <h3>{fromYear}{toYear && ` - ${toYear}`}: {title}{status === "draft" && " - Draft"}</h3>
          {tags.map(tag => <span key={tag.id} className={style.tag}>{tag.name}</span>)}
    </article>
  )
}
