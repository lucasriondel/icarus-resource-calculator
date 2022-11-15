import editJsonFile from "edit-json-file";
import { writeFileSync } from "fs";
import path from "path";

const downloadImage = async (url: string, destFolder: string) => {
  const filename = url.split("/").pop();
  if (!filename) throw new Error("No filename found for url " + url);
  const response = await fetch(url);
  const blob = await response.blob();
  const arrayBuffer = await blob.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  writeFileSync(path.join(destFolder, filename), buffer);
  return filename;
};

async function main() {
  const file = editJsonFile("./data/craftables.json");
  const craftables = file.get();
  const categories = Object.keys(file.get()).sort((a, b) => a.localeCompare(b));
  //   console.log(craftables);

  for (const category of categories) {
    for (let i = 0; i < craftables[category].length; i++) {
      const item = craftables[category][i];

      if (item.imageUrl && item.imageUrl.startsWith("http")) {
        try {
          const filename = await downloadImage(
            item.imageUrl,
            "./public/images"
          );
          item.imageUrl = path.join("/images", filename);
        } catch (e) {
          console.error(e);
        }
      }
    }
    file.set(category, craftables[category]);
    file.save();
  }

  //   for (const categoryKey in craftables) {
  //     if (Object.prototype.hasOwnProperty.call(craftables, categoryKey)) {
  //       // @ts-ignore-next-line
  //       const category = craftables[categoryKey];
  //       for (const itemKey in category) {
  //         if (Object.prototype.hasOwnProperty.call(category, itemKey)) {
  //           const item = category[itemKey];
  //           if (item.imageUrl) {
  //             const filename = await downloadImage(
  //               item.imageUrl,
  //               "./public/images"
  //             );
  //             item.imageUrl = path.join("images", filename);
  //           }
  //         }
  //       }
  //     }
  //   }
}

main();
