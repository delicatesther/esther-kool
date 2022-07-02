import { useState } from "react";
import Cookies from "universal-cookie";
import { consts } from "@enk/lib";
import style from "./login.module.scss";
import { Button } from "../Button";

export const Login = ({ redirectPath }) => {
  const [password, setPassword] = useState("");

  return (
    <div className="row">
      <div className={style.login}>
        <h2>Login</h2>
        <form
          method="POST"
          onSubmit={(e) => {
            e.preventDefault();
            const cookies = new Cookies();
            cookies.set(consts.SiteReadCookie, password, {
              path: "/",
            });
            window.location.href = redirectPath ?? "/";
          }}>
          <label htmlFor="loginpassword">
            <span>Password</span>
          </label>
          <input
            id="loginpassword"
            type="text"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value.toLowerCase())}></input>
          <Button type="submit">Login</Button>
        </form>
      </div>
    </div>
  );
};
