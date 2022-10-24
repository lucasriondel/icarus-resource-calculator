import { useMemo } from "react";
import { Decomposer } from "../data/Decomposer";
import { getBenchFromBenchId, getResourceFromResourceId } from "../data/helper";
import { resources } from "../data/resources";

interface DecomposerResult {
  resources: any[];
  tools: any[];
  benchs: any[];
}

export function useDecomposer(craftId: string | undefined, amount: number) {
  return useMemo<ReturnType<Decomposer["result"]>>(() => {
    const decomposer = new Decomposer();

    const resource = resources.find((r) => r.id === craftId);

    if (!resource) {
      return decomposer.result();
    }

    if (resource.createdWith) {
      for (const bench of resource.createdWith) {
        decomposer.addBench(getBenchFromBenchId(bench.benchId));
      }
    }

    if (resource.createdFrom) {
      for (const resourceChild of resource.createdFrom) {
        decomposer.addResource(
          getResourceFromResourceId(resourceChild.resourceId),
          resourceChild.amount * amount
        );
      }
    }

    return decomposer.result();
  }, [craftId, amount]);
}
