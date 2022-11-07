import styled from "@emotion/styled";
import Image from "next/image";
import { useState } from "react";
import { ResourceWithAmount } from "../data/Decomposer";
import { Button } from "./Button";

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
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

const Margin = styled.div`
  margin-left: 32px;
`;

interface PathProps {
  path: ResourceWithAmount;
}

export const Path = ({ path }: PathProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      <Row>
        {path.craft.length > 0 && (
          <ExpandButton onClick={() => setExpanded((v) => !v)}>
            {expanded ? "-" : "+"}
          </ExpandButton>
        )}
        <Image src={path.imageUrl} alt={path.name} width={30} height={30} />
        {path.name} * {path.amount}
      </Row>

      {expanded && (
        <Margin>
          {path.craft.map((craft) => (
            <Path key={craft.id} path={craft} />
          ))}
        </Margin>
      )}
    </div>
  );
};
