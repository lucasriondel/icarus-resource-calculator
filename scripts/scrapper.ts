import axios from "axios";
import * as cheerio from "cheerio";
import { writeFileSync } from "fs";

const baseUrl = "https://icarus.fandom.com";

const benchs: Array<{
  name: string;
  imageUrl: string;
  url: string;
  craft: Array<{ amount: number; title: string; link: string }>;
}> = [];

const scrapItemPage = async (url: string) => {
  try {
    const { data } = await axios.get(baseUrl + url);

    const $ = cheerio.load(data);

    let itemData: {
      name: string;
      imageUrl: string;
      url: string;
      craft: Array<{ amount: number; title: string; link: string }>;
      bench?: string;
    } = {
      name: $("h1#firstHeading").text().trim(),
      imageUrl: $("img.pi-image-thumbnail").attr("src") || "",
      url: baseUrl + url,
      craft: [],
    };

    // bench
    let benchScrap = $('div[data-source="crafted_at"]');
    if (benchScrap.length === 0) {
      benchScrap = $('div[data-source="bench"]');
    }

    if (benchScrap.length > 0) {
      // console.log((benchScrap.find("a")[1] as any).attribs.title.trim());
      const title = (benchScrap.find("a")[1] as any).attribs.title.trim();
      // console.log((benchScrap.find("a")[1] as any).attribs.href.trim());
      const href = (benchScrap.find("a")[1] as any).attribs.href.trim();

      const benchExists = !!benchs.find((b) => b.name === title);
      if (!benchExists) {
        // HERE SCRAP THE BENCH

        benchs.push({
          name: title,
          imageUrl: "",
          url: baseUrl + href,
          craft: [],
        });
      }

      itemData.bench = title;
    }

    // crafting recipe
    let nextItemIsCrafting = false;
    for (const children of $("div.mw-parser-output")[0].children) {
      if (
        nextItemIsCrafting &&
        children.type === "tag" &&
        children.name === "ul"
      ) {
        nextItemIsCrafting = false;
        // console.log(children.children);
        for (const li of children.children) {
          //   console.log(li);
          if (li.type === "tag" && li.name === "li") {
            const amount = parseInt((li.children[0] as any).data);
            const aTag = (li.children[1] as any).children[2] as any;
            //   console.log({
            //     amount,
            //     title: aTag.attribs.title,
            //     link: aTag.attribs.href,
            //   });

            itemData.craft.push({
              amount,
              title: aTag.attribs.title,
              link: aTag.attribs.href,
            });
          }
        }
      }

      if (
        children.type === "tag" &&
        children.name === "h2" &&
        (children.children[0] as any).attribs.id === "Crafting"
      ) {
        nextItemIsCrafting = true;
      }
    }

    return itemData;
  } catch (e) {
    console.error("error trying to scrap", baseUrl + url);
  }
};

const scrapItems = async () => {
  const { data } = await axios.get(
    "https://icarus.fandom.com/wiki/Category:Items"
  );

  //   console.log(data);
  const $ = cheerio.load(data);

  const categoriesUrls: string[] = [];
  const itemUrls: string[] = [];

  const bannedUrls = [
    "/wiki/Exotics",
    "/wiki/CX-400_Arms_Armor",
    "/wiki/CX-400_Chest_Armor",
    "/wiki/CX-400_Feet_Armor",
    "/wiki/CX-400_Head_Armor",
    "/wiki/CX-400_Legs_Armor",
    "/wiki/ST-700_Arms_Armor",
    "/wiki/ST-700_Chest_Armor",
    "/wiki/ST-700_Feet_Armor",
    "/wiki/ST-700_Head_Armor",
    "/wiki/ST-700_Legs_Armor",
    "/wiki/Shengong_%27Sichou%27_Knife",
    "/wiki/MXC_Axe",
    "/wiki/Larkwell_Martinez_Knife",
    "/wiki/Inaris_%22Neves%22_Pickaxe",
    "/wiki/Inaris_%22Ventura%22_Knife",
    "/wiki/Inaris_%22Dias%22_Axe",
    "/wiki/Shengong_%27Sichou%27_Knife",
    "/wiki/Shengong_%27Sen%27_Axe",
    "/wiki/Shengong_%27Lie%27_Axe",
    "/wiki/Shengong_%27Jushi%27_Pickaxe",
    "/wiki/Shengong_%27Hulu%27_Canteen",
    "/wiki/Shengong_%27Dong%27_Pickaxe",
    "/wiki/Inaris_%22Neves%22_Pickaxe",
    "/wiki/Inaris_%22Dias%22_Axe",
    "/wiki/Local_Sitemap",
    "/wiki/Naneo_Arms_Armor",
    "/wiki/Naneo_Chest_Armor",
    "/wiki/Naneo_Feet_Armor",
    "/wiki/Naneo_Head_Armor",
    "/wiki/Naneo_Legs_Armor",
    "/wiki/Doseup_Module",
    "/wiki/Survival_Backpack",
  ];

  $("a").each((_, el) => {
    const href = $(el).attr("href");
    // console.log(href);
    if (href && href.startsWith("/wiki/Category:")) {
      categoriesUrls.push(href);
    } else if (
      href &&
      href.startsWith("/wiki/") &&
      !bannedUrls.includes(href)
    ) {
      if (href.includes(":")) return;
      itemUrls.push(href);
    }
  });

  // TODO: clean duplicates

  //   console.log({ categoriesUrls });
  // console.log({ itemUrls });

  const items = await Promise.all(
    // itemUrls.slice(0, 2).map((url) => scrapItemPage(url))
    itemUrls.map((url) => scrapItemPage(url))
  );

  // TODO: display warning for empty craft lists

  //   const items = await Promise.all([
  //     scrapItemPage("/wiki/Polar_Bear_Arms_Armor"),
  //   ]);

  // console.log(items);
  // console.log(benchs);

  console.log(`Scrapped ${items.length} items and ${benchs.length} benches`);

  writeFileSync("items.json", JSON.stringify(items, null, 2));
  writeFileSync("benchs.json", JSON.stringify(benchs, null, 2));
};

scrapItems();
