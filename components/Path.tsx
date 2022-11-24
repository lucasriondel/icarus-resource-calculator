import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Image from "next/image";
import { useState } from "react";
import { ResourceWithAmount } from "../data/Decomposer";
import { getResourceFromResourceId } from "../data/helper";
import { Button } from "./Button";

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const RowWithGap = styled(Row)`
  gap: 8px;
`;

const ExpandButton = styled(Button)`
  height: 22px;
  width: 22px;
  padding: 5px 1px 1px 2px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Column = styled.div<{ withMargin?: boolean }>`
  display: flex;
  flex-direction: column;
  ${({ withMargin }) =>
    withMargin &&
    css`
      margin-left: 22px;
    `}
`;

const Border = styled.div<{ expandedMargin: boolean; short: boolean }>`
  width: 1px;
  ${({ short }) =>
    short &&
    css`
      height: 15px;
    `}
  margin-left: ${({ expandedMargin }) => (expandedMargin ? "8px" : "11px")};
  border-left: 1px solid #a1a29d;
`;

const HorizontalLine = styled.div`
  border-bottom: 1px solid #a1a29d;
  height: 1px;
  width: 20px;
`;

const Bench = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 0px 4px;
  border: 1px solid #d2e4b2;
  color: #d2e4b2;
`;

interface PathProps {
  path: ResourceWithAmount;
  isExpandedPath: boolean;
}

export const Path = ({ path, isExpandedPath }: PathProps) => {
  const [expanded, setExpanded] = useState(false);

  const bench = path.bench ? getResourceFromResourceId(path.bench) : undefined;

  return (
    <div>
      <Row>
        {isExpandedPath && <HorizontalLine />}
        <RowWithGap>
          {path.craft.length > 0 && (
            <ExpandButton onClick={() => setExpanded((v) => !v)}>
              {expanded ? "-" : "+"}
            </ExpandButton>
          )}
          <Image
            src={path.imageUrl || "/images/placeholder.png"}
            alt={path.name}
            width={30}
            height={30}
          />
          {path.name} * {path.amount}
          {bench && (
            <Bench>
              <Image
                src={bench.imageUrl || "/images/placeholder.png"}
                alt={bench.name}
                width={15}
                height={15}
              />{" "}
              {bench.name}
            </Bench>
          )}
        </RowWithGap>
      </Row>

      {expanded && (
        <Column withMargin={isExpandedPath}>
          {path.craft.map((craft, index) => (
            <div key={`${path.name}-${craft.id}`} style={{ display: "flex" }}>
              <Border
                expandedMargin={isExpandedPath}
                short={index === path.craft.length - 1}
              />
              <Column>
                <Path path={craft} isExpandedPath />
              </Column>
            </div>
          ))}
        </Column>
      )}
    </div>
  );
};
