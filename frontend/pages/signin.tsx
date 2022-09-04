import Link from "next/link";
import { SignIn } from "@enk/components/User";
import { Layout } from "@enk/components/Layout";
import { useUser } from "@enk/utils";

export default function SignInPage(props) {
  const me = useUser();
  if (!me) {
    return (
      <Layout>
        <SignIn />
      </Layout>
    );
  } else {
    return (
      <Layout>
        <h2 style={{ gridColumn: "2 / 3" }}>Hi {me.name}!</h2>
      </Layout>
    );
  }
}
