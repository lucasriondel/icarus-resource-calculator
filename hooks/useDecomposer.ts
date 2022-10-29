import { useMemo } from "react";
import { benchs } from "../data/benchs";
import { craftables } from "../data/craftables";
import {
  Decomposer,
  DecomposerOptions,
  Decomposition,
} from "../data/Decomposer";
import { tools } from "../data/tools";

export function useDecomposer(
  craftId: string | undefined,
  amount: number,
  options: DecomposerOptions = {}
) {
  return useMemo<Decomposition>(() => {
    const decomposer = new Decomposer(options);

    decomposer.decomposeTool(
      tools.find((t) => t.id === craftId),
      amount
    );
    decomposer.decomposeResource(
      craftables.find((r) => r.id === craftId),
      amount
    );
    decomposer.decomposeBench(
      benchs.find((b) => b.id === craftId),
      amount
    );

    return decomposer.result();
  }, [craftId, amount, options]);
}
