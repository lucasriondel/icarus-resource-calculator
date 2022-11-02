import { useMemo } from "react";
import { Decomposer, Option, ResourceWithAmount } from "../data/Decomposer";
import { getResourceFromResourceId } from "../data/helper";
import { CraftList } from "../pages";

export function useDecomposer(craftList: CraftList) {
  return useMemo(() => {
    const decomposer = new Decomposer();

    return decomposer.mergeDuplicates(
      craftList.reduce((acc, { craftId, amount }) => {
        acc.push(
          ...decomposer.getResourceList(
            getResourceFromResourceId(craftId),
            amount
          )
        );
        return acc;
      }, [] as Array<ResourceWithAmount | Option>)
    );
  }, [craftList]);
}
