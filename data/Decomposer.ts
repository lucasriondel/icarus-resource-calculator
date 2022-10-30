import { Craftable } from ".";
import { getResourceFromResourceId } from "./helper";

export interface Option {
  options: ResourceWithAmount[][];
}
export interface ResourceWithAmount extends Craftable {
  amount: number;
}

interface ResourceWithChildren extends ResourceWithAmount {
  children: ResourceWithChildren[];
}

export type Decomposition = ReturnType<Decomposer["result"]>;

export class Decomposer {
  private resources: Array<ResourceWithAmount | Option> = [];
  private recipe: ResourceWithChildren[] = [];

  constructor() {}

  decomposeCraftable(craftable: Craftable | undefined, amount: number) {
    if (!craftable) return;

    console.log("decomposing", { craftable });

    // if (craftable.craft.length === 0) {
    //   return this.resources.push({ ...craftable, amount });
    // }

    this.compute(craftable, amount);

    // this.recipe.push({ ...craftable, amount, children: [] });

    // if (craftable.craft) {
    //   for (const resourceChild of craftable.craft) {
    //     this.addResource(
    //       getResourceFromResourceId(resourceChild.id),
    //       resourceChild.amount * amount
    //     );
    //   }
    // }
  }

  compute(craftable: Craftable, amount: number): any {
    let option: Option = { ...craftable, options: [] };
    for (const mightBeArray of craftable.craft) {
      if (Array.isArray(mightBeArray)) {
        const optionRecipe = [];

        for (const craftItem of mightBeArray) {
          const resource = getResourceFromResourceId(craftItem.id);
          if (resource.craft.length === 0 && craftItem.amount) {
            optionRecipe.push({
              ...resource,
              amount: craftItem.amount * amount,
            });
          } else {
            this.compute(resource, craftItem.amount! * amount);
          }
        }
        option.options.push(optionRecipe);
        this.resources.push(option);

        // for (const resourceChild of mightBeArray) {
        //   this.addResource(
        //     getResourceFromResourceId(resourceChild.id),
        //     resourceChild.amount * amount
        //   );
        // }
      } else {
        const craftItem = mightBeArray;
        const resource = getResourceFromResourceId(craftItem.id);
        if (resource.craft.length === 0 && craftItem.amount) {
          this.resources.push({
            ...resource,
            amount: craftItem.amount * amount,
          });
        } else {
          this.compute(resource, craftItem.amount! * amount);
        }
      }
    }
  }

