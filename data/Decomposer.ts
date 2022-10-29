import { Craftable } from "./craftables";
import { getResourceFromResourceId } from "./helper";

interface ResourceWithAmount extends Craftable {
  amount: number;
}

export type Decomposition = ReturnType<Decomposer["result"]>;

export class Decomposer {
  private resources: ResourceWithAmount[];

  constructor() {
    this.resources = [];
  }

  decomposeResource(resource: Craftable | undefined, amount: number) {
    if (!resource) return;

    console.log({ resource });

    if (resource.craft) {
      for (const resourceChild of resource.craft) {
        this.addResource(
          getResourceFromResourceId(resourceChild.id),
          resourceChild.amount * amount
        );
      }
    }
  }

  addResource(resource: Craftable, amount: number) {
    console.log(this.resources, resource);
    const existingResourceIndex = this.resources.findIndex(
      (r) => r.id === resource.id
    );

    if (existingResourceIndex !== -1) {
      this.resources[existingResourceIndex].amount += amount;
    } else {
      this.resources.push({ ...resource, amount });
    }
  }

  result() {
    return {
      resources: this.resources,
    };
  }
}
