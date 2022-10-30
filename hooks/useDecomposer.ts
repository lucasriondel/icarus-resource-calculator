import { useMemo } from "react";
import { Decomposer, Decomposition } from "../data/Decomposer";
import { getResourceFromResourceId } from "../data/helper";

export function useDecomposer(craftId: string | undefined, amount: number) {
  return useMemo<Decomposition>(() => {
    const decomposer = new Decomposer();

    if (craftId) {
      decomposer.decomposeCraftable(getResourceFromResourceId(craftId), amount);
    }

    return decomposer.result();
  }, [craftId, amount]);
}