  getResourceList(
    craftable: Craftable,
    amount = 1
  ): Array<ResourceWithAmount | Option> {
    const resources: Array<ResourceWithAmount | Option> = [];

    const options: Option["options"] = [];

    for (const ingredientAndAmount of craftable.craft) {
      // multi craft recipe
      if (Array.isArray(ingredientAndAmount)) {
        const craftRecipe = ingredientAndAmount;
        const option: ResourceWithAmount[] = [];

        for (const ingredientAndAmount of craftRecipe) {
          const ingredient = getResourceFromResourceId(ingredientAndAmount.id);

          // here handle case where ingredient is not base

          option.push({
            ...ingredient,
            amount: ingredientAndAmount.amount * amount,
          });
        }
        options.push(option);
      } else {
        const ingredient = getResourceFromResourceId(ingredientAndAmount.id);
        // ingredient is a base resource
        if (ingredient.craft.length === 0) {
          // this.addIngredient(ingredient, ingredientAndAmount.amount);
          resources.push({
            ...ingredient,
            amount: ingredientAndAmount.amount * amount,
          });
        } else {
          // this.findBaseResourcesAndAddToList(ingredient);
          resources.push(
            ...this.getResourceList(
              ingredient,
              ingredientAndAmount.amount * amount
            )
          );
        }
      }
    }

    // reorganize options
    if (options.length > 0) {
      // find common ingredient between options
      let commonIngredients: Array<
        ResourceWithAmount & { isCommon?: boolean }
      > = [];

      for (let i = 0; i < options.length; i++) {
        const option = options[i];
        for (const ingredient of option) {
          if (i === 0) {
            commonIngredients.push({ ...ingredient, isCommon: false });
            continue;
          }

          const commonIngredient = commonIngredients.find(
            (i) => i.id === ingredient.id
          );
          if (
            commonIngredient &&
            commonIngredient.amount === ingredient.amount
          ) {
            commonIngredient.isCommon = true;
            continue;
          } else if (
            commonIngredient &&
            commonIngredient.amount !== ingredient.amount
          ) {
            commonIngredient.isCommon = true;
            commonIngredient.amount =
              commonIngredient.amount > ingredient.amount
                ? ingredient.amount
                : commonIngredient.amount;
          }
        }
      }
      commonIngredients = commonIngredients.filter((i) => i.isCommon);

      // add common ingredients to resources list
      for (const resource of commonIngredients) {
        delete resource.isCommon;
        resources.push(resource);
      }

      // add options to resources list
      resources.push({
        options: options.map((option) =>
          option
            .filter(
              (ingredient) =>
                !commonIngredients.find(
                  (commonIngredient) =>
                    commonIngredient.id === ingredient.id &&
                    commonIngredient.amount === ingredient.amount
                )
            )
            .map((ingredient) => {
              const commonIngredient = commonIngredients.find(
                (commonIngredient) =>
                  commonIngredient.id === ingredient.id &&
                  commonIngredient.amount !== ingredient.amount
              );

              return {
                ...ingredient,
                amount: commonIngredient
                  ? Math.abs(ingredient.amount - commonIngredient.amount)
                  : ingredient.amount,
              };
            })
        ),
      });
    }

    return resources;
  }

  findBaseResourcesAndAddToList(craftable: Craftable) {
    const options: Option["options"] = [];

    for (const ingredientAndAmount of craftable.craft) {
      // multi craft recipe
      if (Array.isArray(ingredientAndAmount)) {
        const craftRecipe = ingredientAndAmount;
        const option: ResourceWithAmount[] = [];

        for (const ingredientAndAmount of craftRecipe) {
          const ingredient = getResourceFromResourceId(ingredientAndAmount.id);

          // here handle case where ingredient is not base

          option.push({ ...ingredient, amount: ingredientAndAmount.amount });
        }
        options.push(option);
      } else {
        const ingredient = getResourceFromResourceId(ingredientAndAmount.id);
        // ingredient is a base resource
        if (ingredient.craft.length === 0) {
          this.addIngredient(ingredient, ingredientAndAmount.amount);
        } else {
          this.findBaseResourcesAndAddToList(ingredient);
        }
      }
    }

    // reorganize options
    if (options.length > 0) {
      this.resources.push({ options });
    }
  }

  addIngredient(resource: Craftable, amount: number) {
    const existingResourceIndex = this.resources.findIndex((r) => {
      if (r.hasOwnProperty("id")) {
        return (r as ResourceWithAmount).id === resource.id;
      }
    });

    if (existingResourceIndex !== -1) {
      (this.resources[existingResourceIndex] as ResourceWithAmount).amount +=
        amount;
    } else {
      this.resources.push({ ...resource, amount });
    }
  }

  test(craftable: Craftable, amount: number) {
    // writeFileSync(
    //   "test.json",
    //   JSON.stringify(this.getResourceList(craftable, amount), null, 2)
    // );
    console.log(
      JSON.stringify(this.getResourceList(craftable, amount), null, 2)
    );
  }

  result() {
    console.log(this.resources);
    return {
      resources: this.resources,
    };
  }
}

const testForCraftableWithMultiRecipe: Craftable = {
  id: "test-for-craftable-with-multi-recipe",
  name: "test for craftable with multi recipe",
  craft: [
    { id: "wood", amount: 10 },
    { id: "test-for-multi-recipe", amount: 1 },
    { id: "composites", amount: 20 },
  ],
};

new Decomposer().test(testForCraftableWithMultiRecipe, 1);
