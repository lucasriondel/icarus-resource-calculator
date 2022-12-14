import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { devGothic } from "../assets/fonts";
import { AppBar } from "../components/AppBar";
import { Page } from "../components/Page";
import { Path } from "../components/Path";
import { ResourceList } from "../components/ResourceList";
import { SearchBar } from "../components/SearchBar";
import { Section } from "../components/Section";
import { SelectedCraftable } from "../components/SelectedCraftable";
import { getResourceFromResourceId } from "../data/helper";
import { useDecomposer } from "../hooks/useDecomposer";

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-bottom: 2rem;
`;

const CraftList = styled.div`
  display: flex;
  gap: 16px;
  overflow-x: scroll;

  ::-webkit-scrollbar {
    width: 10px;
    height: 4px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: #5c84a4;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #13192a;
  }
  padding-bottom: 8px;
`;

const DetailedPathSection = styled(Section)`
  flex: 1;
`;

const BenchButton = styled.button<{ active: boolean }>`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 0px 4px;
  font-family: ${devGothic.style.fontFamily};
  cursor: pointer;

  ${({ active }) =>
    active
      ? css`
          border: 1px solid #d2e4b2;
          color: black;
          background-color: #d2e4b2;
        `
      : css`
          border: 1px solid #a1a29d;
          color: #d2e4b2;
          background-color: transparent;
        `}

  :hover {
    border: 1px solid #d2e4b2;
  }
`;

export type CraftList = Array<{ craftId: string; amount: number }>;

const Home: NextPage = () => {
  const [craftList, setCraftList] = useState<CraftList>([]);
  const [showBenches, setShowBenches] = useState(false);

  const { paths, resourceList, benchPaths } = useDecomposer(
    craftList,
    showBenches
  );

  console.log({ craftList, paths, resourceList, benchPaths });

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
          console.log({ craftList, paths, resourceList });
          console.log(
            "^^^ right-click > copy object and then paste it to me ^^^"
          );
        }}
      />

      <Content>
        <SearchBar
          onAddToCraftList={(craftId) => {
            setCraftList((_craftList) => {
              const craftList = [..._craftList];
              const craftIndex = craftList.findIndex(
                ({ craftId: _craftId }) => _craftId === craftId
              );
              if (craftIndex !== -1) {
                craftList[craftIndex].amount += 1;
              } else {
                craftList.push({ craftId, amount: 1 });
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

        <div style={{ display: "flex", gap: "32px" }}>
          <DetailedPathSection
            actions={
              <BenchButton
                active={showBenches}
                onClick={() => setShowBenches((v) => !v)}
              >
                Show benches
              </BenchButton>
            }
            title="Detailed path"
          >
            {paths.map((path) => (
              <Path key={path.id} path={path} isExpandedPath={false} />
            ))}
            {showBenches &&
              benchPaths.map((path) => (
                <Path key={path.id} path={path} isExpandedPath={false} />
              ))}
          </DetailedPathSection>

          <Section title="Resources list">
            <ResourceList resources={resourceList} />
          </Section>
        </div>
      </Content>
    </Page>
  );
};

export default Home;
