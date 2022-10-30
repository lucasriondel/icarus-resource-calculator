import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { SearchBar } from "../components/SearchBar";
import { Option, ResourceWithAmount } from "../data/Decomposer";
import { useDecomposer } from "../hooks/useDecomposer";
import { version } from "../package.json";
import styles from "../styles/Home.module.css";

const ResourceList: React.FC<{
  resources: (ResourceWithAmount | Option)[];
}> = ({ resources }) => (
  <ul style={{ padding: 0 }}>
    {resources.map((resource, index) =>
      resource.hasOwnProperty("amount") ? (
        <li
          style={{ display: "flex", alignItems: "center", gap: "8px" }}
          key={index}
        >
          <Image
            src={(resource as ResourceWithAmount).imageUrl}
            alt={(resource as ResourceWithAmount).name}
            width={30}
            height={30}
          />
          {(resource as ResourceWithAmount).name} *{" "}
          {(resource as ResourceWithAmount).amount}
        </li>
      ) : (
        <div className={styles.row} style={{ gap: "8px", marginLeft: "16px" }}>
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
        <div
          className={styles.row}
          style={{ justifyContent: "space-between", alignItems: "center" }}
        >
          <h1>
            <Image
              width={40}
              height={40}
              src={require("../public/favicon.png")}
              alt="Icarus logo"
              onClick={() => {
                alert("log printed in console for better debugging");
                console.log({ craftId, amount, decomposition });
                console.log(
                  "^^^ right-click > copy object and then paste it to me ^^^"
                );
              }}
            />
            Icarus Resource Calculator v{version}
          </h1>

          <Link href="https://github.com/lucasriondel/icarus-resource-calculator">
            Github
          </Link>
        </div>

        <SearchBar
          value={{ craftId, amount }}
          onChange={(craftId, amount) => {
            setCraftId(craftId);
            setAmount(amount);
          }}
        />

        <div className={styles.row}>
          <div className={styles["row-item"]}>
            <h3>Resources</h3>

            <ResourceList resources={decomposition} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
