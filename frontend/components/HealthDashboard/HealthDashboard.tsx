import { useUser } from "@enk/utils";
import React from "react";
import Scales from "@enk/icons/scales.svg";
import style from "./healthDashboard.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);

export const HealthDashboard = () => {
  function getWeeksBetween(d1, d2) {
    const weeksBetween = Math.ceil((d2 - d1) / (7 * 24 * 60 * 60 * 1000));
    return weeksBetween;
  }

  function calculatePregnancy() {
    const dueDate = new Date("November 16, 2022");
    const currentDate = new Date();
    const weeksBetween = getWeeksBetween(currentDate, dueDate);
    return 40 - weeksBetween;
  }

  return (
    <div className="row">
      <div className={cx(["card"], ["medium"])}>
        <table className={style.table}>
          <thead>
            <tr>
              <th>
                <span>Naam</span>
              </th>
              <th>
                <span>Geboortedatum</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Name goes here</td>
              <td>Birthdate goes here</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className={cx(["card"], ["medium"])}>
        <table className={style.table}>
          <thead>
            <tr>
              <th>
                <span>Lengte</span>
              </th>
              <th>
                <span>
                  <Scales />
                  Gewicht
                </span>
              </th>
              <th>
                <span>Aantal weken zwanger</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Height goes here</td>
              <td>weight goes here</td>
              <td>{calculatePregnancy()}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className={cx(["card"], ["small"])}>
        <table className={style.table}>
          <thead>
            <tr>
              <th>Datum</th>
              <th>TSH</th>
              <th>FT4</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Date goes here</td>
              <td>TSH value goes here</td>
              <td>?</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
