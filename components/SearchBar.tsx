import styled from "@emotion/styled";
import Image from "next/image";
import { useMemo } from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { devGothic } from "../assets/fonts";
import { Craftable } from "../data";
import { craftablesToFlatArray } from "../data/helper";

const Row = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;

  & > div {
    width: 100%;

    & > .wrapper {
      font-family: ${devGothic.style.fontFamily};
      font-size: 1.25rem;
    }
  }
`;

const AmountInput = styled.input`
  font-family: ${devGothic.style.fontFamily};
  font-size: 1.25rem;
  border: 1px solid #a1a29d;
  background-color: #0e0e0e;
  color: #d2e4b2;
  padding: 0px 13px;
  width: 70px;

  &:focus {
    outline: none;
  }
`;

const Choice = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

interface SearchBarProps {
  value: {
    craftId: string | undefined;
    amount: number;
  };
  onChange: (craftId: string | undefined, amount: number) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  const onChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = parseInt(e.currentTarget.value);
    onChange(value.craftId, newAmount < 1 ? 1 : newAmount);
  };

  const choices = useMemo(
    () =>
      craftablesToFlatArray(true)
        .filter((resource) => !!resource.craft)
        .sort((a, b) => a.name.localeCompare(b.name)),
    []
  );

  const handleOnSelect = (item: Craftable) => {
    onChange(item.id, value.amount);
  };

  const handleOnFocus = () => {
    console.log("Focused");
  };

  const formatResult = (item: Craftable) => {
    return (
      <Choice>
        <Image src={item.imageUrl} width={30} height={30} alt={item.name} />
        <span>{item.name}</span>
      </Choice>
    );
  };

  return (
    <div>
      <Row>
        <ReactSearchAutocomplete
          placeholder="Please select a craft"
          items={choices}
          onSelect={handleOnSelect}
          onFocus={handleOnFocus}
          autoFocus
          showIcon={false}
          formatResult={formatResult}
          styling={{
            borderRadius: "none",
            border: "1px solid #A1A29D",
            backgroundColor: "#0E0E0E",
            color: "#D2E4B2",
            lineColor: "#D2E4B2",
            hoverBackgroundColor: "#1D2017",
            zIndex: 100,
          }}
        />
        <AmountInput
          type="number"
          id="amount-craft"
          value={value.amount}
          onChange={onChangeAmount}
        />
      </Row>
    </div>
  );
}
