import { Avatar } from "@enk/components/Avatar/Avatar";
import { BusinessCard } from "@enk/components/BusinessCard/BusinessCard";
import { Layout } from "@enk/components/Layout";
import { useTheme } from "next-themes";
import { UseThemeProps } from "next-themes/dist/types";
import Head from "next/head";
import Image from "next/image";

export default function Home() {
  const theme: UseThemeProps = useTheme();
  console.log(theme.theme);
  const isLight = theme.theme === "light";
  return (
    <div>
      <Head>
        <title>Esther Kool.com</title>
        <meta name="description" content="Personal website to Esther Kool" />
      </Head>
      <Layout>
        <BusinessCard src="/images/me.jpg" size="large" />
        {/* <Image
          src={isLight ? "/me-light.png" : "/dark-mode-esther.png"}
          alt="Esther"
          width={600}
          height={isLight ? 484 : 443}
        /> */}
      </Layout>
    </div>
  );
}
