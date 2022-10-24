import { Bench } from "./benchs";
import { getResourceFromResourceId } from "./helper";
import { Resource } from "./resources";

interface ResourceWithAmount extends Resource {
  amount: number;
}

export class Decomposer {
  private resources: ResourceWithAmount[];
  private benchs: Bench[];

  constructor() {
    this.resources = [];
    this.benchs = [];
  }

  addBench(bench: Bench) {
    this.benchs.push(bench);

    for (const resource of bench.createdFrom) {
      this.addResource(
        getResourceFromResourceId(resource.resourceId),
        resource.amount
      );
    }
  }

  addResource(resource: Resource, amount: number) {
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
      benchs: this.benchs,
    };
  }
}
