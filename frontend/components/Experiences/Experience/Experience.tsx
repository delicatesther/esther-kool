import React from 'react'
import { useUser } from '@enk/utils';
import classNames from "classnames/bind";
import styling from "./experience.module.scss";

const cx = classNames.bind(styling);

export const Experience = ({title, status, summary, tags, from, to, className }) => {
  const me = useUser();

  if(!me && status === "draft") {
    return null;
  }
  const fromYear = new Date(from).getFullYear();
  const toYear = to ? new Date(to).getFullYear() : "";

  return (
    <article className={cx(["experience"], [status], [className])}>
      <time dateTime={`${fromYear}`} className={styling.years}>{fromYear}{toYear && toYear !== fromYear && ` - ${toYear}`}</time>
      <div className={styling.container}>
          <h3 className={styling.title}>{title}{status === "draft" && " - Draft"}</h3>
          {tags.map(tag => <span key={tag.id} className={styling.tag}>{tag.name}</span>)}
          {summary && <p className={styling.summary}>{summary}</p>}
          </div>
    </article>
  )
}