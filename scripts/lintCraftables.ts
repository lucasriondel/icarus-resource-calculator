import axios, { AxiosError } from "axios";
import * as cheerio from "cheerio";

import editJsonFile from "edit-json-file";

import inquirer from "inquirer";
import { Craftable } from "../data";

// tells you if there are duplicate ids in the sortedCraftables.json file
function findDuplicates() {
  let file = editJsonFile("./data/sortedCraftables.json");

  const craftables = file.get();

  const categories = Object.keys(file.get()).sort((a, b) => a.localeCompare(b));

  const everyIds = categories.reduce((acc, category) => {
    for (const item of craftables[category]) {
      acc.push(item.id);
    }

    return acc;
  }, [] as string[]);

  console.log(
    "duplicates:",
    everyIds.filter((item, index) => everyIds.indexOf(item) != index)
  );
}

// find the duplicates, then asks you to select the correct one and fixes the file
async function findAndFixDuplicates() {
  const prompt = inquirer.createPromptModule();

  let file = editJsonFile("./data/sortedCraftables.json");

  try {
    const craftables = file.get();

    const categories = Object.keys(file.get()).sort((a, b) =>
      a.localeCompare(b)
    );

    for (const category of categories) {
      for (let i = 0; i < craftables[category].length; i++) {
        const item = craftables[category][i];

        for (const category2 of categories) {
          for (let j = 0; j < craftables[category2].length; j++) {
            const item2 = craftables[category2][j];

            if (item.id === item2.id) {
              if (
                category !== category2 ||
                (category === category2 && i !== j)
              ) {
                console.log("DUPLICATE FOUND");
                console.log(`${category}[${i}]: ${item.id}`);
                console.log(`${category2}[${j}]: ${item2.id}`);

                const answer = await prompt({
                  type: "list",
                  name: "whichOne",
                  message: `Which one to keep`,
                  choices: ["first", "second"],
                });

                if (answer.whichOne === "first") {
                  craftables[category2].splice(j, 1);
                  file.set(category2, craftables[category2]);
                } else {
                  craftables[category].splice(i, 1);
                  file.set(category, craftables[category]);
                }
                file.save();

                throw new Error("restart");
              }
            }
          }
        }
      }
    }
  } catch (e) {
    await findAndFixDuplicates();
  }
}

// scans the sortedCraftables.json file and tells you if there are craftables that are depending on a ressource that is not in the file
async function findMissingRessource() {
  let file = editJsonFile("./data/sortedCraftables.json");

  const craftables = file.get();

  const categories = Object.keys(file.get()).sort((a, b) => a.localeCompare(b));

  const notFoundIds: string[] = [];

  for (const category of categories) {
    for (const item of craftables[category] as Craftable[]) {
      if (item.craft) {
        for (const mightBeArray of item.craft) {
          if (Array.isArray(mightBeArray)) {
            for (const ressource of mightBeArray) {
              let notFound = true;

              for (const category2 of categories) {
                for (const item2 of craftables[category2] as Craftable[]) {
                  if (item2.id === ressource.id) {
                    notFound = false;
                  }
                }
              }

              if (notFound) {
                //   console.log(`not found: ${ressource.id}`);
                notFoundIds.push(ressource.id);
              }
            }
          } else {
            const ressource = mightBeArray;
            let notFound = true;

            for (const category2 of categories) {
              for (const item2 of craftables[category2] as Craftable[]) {
                if (item2.id === ressource.id) {
                  notFound = false;
                }
              }
            }

            if (notFound) {
              //   console.log(`not found: ${ressource.id}`);
              notFoundIds.push(ressource.id);
            }
          }
        }
      }
    }
  }

  console.log(
    "not found ids:",
    notFoundIds.filter(function (item, pos) {
      return notFoundIds.indexOf(item) == pos;
    })
  );
}

// scan and fetch images from imageUrl and warn if there is no image
async function fixImages() {
  let file = editJsonFile("./data/sortedCraftables.json");

  const craftables = file.get();

  const categories = Object.keys(file.get()).sort((a, b) => a.localeCompare(b));

  let fixedImages = 0;
  for (const category of categories) {
    for (let i = 0; i < craftables[category].length; i++) {
      const item = craftables[category][i];

      if (item.imageUrl) {
        try {
          await axios.get(item.imageUrl);
        } catch (e) {
          if (e instanceof AxiosError && e.response?.status === 404) {
            try {
              const { data } = await axios.get(item.url!);
              const $ = cheerio.load(data);
              const imageUrl = $("img.pi-image-thumbnail").attr("src");
              if (imageUrl) {
                item.imageUrl = imageUrl;
                file.set(category, craftables[category]);
                file.save();
                fixedImages++;
              } else {
                throw new Error("no image found");
              }
            } catch (e) {
              console.error(
                `error while trying to fix image for item ${item.id} (${item.url}): ${e}`
              );
            }
          }
        }
      }
    }
  }

  console.log(`fixed ${fixedImages} images`);
}

async function main() {
  await findDuplicates();
  await findAndFixDuplicates();
  await findMissingRessource();
  await fixImages();
  // TODO: await findNullAmounts();
}

main();
