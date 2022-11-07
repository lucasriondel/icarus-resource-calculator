import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Image from "next/image";
import { useState } from "react";
import { ResourceWithAmount } from "../data/Decomposer";
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
  /* margin-right: 16px; */
`;

const HorizontalLine = styled.div`
  border-bottom: 1px solid #a1a29d;
  height: 1px;
  width: 20px;
`;

interface PathProps {
  path: ResourceWithAmount;
  isExpandedPath: boolean;
}

export const Path = ({ path, isExpandedPath }: PathProps) => {
  const [expanded, setExpanded] = useState(false);

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
          <Image src={path.imageUrl} alt={path.name} width={30} height={30} />
          {path.name} * {path.amount}
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
