import { Craftable, craftables } from "./craftables";

export function getResourceFromResourceId(resourceId: string): Craftable {
  const resource = craftables.find((r) => r.id === resourceId);
  if (!resource) {
    throw new Error(`Resource with id ${resourceId} not found`);
  }

  console.log({ resourceId, resource });
  return resource;
}

export const kebabCasify = (string: string) =>
  string
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase();
