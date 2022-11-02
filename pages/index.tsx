import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { SearchBar } from "../components/SearchBar";
import { useDecomposer } from "../hooks/useDecomposer";
import styles from "../styles/Home.module.css";

import { AppBar } from "../components/AppBar";
import { Page } from "../components/Page";
import { ResourceList } from "../components/ResourceList";
import { Section } from "../components/Section";

const Home: NextPage = () => {
  const [craftId, setCraftId] = useState<string>();
  const [amount, setAmount] = useState(1);

  const decomposition = useDecomposer(craftId, isNaN(amount) ? 0 : amount);

  return (
    <Page className={styles.container}>
      <Head>
        <title>Icarus Resource Calculator</title>
        <meta
          name="description"
          content="Icarus resource calculator helper for your propescts !"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <div>
        <AppBar
          onLogoClick={() => {
            alert("log printed in console for better debugging");
            console.log({ craftId, amount, decomposition });
            console.log(
              "^^^ right-click > copy object and then paste it to me ^^^"
            );
          }}
        />

        <SearchBar
          value={{ craftId, amount }}
          onChange={(craftId, amount) => {
            setCraftId(craftId);
            setAmount(amount);
          }}
        />

        <Section title="Resources">
          <ResourceList resources={decomposition} />
        </Section>
      </div>
    </Page>
  );
};

export default Home;
