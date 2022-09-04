import React from "react";
import { useUser } from "@enk/utils";
import { SignIn } from "./";

export const PleaseSignIn = ({ children }) => {
  const me = useUser();
  if (!me) return <SignIn />;
  return children;
};
