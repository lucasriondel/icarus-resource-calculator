import styled from "@emotion/styled";
import { ReactNode } from "react";

const Title = styled.h3`
  color: #d2e4b2;
  margin-bottom: 4px;
  margin-left: 8px;
`;

const SectionBorder = styled.div`
  width: 100%;
  border: 1px solid #a1a29d;
  height: 16px;
`;

const SectionBorderTop = styled(SectionBorder)`
  border-bottom: none;
`;

const SectionBorderBottom = styled(SectionBorder)`
  border-top: none;
`;

const SectionContent = styled.div`
  padding: 0px 32px;
`;

interface SectionProps {
  title: string;
  children: ReactNode;
}

export const Section = ({ title, children }: SectionProps) => {
  return (
    <div>
      <Title>{title}</Title>
      <SectionBorderTop />

      <SectionContent>{children}</SectionContent>

      <SectionBorderBottom />
    </div>
  );
};
