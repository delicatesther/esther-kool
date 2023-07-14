import React from "react";
import { useMutation } from "@apollo/client";
import { CURRENT_USER_QUERY, SIGNOUT_MUTATION } from "@enk/lib";
import { Button } from "@enk/components/Button";

export const SignOut = ({size}) => {
  const [endSession, { data, loading, error }] = useMutation(SIGNOUT_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  function handleSignOut(e) {
    e.preventDefault();
    endSession();
  }

  return (
    <Button type="button" onClick={handleSignOut} text="Sign out" size={size} />
  );
};

export default SignOut;
