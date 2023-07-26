import { BusinessCard } from "@enk/components/BusinessCard/BusinessCard";
import { Experiences } from "@enk/components/Experiences";
import { Layout } from "@enk/components/Layout";
import Head from "next/head";

export default function Home() {

  return (
    <div>
      <Head>
        <title>Esther Kool.com</title>
        <meta name="description" content="Personal website to Esther Kool" />
      </Head>
      <Layout>
        <div className="row">
          <BusinessCard src="/images/me.jpg" size="large" />
        </div>
        <div className="row">
          <Experiences />
        </div>
      </Layout>
    </div>
  );
}
