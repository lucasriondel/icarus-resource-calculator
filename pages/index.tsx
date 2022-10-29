import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { SearchBar } from "../components/SearchBar";
import { useDecomposer } from "../hooks/useDecomposer";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const [craftId, setCraftId] = useState<string>();
  const [amount, setAmount] = useState(1);

  const decomposition = useDecomposer(craftId, amount);

  return (
    <div className={styles.container}>
      <Head>
        <title>Icarus Resource Calculator</title>
        <meta
          name="description"
          content="Icarus resource calculator helper for your propescts !"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <div>
        <SearchBar
          value={{ craftId, amount }}
          onChange={(craftId, amount) => {
            setCraftId(craftId);
            setAmount(amount);
          }}
        />

        <div className={styles.row}>
          <div className={styles["row-item"]}>
            <h1>Resources</h1>

            <ul>
              {decomposition.resources.map((resource) => (
                <li key={resource.id}>
                  {resource.name} : {resource.amount}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
