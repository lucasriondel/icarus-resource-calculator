import styled from "@emotion/styled";
import Image from "next/image";
import { useMemo } from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { Craftable } from "../data";
import { craftablesToFlatArray } from "../data/helper";

const Row = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;

  & > div {
    width: 100%;
  }
`;

const AmountInput = styled.input`
  border: 1px solid #a1a29d;
  background-color: #0e0e0e;
  color: #d2e4b2;
  padding: 0px 13px;
  width: 70px;

  &:focus {
    outline: none;
  }
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

  const handleOnSearch = (string: string, results: Craftable[]) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    console.log(string, results);
  };

  const handleOnHover = (result: Craftable) => {
    // the item hovered
    console.log(result);
  };

  const handleOnSelect = (item: Craftable) => {
    // the item selected
    console.log(item);
    onChange(item.id, value.amount);
  };

  const handleOnFocus = () => {
    console.log("Focused");
  };

  const formatResult = (item: Craftable) => {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <Image src={item.imageUrl} width={30} height={30} alt={item.name} />
        <span>{item.name}</span>
      </div>
    );
  };

  return (
    <header>
      <Row>
        <ReactSearchAutocomplete
          placeholder="Please select a craft"
          items={choices}
          onSearch={handleOnSearch}
          onHover={handleOnHover}
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
    </header>
  );
}
