import { Bench } from "./benchs";
import { getBenchFromBenchId, getResourceFromResourceId } from "./helper";
import { Resource } from "./resources";
import { Tool } from "./tools";

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

  decomposeTool(tool: Tool | undefined, amount: number) {
    if (!tool) return;

    for (const resourceChild of tool.createdFrom) {
      this.addResource(
        getResourceFromResourceId(resourceChild.resourceId),
        resourceChild.amount * amount
      );
    }

    for (const bench of tool.createdWith) {
      this.addBench(getBenchFromBenchId(bench.benchId));
    }
  }

  decomposeResource(resource: Resource | undefined, amount: number) {
    if (!resource) return;

    if (resource.createdWith) {
      for (const bench of resource.createdWith) {
        this.addBench(getBenchFromBenchId(bench.benchId));
      }
    }

    if (resource.createdFrom) {
      for (const resourceChild of resource.createdFrom) {
        this.addResource(
          getResourceFromResourceId(resourceChild.resourceId),
          resourceChild.amount * amount
        );
      }
    }
  }

  decomposeBench(bench: Bench | undefined, amount: number) {
    if (!bench) return;

    for (const resourceChild of bench.createdFrom) {
      this.addResource(
        getResourceFromResourceId(resourceChild.resourceId),
        resourceChild.amount * amount
      );
    }

    if (bench.createdWith) {
      for (const benchChild of bench.createdWith) {
        this.addBench(getBenchFromBenchId(benchChild.benchId));
      }
    }
  }

  addBench(bench: Bench) {
    this.benchs.push(bench);

    for (const resource of bench.createdFrom) {
      this.addResource(
        getResourceFromResourceId(resource.resourceId),
        resource.amount
      );
    }

    if (bench.createdWith) {
      for (const benchChild of bench.createdWith) {
        this.addBench(getBenchFromBenchId(benchChild.benchId));
      }
    }
  }

  addResource(resource: Resource, amount: number) {
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
      benchs: this.benchs,
    };
  }
}
