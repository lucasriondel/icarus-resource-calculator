import styled from "@emotion/styled";
import Image from "next/image";
import { useMemo, useState } from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { devGothic } from "../assets/fonts";
import { Craftable } from "../data";
import { craftablesToFlatArray } from "../data/helper";

const MainContainer = styled.form`
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

  &:focus,
  &:hover {
    border: 1px solid #d2e4b2;
  }
`;

const Choice = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const AddButton = styled.button`
  padding: 0px 16px;
  font-family: ${devGothic.style.fontFamily};
  font-size: 1.25rem;

  border: 1px solid #a1a29d;
  color: #d2e4b2;
  background-color: #0e0e0e;

  &:hover {
    color: #0e0e0e;
    border: 1px solid #d2e4b2;
    background-color: #d2e4b2;
  }

  &:active {
    color: #d2e4b2;
    border: 1px solid #d2e4b2;
    background-color: #0e0e0e;
  }

  &:focus {
    color: #d2e4b2;
    border: 1px solid #d2e4b2;
    background-color: #0e0e0e;
  }
`;

interface SearchBarProps {
  onAddToCraftList: (craftId: string, amount: number) => void;
}

export function SearchBar({ onAddToCraftList }: SearchBarProps) {
  const [craftId, setCraftId] = useState<string>();
  const [amount, setAmount] = useState(1);

  const onChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = parseInt(e.currentTarget.value);
    setAmount(newAmount < 1 ? 1 : newAmount);
  };

  const choices = useMemo(
    () =>
      craftablesToFlatArray(true)
        .filter((resource) => !!resource.craft)
        .sort((a, b) => a.name.localeCompare(b.name)),
    []
  );

  const handleOnSelect = (item: Craftable) => {
    setCraftId(item.id);
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
    <MainContainer
      onSubmit={(e) => {
        e.preventDefault();
        console.log({ craftId, amount });
        if (craftId && !isNaN(amount) && amount > 0) {
          onAddToCraftList(craftId, amount);
        }
      }}
    >
      <ReactSearchAutocomplete
        placeholder="Please select a craft"
        items={choices}
        onSelect={handleOnSelect}
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
        value={amount}
        onChange={onChangeAmount}
      />
      <AddButton type="submit">Add</AddButton>
    </MainContainer>
  );
}
