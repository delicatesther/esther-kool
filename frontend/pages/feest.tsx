import React from "react";
import { useRouter } from "next/router";
import { Login } from "@enk/components/Login";
import classNames from "classnames/bind";
import style from "../styles/pageStyles/feest.module.scss";
import Image from "next/image";
import { useWindowSize } from "@enk/utils";
import Confetti from "react-confetti";
import { Layout } from "@enk/components/Layout";
import Head from "next/head";

const cx = classNames.bind(style);
export const FeestPage = ({ hasReadPermission }) => {
  const router = useRouter();
  let { windowWidth: width, windowWidth: height } = useWindowSize();

  if (!hasReadPermission) {
    return (
      <Layout>
        <Login redirectPath={router.asPath} />
      </Layout>
    );
  }
  return (
    <>
      <Head>Inhaalfeest Steenkool</Head>
      <Confetti width={width} height={height} />
      <Layout>
        <article className={cx("row", ["feest"])}>
          <header>
            <h1>Inhaalfeest Steenkool</h1>
            <p>Op 16 juli 2022 zijn wij 19 maanden getrouwd. Dat vier je maar één keer!</p>
          </header>
          <div className={style.trouwFoto}>
            <Image src="/images/trouwfoto.jpeg" layout="fill" priority />
          </div>
          <div className={style.lijst}>
            <h2>TL;DR</h2>
            <dl>
              <dt>Waar?</dt>
              <dd>Jacobsvicarie 13, Culemborg</dd>
              <dt>Hoe laat?</dt>
              <dd>Vanaf 17:00</dd>
              <dt>Moet ik wat meenemen?</dt>
              <dd>
                Als je ons wat cadeau wil doen, waarderen we een bijdrage voor de kinderkamer. Voor eten en drinken
                wordt gezorgd!
              </dd>
              <dt>Is m&apos;n baby welkom?</dt>
              <dd>Hangt van de baby af. Meestal wel.</dd>
            </dl>
          </div>
          <div className={style.intro}>
            <p>
              Op 16 december 2020 trouwden wij, een dag nadat premier Rutte een lockdown aankondigde. Hierdoor kon ons
              geplande etentje met vrienden en familie niet doorgaan. Graag nodigen we jullie alsnog uit om een hapje te
              komen eten en ons huwelijk met ons te vieren.
            </p>
            <p>
              Oh ja! In de tussentijd hebben we ook een huis gekocht en ben ik (Esther) met kind geschopt, dus wellicht
              kunnen we dat ook meteen even vieren.
            </p>
          </div>
        </article>
      </Layout>
    </>
  );
};

export default FeestPage;
