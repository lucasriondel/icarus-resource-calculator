import axios from "axios";
import chalk from "chalk";
import * as cheerio from "cheerio";
import { Craftable, CraftItem } from "../../data";
import { kebabCasify } from "../../data/helper";

import { baseUrl, benchs } from "./constants";

class NoCraftFoundError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "NoCraftFoundError";
  }
}

const scrapBench = async (title: string, url: string) => {
  const benchExists = !!benchs.find((b) => b.name === title);
  if (!benchExists) {
    try {
      benchs.push({
        id: kebabCasify(title),
        name: title,
        url: baseUrl + url,
        imageUrl: "",
        craft: [],
      });
      const benchData = await scrapItemPage(url);

      if (!benchData) {
        throw new Error("benchData is undefined");
      }

      const benchCreatedIndex = benchs.findIndex((b) => b.name === title);
      if (benchCreatedIndex !== -1) {
        benchs[benchCreatedIndex].imageUrl = benchData.imageUrl;
        benchs[benchCreatedIndex].craft = benchData.craft;
      }
    } catch (e) {
      console.error(
        `${chalk.bgRed("ERROR")}: ${e} failed to scrap bench (${baseUrl + url})`
      );
    }
  }
};

export const scrapItemPage = async (url: string) => {
  try {
    const { data } = await axios.get(baseUrl + url);

    const $ = cheerio.load(data);

    const name = $("h1#firstHeading").text().trim();

    let itemData: Craftable = {
      id: kebabCasify(name),
      name,
      imageUrl: $("img.pi-image-thumbnail").attr("src") || "",
      url: baseUrl + url,
      craft: [],
    };

    // bench
    let benchScrap = [
      $('div[data-source="crafted_at"]'),
      $('div[data-source="bench"]'),
      $('div[data-source="benchtool"]'),
    ].find((el) => el.length > 0);

    try {
      if (benchScrap) {
        const anchors = benchScrap.find("a");
        const anchor = anchors.length > 0 ? anchors[0] : null;

        const title = (anchor as any).attribs.title.trim();
        const href = (anchor as any).attribs.href.trim();

        await scrapBench(title, href);

        itemData.bench = kebabCasify(title);
      }
    } catch (error) {
      console.error(error);
    }

    // crafting recipe
    try {
      let isInCraftingSection = false;
      for (const children of $("div.mw-parser-output")[0].children) {
        if (
          children.type === "tag" &&
          children.name === "h2" &&
          (children.children[0] as any).attribs.id === "Crafting"
        ) {
          isInCraftingSection = true;
        }

        if (
          children.type === "tag" &&
          children.name === "h2" &&
          (children.children[0] as any).attribs.id !== "Crafting" &&
          isInCraftingSection
        ) {
          isInCraftingSection = false;
        }

        if (
          isInCraftingSection &&
          children.type === "tag" &&
          children.name === "ul"
        ) {
          isInCraftingSection = false;
          for (const li of children.children) {
            if (li.type === "tag" && li.name === "li") {
              const amount = parseInt((li.children[0] as any).data);
              const aTag = (li.children[1] as any).children[2] as any;

              (itemData.craft as CraftItem[]).push({
                id: kebabCasify(aTag.attribs.title),
                amount,
              });
            }
          }
        }
      }

      if (itemData.craft.length === 0)
        throw new NoCraftFoundError("no craft found");
    } catch (e) {
      if (e instanceof NoCraftFoundError) {
        const anchorForBench = $("table.fandom-table > caption > span > a")[0];

        if (anchorForBench && !itemData.bench) {
          const title = (anchorForBench as any).attribs.title as string;
          const href = (anchorForBench as any).attribs.href as string;

          await scrapBench(title, href);

          itemData.bench = title;
        }

        $("table.fandom-table > tbody > tr").each((i, el) => {
          if (i === 0) return;

          const amount = parseInt($(el).find("td").eq(0).text());
          const aTag = $(el).find("td").eq(1).find("a")[0];
          (itemData.craft as CraftItem[]).push({
            id: kebabCasify(aTag.attribs.title),
            amount,
          });
        });
      } else {
        throw e;
      }
    }

    // console.log(
    //   `${chalk.bgGreen("SUCCESS")} scrapped ${itemData.name} (${itemData.url})`
    // );

    return itemData;
  } catch (e) {
    console.error(
      `${chalk.bgRed("ERROR")}: ${e} failed to scrap (${baseUrl + url})`
    );
  }
};
