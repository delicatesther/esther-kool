import React from "react";
import { useRouter } from "next/router";
import { Login } from "@enk/components/Login";

export default function feestPage({ hasReadPermission }) {
  const router = useRouter();

  if (!hasReadPermission) {
    return <Login redirectPath={router.asPath} />;
  }
  return <div>feest</div>;
}
