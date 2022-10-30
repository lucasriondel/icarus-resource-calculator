import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { SearchBar } from "../components/SearchBar";
import { Option, ResourceWithAmount } from "../data/Decomposer";
import { useDecomposer } from "../hooks/useDecomposer";
import styles from "../styles/Home.module.css";

const ResourceList: React.FC<{
  resources: (ResourceWithAmount | Option)[];
}> = ({ resources }) => (
  <ul>
    {resources.map((resource, index) =>
      resource.hasOwnProperty("amount") ? (
        <li key={index}>
          {(resource as ResourceWithAmount).amount}{" "}
          {(resource as ResourceWithAmount).name}
        </li>
      ) : (
        <div className={styles.row}>
          {(resource as Option).options.map((option, index) => (
            <ResourceList key={index} resources={option} />
          ))}
        </div>
      )
    )}
  </ul>
);

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

            <ResourceList resources={decomposition} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
