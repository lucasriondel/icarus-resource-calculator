import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { SearchBar } from "../components/SearchBar";
import { DecomposerOptions } from "../data/Decomposer";
import { useDecomposer } from "../hooks/useDecomposer";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const [craftId, setCraftId] = useState<string>();
  const [amount, setAmount] = useState(1);

  const [filters, setFilters] = useState<DecomposerOptions>({
    hideBenchs: false,
  });

  const decomposition = useDecomposer(craftId, amount, filters);

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
          value={{ craftId, amount, filters }}
          onChange={(craftId, amount, filters) => {
            setCraftId(craftId);
            setAmount(amount);
            setFilters(filters);
          }}
        />

        <div className={styles.row}>
          {!filters.hideBenchs && (
            <div className={styles["row-item"]}>
              <h1>Benchs</h1>

              <ul>
                {decomposition.benchs.map((bench) => (
                  <li key={bench.id}>{bench.name}</li>
                ))}
              </ul>
            </div>
          )}

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
