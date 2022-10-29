import axios from "axios";
import chalk from "chalk";
import * as cheerio from "cheerio";
import { baseUrl, benchs } from "./constants";

class NoCraftFoundError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "NoCraftFoundError";
  }
}

export const scrapItemPage = async (url: string) => {
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

    try {
      if (benchScrap.length > 0) {
        const title = (benchScrap.find("a")[1] as any).attribs.title.trim();
        const href = (benchScrap.find("a")[1] as any).attribs.href.trim();

        const benchExists = !!benchs.find((b) => b.name === title);
        if (!benchExists) {
          // TODO: HERE SCRAP THE BENCH

          benchs.push({
            name: title,
            imageUrl: "",
            url: baseUrl + href,
            craft: [],
          });
        }

        itemData.bench = title;
      }
    } catch (error) {}

    // crafting recipe
    try {
      let nextItemIsCrafting = false;
      for (const children of $("div.mw-parser-output")[0].children) {
        if (
          nextItemIsCrafting &&
          children.type === "tag" &&
          children.name === "ul"
        ) {
          nextItemIsCrafting = false;
          for (const li of children.children) {
            if (li.type === "tag" && li.name === "li") {
              const amount = parseInt((li.children[0] as any).data);
              const aTag = (li.children[1] as any).children[2] as any;

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

      if (itemData.craft.length === 0)
        throw new NoCraftFoundError("no craft found");
    } catch (e) {
      if (e instanceof NoCraftFoundError) {
        const anchorForBench = $("table.fandom-table > caption > span > a")[0];

        if (anchorForBench) {
          const title = (anchorForBench as any).attribs.title as string;

          itemData.bench = title;

          const benchExists = !!benchs.find((b) => b.name === title);
          if (!benchExists) {
            const href = (anchorForBench as any).attribs.href as string;
            // TODO: HERE SCRAP THE BENCH

            benchs.push({
              name: title,
              imageUrl: "",
              url: baseUrl + href,
              craft: [],
            });
          }
        }

        $("table.fandom-table > tbody > tr").each((i, el) => {
          if (i === 0) return;

          const amount = parseInt($(el).find("td").eq(0).text());
          const aTag = $(el).find("td").eq(1).find("a")[0];
          itemData.craft.push({
            amount,
            title: aTag.attribs.title,
            link: aTag.attribs.href,
          });
        });
      } else {
        throw e;
      }
    }

    console.log(
      `${chalk.bgGreen("SUCCESS")} scrapped ${itemData.name} (${itemData.url})`
    );

    return itemData;
  } catch (e) {
    console.error(
      `${chalk.bgRed("ERROR")}: ${e} failed to scrap (${baseUrl + url})`
    );
  }
};
