import { useMemo } from "react";
import { Decomposer, ResourceWithAmount } from "../data/Decomposer";
import { getResourceFromResourceId } from "../data/helper";
import { CraftList } from "../pages";

export function useDecomposer(craftList: CraftList) {
  return useMemo(() => {
    const paths = craftList.reduce((paths, { amount, craftId }) => {
      const decomposer = new Decomposer();
      paths.push(
        decomposer.getPathToResource(getResourceFromResourceId(craftId), amount)
      );
      return paths;
    }, [] as ResourceWithAmount[]);

    const decomposer = new Decomposer();
    const resourceList = paths.reduce((acc, path) => {
      acc.push(...decomposer.getResourceListFromPath(path));
      return acc;
    }, [] as ResourceWithAmount[]);

    return { paths, resourceList: decomposer.mergeDuplicates(resourceList) };
  }, [craftList]);
}
