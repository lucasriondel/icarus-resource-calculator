import { useMemo } from "react";
import { resources } from "../data/resources";

interface DecomposerResult {
  resources: any[];
  tools: any[];
  benchs: any[];
}

export function useDecomposer(craftId: string | undefined, amount: number) {
  return useMemo<DecomposerResult>(() => {
    const resource = resources.find((r) => r.id === craftId);

    if (!resource) {
      return {
        resources: [],
        tools: [],
        benchs: [],
      };
    }

    const total: DecomposerResult = {
      resources: [],
      tools: [],
      benchs: [],
    };

    total.resources = (resource.createdFrom ?? []).map(
      ({ resourceId, amount: resourceAmount }) => {
        const resource = resources.find((r) => r.id === resourceId);

        return {
          id: resource?.id,
          name: resource?.name,
          amount: resourceAmount * amount,
        };
      }
    );

    return total;
  }, [craftId, amount]);
}
