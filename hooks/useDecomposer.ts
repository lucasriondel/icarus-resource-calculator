import { useMemo } from "react";
import { benchs } from "../data/benchs";
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

    decomposer.decomposeTool(
      tools.find((t) => t.id === craftId),
      amount
    );
    decomposer.decomposeResource(
      resources.find((r) => r.id === craftId),
      amount
    );
    decomposer.decomposeBench(
      benchs.find((b) => b.id === craftId),
      amount
    );

    return decomposer.result();
  }, [craftId, amount]);
}
