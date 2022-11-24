import styled from "@emotion/styled";
import { ReactNode } from "react";

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  padding: 0px 8px;
`;

const Title = styled.h3`
  color: #d2e4b2;
  margin: 0;
  margin-bottom: 4px;
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
  className?: string;
  actions?: ReactNode;
}

export const Section = ({
  title,
  actions,
  children,
  className,
}: SectionProps) => {
  return (
    <div className={className}>
      <TitleContainer>
        <Title>{title}</Title>

        {actions}
      </TitleContainer>
      <SectionBorderTop />

      <SectionContent>{children}</SectionContent>

      <SectionBorderBottom />
    </div>
  );
};
