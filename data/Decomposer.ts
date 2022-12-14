import { Craftable } from ".";
import { getResourceFromResourceId } from "./helper";

export interface Option {
  options: Array<ResourceWithAmount | Option>[];
}
export interface ResourceWithAmount extends Omit<Craftable, "variants"> {
  amount: number;
  craft: ResourceWithAmount[];
}

export class Decomposer {
  constructor() {}

  getPathToResource(
    craftable: Craftable,
    amount = 1,
    forcedVariants?: string[]
  ): ResourceWithAmount {
    const result = this.getPathToResourceRecursive(
      craftable,
      amount,
      forcedVariants
    );

    if (result.length !== 0) {
      return result[0];
    }
    throw new Error("Invalid result");
  }

  private getPathToResourceRecursive(
    craftable: Craftable,
    amount = 1,
    forcedVariants?: string[]
  ): any {
    const resources: Array<ResourceWithAmount> = [];

    if (craftable.craft !== undefined) {
      if (craftable.craft.length === 0) {
        resources.push({ ...craftable, craft: [], amount });
        return resources;
      } else {
        const craft = craftable.craft?.reduce((acc, craftItem) => {
          acc.push(
            ...this.getPathToResourceRecursive(
              getResourceFromResourceId(craftItem.id),
              craftable.quantityProduced !== undefined
                ? Math.ceil(
                    (amount * craftItem.amount) / craftable.quantityProduced
                  )
                : amount * craftItem.amount,
              forcedVariants
            )
          );
          return acc;
        }, [] as Array<ResourceWithAmount>);

        resources.push({
          ...craftable,
          craft,
          amount,
        });
        return resources;
      }
    } else if (craftable.variants !== undefined) {
      let forcedVariant: string | undefined = undefined;
      // find forced variant from params
      if (forcedVariants !== undefined) {
        forcedVariant = forcedVariants.find((variant) =>
          craftable.variants?.includes(variant)
        );
      }
      // apply default variant if forced variant is not found
      if (forcedVariant === undefined) {
        forcedVariant = craftable.variants[0];
      }

      const resource = getResourceFromResourceId(forcedVariant);

      resources.push({
        ...resource,
        craft: (resource.craft ?? []).reduce((acc, craftItem) => {
          acc.push(
            ...this.getPathToResourceRecursive(
              getResourceFromResourceId(craftItem.id),
              amount * craftItem.amount,
              forcedVariants
            )
          );
          return acc;
        }, [] as Array<ResourceWithAmount>),
        amount,
      });
      return resources;
    }

    debugger;
    return resources;
  }

  getBenchsFromPath(path: ResourceWithAmount): string[] {
    const benches: string[] = [];

    const getBenchsFromPathRecursive = (item: ResourceWithAmount) => {
      if (
        item.bench &&
        !benches.includes(item.bench) &&
        item.bench !== "character-crafting"
      ) {
        benches.push(item.bench);
        getBenchsFromPathRecursive(
          getResourceFromResourceId(item.bench) as ResourceWithAmount
        );
      }
      if (item.craft !== undefined) {
        for (const resource of item.craft) {
          if (Object.keys(resource).length === 2) {
            getBenchsFromPathRecursive(
              getResourceFromResourceId(resource.id) as ResourceWithAmount
            );
          } else {
            getBenchsFromPathRecursive(resource);
          }
        }
      }
    };

    getBenchsFromPathRecursive(path);

    return benches;
  }

  getResourceListFromPath(
    resource: ResourceWithAmount
  ): Array<ResourceWithAmount> {
    const resources: Array<ResourceWithAmount> = [];

    if (resource.craft) {
      if (resource.craft.length === 0) {
        const existingResourceIndex = resources.findIndex(
          (r) => r.id === resource.id
        );

        if (existingResourceIndex !== -1) {
          resources[existingResourceIndex].amount += resource.amount;
        } else {
          resources.push(resource);
        }
      } else {
        for (const craftItem of resource.craft) {
          resources.push(...this.getResourceListFromPath(craftItem));
        }
      }
    }

    return resources;
  }

  mergeDuplicates(resources: Array<ResourceWithAmount>) {
    const mergedResources: Array<ResourceWithAmount> = [];

    for (const resource of resources) {
      const existingResourceIndex = mergedResources.findIndex(
        (r) => r.id === resource.id
      );
      if (existingResourceIndex !== -1) {
        mergedResources[existingResourceIndex].amount += (
          resource as ResourceWithAmount
        ).amount;
      } else {
        mergedResources.push({ ...resource });
      }
    }

    return mergedResources;
  }
}
