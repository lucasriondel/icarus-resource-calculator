import axios from "axios";
import chalk from "chalk";
import * as cheerio from "cheerio";
import { writeFileSync } from "fs";
import { bannedUrls } from "./bannedUrls";
import { benchs } from "./constants";
import { scrapItemPage } from "./scrapItemPage";

export const scrapItemsPage = async () => {
  const { data } = await axios.get(
    "https://icarus.fandom.com/wiki/Category:Items"
  );

  const $ = cheerio.load(data);

  const categoriesUrls: string[] = [];
  const itemUrls: string[] = [];

  $("a").each((_, el) => {
    const href = $(el).attr("href");
    if (href && href.startsWith("/wiki/Category:")) {
      categoriesUrls.push(href);
    } else if (
      href &&
      href.startsWith("/wiki/") &&
      !bannedUrls.includes(href) &&
      !itemUrls.includes(href)
    ) {
      if (href.includes(":")) return;
      itemUrls.push(href);
    }
  });

  // TODO make the script check in the sortedCraftables.json file if the item is already there
  const items = await Promise.all(itemUrls.map(scrapItemPage));

  // const items = await Promise.all(
  //   [
  //     "/wiki/Aerodynamic_Attachment",
  //     "/wiki/Armor_Attachment_Pack",
  //     // '/wiki/Attack_Speed_Attachment',
  //     // '/wiki/Basic_Scope_Attachment',
  //     // '/wiki/Calibrated_Grip_Attachment',
  //     // '/wiki/Carcass_Harvesting_Attachment',
  //     // '/wiki/Copper_Attachment',
  //     // '/wiki/Economic_Attachment',
  //     // '/wiki/Flexible_Frame_Attachment',
  //     // '/wiki/Gold_Attachment'
  //   ].map(scrapItemPage)
  // );

  items.map((item) => {
    if (item?.craft?.length === 0) {
      console.log(
        `${chalk.bgYellow("WARNING")} ${item.name} has no craft (${item.url})`
      );
    }
  });

  console.log(`Scrapped ${items.length} items and ${benchs.length} benches`);

  writeFileSync(
    "../scripts/scrappedItems.json",
    JSON.stringify(
      items
        .filter((i) => !!i)
        .sort(function (a, b) {
          var idA = a!.id.toLowerCase(),
            idB = b!.id.toLowerCase();
          if (idA < idB) return -1;
          if (idA > idB) return 1;
          return 0;
        }),
      null,
      2
    )
  );
  writeFileSync(
    "../scripts/scrappedBenchs.json",
    JSON.stringify(benchs, null, 2)
  );
};
