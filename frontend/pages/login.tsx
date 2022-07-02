import Head from "next/head";
import Cookies from "universal-cookie";
import { Login } from "@enk/components/Login";
import { consts } from "@enk/lib";
import { Button } from "@enk/components/Button";
import { Layout } from "@enk/components/Layout";

export default function LoginPage({ hasReadPermission }) {
  if (hasReadPermission) {
    return (
      <>
        <Head>
          <title>Logout</title>
        </Head>
        <Layout>
          <Button
            onClick={(e) => {
              e.preventDefault();
              const cookies = new Cookies();
              cookies.remove(consts.SiteReadCookie, { path: "/" });
              window.location.href = "/login";
            }}>
            Logout
          </Button>
        </Layout>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Layout>
        <Login redirectPath="/" />
      </Layout>
    </>
  );
}
