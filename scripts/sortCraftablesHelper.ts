import editJsonFile from "edit-json-file";
import inquirer from "inquirer";
import { Craftable } from "../data";

// this script is useful to sort craftables into categories in the sortedCraftables.json file.
// It will prompt you for each craftable in the unsortedCraftables category, asking you to select a category.

async function main() {
  let file = editJsonFile("./data/sortedCraftables.json");

  const categories = Object.keys(file.get()).sort((a, b) => a.localeCompare(b));

  const unsortedCraftables = file.get("unsortedCraftables");

  const prompt = inquirer.createPromptModule();
  let defaultValue = categories[0];
  for (const craftable of unsortedCraftables) {
    const answer = await prompt({
      type: "list",
      name: "category",
      message: `What category does ${craftable.id} (${craftable.url}) belong to?`,
      choices: categories,
      default: defaultValue,
    });

    console.log(answer);

    if (answer.category === "unsortedCraftables") {
      continue;
    } else {
      file.append(answer.category, craftable);
      file.set(
        "unsortedCraftables",
        (file.get("unsortedCraftables") as Craftable[]).filter(
          (c) => c.id !== craftable.id
        )
      );
      file.save();
    }

    defaultValue = answer.category;
  }
}

main();
