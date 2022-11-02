import Image from "next/image";
import { Option, ResourceWithAmount } from "../data/Decomposer";

import styled from "@emotion/styled";

const Ul = styled.ul`
  padding: 0px;
  margin: 0px;
`;

const Li = styled.li`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const OptionContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-left: 16px;
`;

export const ResourceList: React.FC<{
  resources: (ResourceWithAmount | Option)[];
}> = ({ resources }) => (
  <Ul>
    {resources.map((resourceOrOption, index) => {
      if (resourceOrOption.hasOwnProperty("amount")) {
        const resource = resourceOrOption as ResourceWithAmount;

        return (
          <Li key={index}>
            <Image
              src={resource.imageUrl}
              alt={resource.name}
              width={30}
              height={30}
            />
            {resource.name} * {resource.amount}
          </Li>
        );
      } else {
        const optionLine = resourceOrOption as Option;

        return (
          <OptionContainer key={index}>
            {optionLine.options.map((option) => (
              <ResourceList key={option.join("-")} resources={option} />
            ))}
          </OptionContainer>
        );
      }
    })}
  </Ul>
);
