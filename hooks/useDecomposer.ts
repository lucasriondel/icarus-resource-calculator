import { useMemo } from "react";
import { Decomposer } from "../data/Decomposer";
import { resources } from "../data/resources";
import { tools } from "../data/tools";

interface DecomposerResult {
  resources: any[];
  tools: any[];
  benchs: any[];
}

export function useDecomposer(craftId: string | undefined, amount: number) {
  return useMemo<ReturnType<Decomposer["result"]>>(() => {
    const decomposer = new Decomposer();

    const resource = resources.find((r) => r.id === craftId);
    const tool = tools.find((t) => t.id === craftId);

    if (!resource && !tool) {
      return decomposer.result();
    }

    decomposer.decomposeTool(tool, amount);
    decomposer.decomposeResource(resource, amount);

    return decomposer.result();
  }, [craftId, amount]);
}
