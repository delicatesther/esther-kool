import React from 'react'
import { useUser } from '@enk/utils';
import classNames from "classnames/bind";
import style from "./experience.module.scss";

const cx = classNames.bind(style);

export const Experience = ({title, status, summary, tags, fromYear, toYear, years, className }) => {
  const me = useUser();
  const cssVar = { "--experience-height": years.length } as React.CSSProperties;
  if(!me && status === "draft") {
    return null;
  }

  return (
    <article className={cx(["experience"], [status], [className], {["spanMultiple"] : years.length > 1})} style={cssVar}>
          <h3 className={style.title}><span className={style.years}>{fromYear}{toYear !== fromYear && ` - ${toYear}`}</span>{title}{status === "draft" && " - Draft"}</h3>
          {tags.map(tag => <span key={tag.id} className={style.tag}>{tag.name}</span>)}
          {summary && <p className={style.summary}>{summary}</p>}
    </article>
  )
}
