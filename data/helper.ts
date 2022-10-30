import { Craftable, craftables } from ".";

export function getResourceFromResourceId(resourceId: string): Craftable {
  const categories = Object.keys(craftables);
  const search = categories.map((category) => {
    return craftables[category].find((resource) => resource.id === resourceId);
  });
  const resource = search.find((r) => !!r);
  if (!resource) {
    throw new Error(`Resource with id ${resourceId} not found`);
  }
  return resource;
}

export const kebabCasify = (string: string) =>
  string
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase();
