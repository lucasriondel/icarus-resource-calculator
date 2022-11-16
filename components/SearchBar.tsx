import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Combobox } from "@headlessui/react";
import Image from "next/image";
import { Fragment, useMemo, useRef, useState } from "react";
import { Craftable } from "../data";
import { craftablesToFlatArray } from "../data/helper";

import styles from "/styles/SearchBar.module.css";

const Choice = styled.div<{ active: boolean; selected: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;

  padding: 8px;

  ${({ active }) =>
    active &&
    css`
      background-color: #1d2017;
    `}
`;

interface SearchBarProps {
  onAddToCraftList: (craftId: string) => void;
}

export function SearchBar({ onAddToCraftList }: SearchBarProps) {
  const [craftable, setCraftable] = useState<any>();
  const [query, setQuery] = useState("");

  const choices = useMemo(
    () =>
      craftablesToFlatArray(true)
        .filter((resource) => !!resource.craft)
        .sort((a, b) => a.name.localeCompare(b.name)),
    []
  );

  const formatResult = (
    item: Craftable,
    active: boolean,
    selected: boolean
  ) => {
    return (
      <Choice active={active} selected={selected}>
        <Image
          src={item.imageUrl || "/images/placeholder.png"}
          width={30}
          height={30}
          alt={item.name}
        />
        <span>{item.name}</span>
      </Choice>
    );
  };

  const filteredChoices =
    query === ""
      ? choices.slice(0, 10)
      : choices
          .filter(({ name }) => {
            return name.toLowerCase().includes(query.toLowerCase());
          })
          .slice(0, 10);

  const inputRef = useRef<HTMLInputElement>(null);

  const shouldNextOnChangeCallBeIgnored = useRef(false);

  return (
    <div>
      <Combobox
        value={craftable}
        by="id"
        onChange={(craftable) => {
          console.log(craftable);
          onAddToCraftList(craftable.id);
          setCraftable(undefined);
          shouldNextOnChangeCallBeIgnored.current = true;
        }}
      >
        <Combobox.Input<"input", Craftable | undefined>
          autoComplete="off"
          ref={inputRef}
          placeholder="Search for a craftable item"
          className={styles.input}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          displayValue={(craftable) => craftable?.name ?? ""}
        />
        <Combobox.Options className={styles.options}>
          {filteredChoices.map((craftable) => (
            <Combobox.Option key={craftable.id} value={craftable} as={Fragment}>
              {({ active, selected }) =>
                formatResult(craftable, active, selected)
              }
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Combobox>
    </div>
  );
}
