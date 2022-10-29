import { useMemo } from "react";
import { craftables } from "../data/craftables";
import { Decomposer, Decomposition } from "../data/Decomposer";

export function useDecomposer(craftId: string | undefined, amount: number) {
  return useMemo<Decomposition>(() => {
    const decomposer = new Decomposer();

    decomposer.decomposeResource(
      craftables.find((r) => r.id === craftId),
      amount
    );

    return decomposer.result();
  }, [craftId, amount]);
}
