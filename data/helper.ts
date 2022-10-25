import { Bench, benchs } from "./benchs";
import { Resource, resources } from "./resources";

export function getResourceFromResourceId(resourceId: string): Resource {
  const resource = resources.find((r) => r.id === resourceId);
  if (!resource) {
    throw new Error(`Resource with id ${resourceId} not found`);
  }

  console.log({ resourceId, resource });
  return resource;
}

export function getBenchFromBenchId(benchId: string): Bench {
  const bench = benchs.find((b) => b.id === benchId);
  if (!bench) {
    throw new Error(`Bench with id ${benchId} not found`);
  }
  return bench;
}
