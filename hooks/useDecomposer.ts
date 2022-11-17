import { useMemo } from "react";
import { Decomposer, ResourceWithAmount } from "../data/Decomposer";
import { getResourceFromResourceId } from "../data/helper";
import { CraftList } from "../pages";

export function useDecomposer(craftList: CraftList, showBenches: boolean) {
  return useMemo(() => {
    const paths = craftList.reduce((paths, { amount, craftId }) => {
      const decomposer = new Decomposer();
      paths.push(
        decomposer.getPathToResource(getResourceFromResourceId(craftId), amount)
      );
      return paths;
    }, [] as ResourceWithAmount[]);

    const benchIds = paths.reduce((acc, path) => {
      const decomposer = new Decomposer();
      decomposer.getBenchsFromPath(path).forEach((b) => acc.add(b));
      return acc;
    }, new Set<string>());
    // console.log("benchs", benchIds);

    const benchPaths = Array.from(benchIds).reduce((paths, craftId) => {
      const decomposer = new Decomposer();
      paths.push(
        decomposer.getPathToResource(getResourceFromResourceId(craftId), 1)
      );
      return paths;
    }, [] as ResourceWithAmount[]);

    const decomposer = new Decomposer();
    const resourceList = (
      showBenches ? [...paths, ...benchPaths] : paths
    ).reduce((acc, path) => {
      acc.push(...decomposer.getResourceListFromPath(path));
      return acc;
    }, [] as ResourceWithAmount[]);

    return {
      paths,
      resourceList: decomposer.mergeDuplicates(resourceList),
      benchPaths,
    };
  }, [craftList, showBenches]);
}
