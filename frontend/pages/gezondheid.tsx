import { HealthDashboard } from "@enk/components/HealthDashboard";
import { SignIn } from "@enk/components/User";
import { Layout } from "@enk/components/Layout";
import { useUser } from "@enk/utils";

export default function GezondheidPage(props) {
  const me = useUser();
  if (!me)
    return (
      <Layout>
        <SignIn />
      </Layout>
    );
  return (
    <Layout>
      <HealthDashboard />
    </Layout>
  );
}
