import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { resources } from "../data/resources";
import { tools } from "../data/tools";
import { useDecomposer } from "../hooks/useDecomposer";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const [craftId, setCraftId] = useState<string>();
  const [amount, setAmount] = useState(1);

  const decomposition = useDecomposer(craftId, amount);
  console.log({ craftId, amount, decomposition });

  const onChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = parseInt(e.currentTarget.value);
    setAmount(newAmount < 1 ? 1 : newAmount);
  };

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
        <div>
          Craft:{" "}
          <select
            name="craft"
            id="craft-select"
            value={craftId}
            onChange={(event) => setCraftId(event.currentTarget.value)}
          >
            <option value="">--Please choose a craft--</option>
            {resources
              .filter((resource) => !!resource.createdFrom)
              .map((resource) => (
                <option key={resource.id} value={resource.id}>
                  {resource.name}
                </option>
              ))}

            {tools.map((tool) => (
              <option key={tool.id} value={tool.id}>
                {tool.name}
              </option>
            ))}
          </select>
          *
          <input
            type="number"
            id="amount-craft"
            value={amount}
            onChange={onChangeAmount}
          />
        </div>

        <div className={styles.row}>
          <div className={styles["row-item"]}>
            <h1>Benchs</h1>

            <ul>
              {decomposition.benchs.map((bench) => (
                <li key={bench.id}>{bench.name}</li>
              ))}
            </ul>
          </div>

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
