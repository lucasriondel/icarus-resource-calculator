import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { resources } from "../data/resources";
import { useDecomposer } from "../hooks/useDecomposer";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const [craftId, setCraftId] = useState<string>();
  const [amount, setAmount] = useState(1);

  const decomposition = useDecomposer(craftId, amount);
  console.log({ craftId, amount, decomposition });

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
              .filter((resource) => !!resource.hasOwnProperty("createdFrom"))
              .map((resource) => (
                <option key={resource.id} value={resource.id}>
                  {resource.name}
                </option>
              ))}
          </select>
          *
          <input
            type="number"
            id="amount-craft"
            value={amount}
            onChange={(event) => setAmount(parseInt(event.currentTarget.value))}
          />
        </div>

        <div>
          <div>
            <h1>Resources</h1>

            {decomposition.resources.map((resource) => (
              <div key={resource.id}>
                {resource.name} : {resource.amount}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
