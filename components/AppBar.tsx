import styled from "@emotion/styled";
import Image from "next/image";
import Link from "next/link";
import { version } from "../package.json";

const MainContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Links = styled.div`
  display: flex;
  gap: 16px;
`;

interface AppBarProps {
  onLogoClick: () => void;
}

export const AppBar = ({ onLogoClick }: AppBarProps) => {
  return (
    <MainContainer>
      <h1>
        <Image
          width={40}
          height={40}
          src={require("../public/favicon.png")}
          alt="Icarus logo"
          onClick={onLogoClick}
        />
        Icarus Resource Calculator v{version}
      </h1>

      <Links>
        <Link
          target="_blank"
          href="https://github.com/lucasriondel/icarus-resource-calculator"
        >
          Github
        </Link>

        <Link
          target="_blank"
          href="https://github.com/lucasriondel/icarus-resource-calculator/issues/new/choose"
        >
          Bug Report
        </Link>
      </Links>
    </MainContainer>
  );
};
