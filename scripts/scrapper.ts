import axios from "axios";
import * as cheerio from "cheerio";

const baseUrl = "https://icarus.fandom.com";

const scrapItemPage = async (url: string) => {
  const { data } = await axios.get(baseUrl + url);

  const $ = cheerio.load(data);

  let itemData: {
    name: string;
    craft: Array<{ amount: number; title: string; link: string }>;
    bench?: string;
  } = {
    name: $("h1#firstHeading").text().trim(),
    craft: [],
  };

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
      // console.log((children.children[0] as any).name);
      // console.log((children.children[0] as any).attribs);
    }
  }

  return itemData;
};

const scrapItems = async () => {
  const { data } = await axios.get(
    "https://icarus.fandom.com/wiki/Category:Items"
  );

  //   console.log(data);
  const $ = cheerio.load(data);

  const categoriesUrls: string[] = [];
  const itemUrls: string[] = [];

  $("a").each((i, el) => {
    const href = $(el).attr("href");
    // console.log(href);
    if (href && href.startsWith("/wiki/Category:")) {
      categoriesUrls.push(href);
    } else if (href && href.startsWith("/wiki/")) {
      if (href.includes(":")) return;
      itemUrls.push(href);
    }
  });

  //   console.log({ categoriesUrls });
  //   console.log({ itemUrls });

  const items = await Promise.all(
    itemUrls.slice(0, 10).map((url) => scrapItemPage(url))
  );

  //   const items = await Promise.all([
  //     scrapItemPage("/wiki/Polar_Bear_Arms_Armor"),
  //   ]);

  console.log(items.map((i) => i.craft));
};

scrapItems();
