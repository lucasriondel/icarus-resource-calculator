import { useMemo } from "react";
import { craftablesToFlatArray } from "../data/helper";

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

  return (
    <header>
      <div>
        <select
          name="craft"
          id="craft-select"
          value={value.craftId}
          onChange={(event) =>
            onChange(event.currentTarget.value, value.amount)
          }
        >
          <option value="">--Please choose a craft--</option>
          {/* <option value={"composites"}>Composites</option> */}
          {choices.map((resource) => (
            <option key={resource.id} value={resource.id}>
              {resource.name}
            </option>
          ))}
        </select>
        {" x "}
        <input
          type="number"
          id="amount-craft"
          value={value.amount}
          onChange={onChangeAmount}
        />
      </div>
    </header>
  );
}
