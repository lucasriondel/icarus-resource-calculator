import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { SearchBar } from "../components/SearchBar";
import { useDecomposer } from "../hooks/useDecomposer";

import styled from "@emotion/styled";
import { AppBar } from "../components/AppBar";
import { Page } from "../components/Page";
import { ResourceList } from "../components/ResourceList";
import { Section } from "../components/Section";
import { SelectedCraftable } from "../components/SelectedCraftable";
import { getResourceFromResourceId } from "../data/helper";

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const CraftList = styled.div`
  display: flex;
  gap: 16px;
  overflow-x: scroll;

  /* width */
  ::-webkit-scrollbar {
    width: 10px;
    height: 4px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: transparent;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #5c84a4;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #13192a;
  }
  padding-bottom: 8px;
`;

export type CraftList = Array<{ craftId: string; amount: number }>;

const Home: NextPage = () => {
  // const [craftList, setCraftList] = useState<CraftList>([]);
  const [craftList, setCraftList] = useState<CraftList>([
    {
      craftId: "electronics",
      amount: 6,
    },
    {
      craftId: "hunting-rifle",
      amount: 4,
    },
    {
      craftId: "wood-beam",
      amount: 4,
    },
    {
      craftId: "wood-bed",
      amount: 4,
    },
    {
      craftId: "stew",
      amount: 4,
    },
    {
      craftId: "sandworm-bow",
      amount: 4,
    },
    {
      craftId: "oxidizer",
      amount: 4,
    },
  ]);

  const decomposition = useDecomposer(craftList);

  console.log({ craftList, decomposition });

  return (
    <Page>
      <Head>
        <title>Icarus Resource Calculator</title>
        <meta
          name="description"
          content="Icarus resource calculator helper for your propescts !"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <AppBar
        onLogoClick={() => {
          alert("log printed in console for better debugging");
          console.log({ craftList, decomposition });
          console.log(
            "^^^ right-click > copy object and then paste it to me ^^^"
          );
        }}
      />

      <Content>
        <SearchBar
          onAddToCraftList={(craftId, amount) => {
            setCraftList((_craftList) => {
              const craftList = [..._craftList];
              const craftIndex = craftList.findIndex(
                ({ craftId: _craftId }) => _craftId === craftId
              );
              if (craftIndex !== -1) {
                craftList[craftIndex].amount += amount;
              } else {
                craftList.push({ craftId, amount });
              }
              return craftList;
            });
          }}
        />

        {craftList.length > 0 && (
          <CraftList>
            {craftList.map(({ craftId, amount }, index) => (
              <SelectedCraftable
                key={craftId}
                craftable={getResourceFromResourceId(craftId)}
                amount={amount}
                onRemove={() => {
                  setCraftList((_craftList) => {
                    const craftList = [..._craftList];
                    craftList.splice(index, 1);
                    return craftList;
                  });
                }}
                onAmountChange={(newAmount) => {
                  setCraftList((value) => {
                    const newCraftList = [...value];
                    newCraftList[index].amount = newAmount;
                    return newCraftList;
                  });
                }}
              />
            ))}
          </CraftList>
        )}

        <Section title="Resources">
          <ResourceList resources={decomposition} />
        </Section>
      </Content>
    </Page>
  );
};

export default Home;
