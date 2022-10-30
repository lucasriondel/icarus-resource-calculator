import { useMemo } from "react";
import { Decomposer } from "../data/Decomposer";
import { getResourceFromResourceId } from "../data/helper";

export function useDecomposer(craftId: string | undefined, amount: number) {
  return useMemo(() => {
    const decomposer = new Decomposer();

    return craftId
      ? decomposer.mergeDuplicates(
          decomposer.getResourceList(getResourceFromResourceId(craftId), amount)
        )
      : [];
  }, [craftId, amount]);
}
