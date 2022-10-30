import { Craftable } from ".";
import { getResourceFromResourceId } from "./helper";

export interface Option {
  options: Array<ResourceWithAmount | Option>[];
}
export interface ResourceWithAmount extends Craftable {
  amount: number;
}

export class Decomposer {
  constructor() {}

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
        const option: Array<ResourceWithAmount | Option> = [];

        for (const ingredientAndAmount of craftRecipe) {
          const ingredient = getResourceFromResourceId(ingredientAndAmount.id);

          if (ingredient.craft.length === 0) {
            option.push({
              ...ingredient,
              amount: ingredientAndAmount.amount * amount,
            });
          } else {
            option.push(
              ...this.getResourceList(
                ingredient,
                ingredientAndAmount.amount * amount
              )
            );
          }
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
        for (const ingredientOrOption of option) {
          if (ingredientOrOption.hasOwnProperty("options")) {
            continue;
          }
          const ingredient = ingredientOrOption as ResourceWithAmount;

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
              (ingredientOrOption) =>
                !ingredientOrOption.hasOwnProperty("options")
            )
            .filter(
              (ingredient) =>
                !commonIngredients.find(
                  (commonIngredient) =>
                    commonIngredient.id ===
                      (ingredient as ResourceWithAmount).id &&
                    commonIngredient.amount ===
                      (ingredient as ResourceWithAmount).amount
                )
            )
            .map((ingredient) => {
              const commonIngredient = commonIngredients.find(
                (commonIngredient) =>
                  commonIngredient.id ===
                    (ingredient as ResourceWithAmount).id &&
                  commonIngredient.amount !==
                    (ingredient as ResourceWithAmount).amount
              );

              return {
                ...ingredient,
                amount: commonIngredient
                  ? Math.abs(
                      (ingredient as ResourceWithAmount).amount -
                        commonIngredient.amount
                    )
                  : (ingredient as ResourceWithAmount).amount,
              };
            })
        ),
      });
    }

    return resources;
  }

  mergeDuplicates(resources: Array<ResourceWithAmount | Option>) {
    const mergedResources: Array<ResourceWithAmount | Option> = [];

    for (const resource of resources) {
      if (resource.hasOwnProperty("options")) {
        mergedResources.push(resource);
        continue;
      }

      const existingResource = mergedResources
        .filter((resource) => !resource.hasOwnProperty("options"))
        .find(
          (r) =>
            (r as ResourceWithAmount).id === (resource as ResourceWithAmount).id
        ) as ResourceWithAmount;
      if (existingResource) {
        existingResource.amount += (resource as ResourceWithAmount).amount;
      } else {
        mergedResources.push(resource);
      }
    }

    return mergedResources;
  }
}

// const testForCraftableWithMultiRecipe: Craftable = {
//   id: "test-for-craftable-with-multi-recipe",
//   name: "test for craftable with multi recipe",
//   craft: [
//     { id: "wood", amount: 10 },
//     { id: "test-for-multi-recipe", amount: 1 },
//     { id: "composites", amount: 20 },
//   ],
// };

// new Decomposer().test(testForCraftableWithMultiRecipe, 1);
