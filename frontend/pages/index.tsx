import { Avatar } from "@enk/components/Avatar/Avatar";
import { BusinessCard } from "@enk/components/BusinessCard/BusinessCard";
import Head from "next/head";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Esther Kool.com</title>
        <meta name="description" content="Personal website to Esther Kool" />
      </Head>
      <BusinessCard src="/images/me.jpg" size="large" />
    </div>
  );
}
