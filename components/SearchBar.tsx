import { benchs } from "../data/benchs";
import { DecomposerOptions } from "../data/Decomposer";
import { resources } from "../data/resources";
import { tools } from "../data/tools";

interface SearchBarProps {
  value: {
    craftId: string | undefined;
    amount: number;
    filters: DecomposerOptions;
  };
  onChange: (
    craftId: string | undefined,
    amount: number,
    filters: DecomposerOptions
  ) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  const onChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = parseInt(e.currentTarget.value);
    onChange(value.craftId, newAmount < 1 ? 1 : newAmount, value.filters);
  };

  return (
    <header>
      <div>
        Craft:{" "}
        <select
          name="craft"
          id="craft-select"
          value={value.craftId}
          onChange={(event) =>
            onChange(event.currentTarget.value, value.amount, value.filters)
          }
        >
          <option value="">--Please choose a craft--</option>
          {resources
            .filter((resource) => !!resource.createdFrom)
            .map((resource) => (
              <option key={resource.id} value={resource.id}>
                {resource.name}
              </option>
            ))}

          {tools.map((tool) => (
            <option key={tool.id} value={tool.id}>
              {tool.name}
            </option>
          ))}

          {benchs.map((bench) => (
            <option key={bench.id} value={bench.id}>
              {bench.name}
            </option>
          ))}
        </select>
        *
        <input
          type="number"
          id="amount-craft"
          value={value.amount}
          onChange={onChangeAmount}
        />
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            id="hide-benchs"
            checked={value.filters.hideBenchs}
            onChange={() =>
              onChange(value.craftId, value.amount, {
                ...value.filters,
                hideBenchs: !value.filters.hideBenchs,
              })
            }
          />
          Ignore benchs
        </label>
      </div>
    </header>
  );
}
