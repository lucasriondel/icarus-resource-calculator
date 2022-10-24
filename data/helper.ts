import { benchs } from "./benchs";
import { resources } from "./resources";

export function getResourceFromResourceId(resourceId: string): Resource {
  return resources.find((r) => r.id === resourceId);
}

export function getBenchFromBenchId(benchId: string): Bench {
  return benchs.find((b) => b.id === benchId);
}
