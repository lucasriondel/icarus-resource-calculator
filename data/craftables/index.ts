import { writeFileSync } from "fs";
import { attachments } from "./attachments";
import { base } from "./base";
import { buildingRelated } from "./buildingRelated";
import { consumables } from "./consumables";
import { cooking } from "./cooking";
import { deployables } from "./deployables";
import { farming } from "./farming";
import { ingots } from "./ingots";
import { tools } from "./tools";
import { trophies } from "./trophies";

export interface Craftable {
  id: string;
  name: string;
  url?: string;
  imageUrl?: string;
  bench?: string;
  craft: Array<{
    id: string;
    amount: number | null;
  }>;
}

const unsortedCraftables: Craftable[] = [
  {
    id: "campfire",
    name: "Campfire",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/0/01/Campfire.png/revision/latest?cb=20210915212202",
    url: "https://icarus.fandom.com/wiki/Campfire",
    craft: [
      {
        id: "stone",
        amount: 24,
      },
      {
        id: "fiber",
        amount: 8,
      },
      {
        id: "stick",
        amount: 8,
      },
    ],
  },
  {
    id: "canteen",
    name: "Canteen",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/7/75/ITEM_Canteen.png/revision/latest?cb=20210916210516",
    url: "https://icarus.fandom.com/wiki/Canteen",
    craft: [
      {
        id: "leather",
        amount: 2,
      },
      {
        id: "steel-ingot",
        amount: 8,
      },
    ],
  },
  {
    id: "carbon-fiber",
    name: "Carbon Fiber",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/6/68/ITEM_Carbon_Fiber.png/revision/latest?cb=20210916205447",
    url: "https://icarus.fandom.com/wiki/Carbon_Fiber",
    craft: [],
  },
  {
    id: "cave-scanner",
    name: "Cave Scanner",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/6/66/ITEM_Cave_Scanner.png/revision/latest?cb=20220408200700",
    url: "https://icarus.fandom.com/wiki/Cave_Scanner",
    craft: [
      {
        id: "iron-ingot",
        amount: 10,
      },
      {
        id: "refined-gold",
        amount: 5,
      },
      {
        id: "iron-nail",
        amount: 12,
      },
      {
        id: "copper-ingot",
        amount: 5,
      },
    ],
    bench: "machining-bench",
  },
  {
    id: "caveworm-knife",
    name: "Caveworm Knife",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/8/85/ITEM_Caveworm_Knife.png/revision/latest?cb=20220320082622",
    url: "https://icarus.fandom.com/wiki/Caveworm_Knife",
    craft: [
      {
        id: "wood",
        amount: 2,
      },
      {
        id: "leather",
        amount: 2,
      },
      {
        id: "worm-scale",
        amount: 5,
      },
      {
        id: "poison-sack",
        amount: 5,
      },
    ],
    bench: "crafting-bench",
  },

  {
    id: "cement-mixer",
    name: "Cement Mixer",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/0/03/ITEM_Cement_Mixer.png/revision/latest?cb=20210916204947",
    url: "https://icarus.fandom.com/wiki/Cement_Mixer",
    craft: [
      {
        id: "wood",
        amount: 50,
      },
      {
        id: "stone",
        amount: 40,
      },
      {
        id: "iron-ingot",
        amount: 20,
      },
      {
        id: "rope",
        amount: 8,
      },
      {
        id: "iron-nail",
        amount: 8,
      },
    ],
    bench: "machining-bench",
  },
  {
    id: "charcoal",
    name: "Charcoal",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/8/8a/ITEM_Charcoal.png/revision/latest?cb=20210917034704",
    url: "https://icarus.fandom.com/wiki/Charcoal",
    craft: [
      {
        id: "wood",
        amount: 1,
      },
    ],
    bench: "Campfire",
  },
  {
    id: "charred-corn",
    name: "Charred Corn",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/7/7c/ITEM_Charred_Corn.png/revision/latest?cb=20211224115815",
    url: "https://icarus.fandom.com/wiki/Charred_Corn",
    craft: [],
    bench: "campfire",
  },
  {
    id: "chemistry-bench",
    name: "Chemistry Bench",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/6/63/ITEM_Chemistry_Bench.png/revision/latest?cb=20211224011107",
    url: "https://icarus.fandom.com/wiki/Chemistry_Bench",
    craft: [
      {
        id: "steel-ingot",
        amount: 20,
      },
      {
        id: "wood",
        amount: 30,
      },
      {
        id: "electronics",
        amount: 8,
      },
      {
        id: "composites",
        amount: 10,
      },
      {
        id: "glass",
        amount: 10,
      },
    ],
  },
  {
    id: "cloth-arms-armor",
    name: "Cloth Arms Armor",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/2/26/ITEM_Cloth_Arms_Armor.png/revision/latest?cb=20211225040157",
    url: "https://icarus.fandom.com/wiki/Cloth_Arms_Armor",
    craft: [
      {
        id: "fiber",
        amount: 80,
      },
    ],
    bench: "character-crafting",
  },
  {
    id: "cloth-chest-armor",
    name: "Cloth Chest Armor",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/7/7b/ITEM_Cloth_Chest_Armor.png/revision/latest?cb=20211225040117",
    url: "https://icarus.fandom.com/wiki/Cloth_Chest_Armor",
    craft: [
      {
        id: "fiber",
        amount: 120,
      },
    ],
    bench: "character-crafting",
  },
  {
    id: "cloth-feet-armor",
    name: "Cloth Feet Armor",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/7/73/ITEM_Cloth_Feet_Armor.png/revision/latest?cb=20211225040234",
    url: "https://icarus.fandom.com/wiki/Cloth_Feet_Armor",
    craft: [
      {
        id: "fiber",
        amount: 40,
      },
    ],
    bench: "character-crafting",
  },
  {
    id: "cloth-head-armor",
    name: "Cloth Head Armor",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/4/45/ITEM_Cloth_Head_Armor.png/revision/latest?cb=20211225040208",
    url: "https://icarus.fandom.com/wiki/Cloth_Head_Armor",
    craft: [
      {
        id: "fiber",
        amount: 80,
      },
    ],
    bench: "character-crafting",
  },
  {
    id: "cloth-legs-armor",
    name: "Cloth Legs Armor",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/9/93/ITEM_Cloth_Legs_Armor.png/revision/latest?cb=20211225040219",
    url: "https://icarus.fandom.com/wiki/Cloth_Legs_Armor",
    craft: [
      {
        id: "fiber",
        amount: 120,
      },
    ],
    bench: "character-crafting",
  },
  {
    id: "cocoa-seed",
    name: "Cocoa Seed",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/1/1b/ITEM_Cocoa_Seed.png/revision/latest?cb=20211224115815",
    url: "https://icarus.fandom.com/wiki/Cocoa_Seed",
    craft: [],
  },
  {
    id: "coffee-bean",
    name: "Coffee Bean",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/9/9f/ITEM_Coffee_Bean.png/revision/latest?cb=20211224115815",
    url: "https://icarus.fandom.com/wiki/Coffee_Bean",
    craft: [],
  },
  {
    id: "combat-knife",
    name: "Combat Knife",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/e/ee/ITEM_Combat_Knife.png/revision/latest?cb=20210916203254",
    url: "https://icarus.fandom.com/wiki/Combat_Knife",
    craft: [
      {
        id: "steel-ingot",
        amount: 12,
      },
      {
        id: "steel-screw",
        amount: 2,
      },
      {
        id: "carbon-fiber",
        amount: 2,
      },
      {
        id: "epoxy",
        amount: 4,
      },
    ],
    bench: "fabricator",
  },
  {
    id: "composite-arms-armor",
    name: "Composite Arms Armor",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/7/75/ITEM_Composite_Arms_Armor.png/revision/latest?cb=20210916184308",
    url: "https://icarus.fandom.com/wiki/Composite_Arms_Armor",
    craft: [
      {
        id: "aluminium-ingot",
        amount: 2,
      },
      {
        id: "composites",
        amount: 8,
      },
      {
        id: "steel-screw",
        amount: 6,
      },
      {
        id: "carbon-fiber",
        amount: 2,
      },
      {
        id: "refined-gold",
        amount: 2,
      },
    ],
    bench: "fabricator",
  },
  {
    id: "composite-chest-armor",
    name: "Composite Chest Armor",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/e/e6/ITEM_Composite_Chest_Armor.png/revision/latest?cb=20210916184448",
    url: "https://icarus.fandom.com/wiki/Composite_Chest_Armor",
    craft: [
      {
        id: "aluminium-ingot",
        amount: 6,
      },
      {
        id: "composites",
        amount: 24,
      },
      {
        id: "steel-screw",
        amount: 12,
      },
      {
        id: "carbon-fiber",
        amount: 2,
      },
      {
        id: "refined-gold",
        amount: 2,
      },
    ],
    bench: "fabricator",
  },
  {
    id: "composite-feet-armor",
    name: "Composite Feet Armor",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/2/22/ITEM_Composite_Feet_Armor.png/revision/latest?cb=20210916184448",
    url: "https://icarus.fandom.com/wiki/Composite_Feet_Armor",
    craft: [
      {
        id: "aluminium-ingot",
        amount: 4,
      },
      {
        id: "composites",
        amount: 12,
      },
      {
        id: "steel-screw",
        amount: 6,
      },
      {
        id: "carbon-fiber",
        amount: 2,
      },
      {
        id: "refined-gold",
        amount: 2,
      },
    ],
    bench: "fabricator",
  },
  {
    id: "composite-head-armor",
    name: "Composite Head Armor",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/e/e3/ITEM_Composite_Head_Armor.png/revision/latest?cb=20210916184448",
    url: "https://icarus.fandom.com/wiki/Composite_Head_Armor",
    craft: [
      {
        id: "aluminium-ingot",
        amount: 4,
      },
      {
        id: "composites",
        amount: 12,
      },
      {
        id: "steel-screw",
        amount: 6,
      },
      {
        id: "carbon-fiber",
        amount: 2,
      },
      {
        id: "refined-gold",
        amount: 2,
      },
    ],
    bench: "fabricator",
  },
  {
    id: "composite-legs-armor",
    name: "Composite Legs Armor",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/0/05/ITEM_Composite_Legs_Armor.png/revision/latest?cb=20210916184448",
    url: "https://icarus.fandom.com/wiki/Composite_Legs_Armor",
    craft: [
      {
        id: "aluminium-ingot",
        amount: 6,
      },
      {
        id: "composites",
        amount: 18,
      },
      {
        id: "steel-screw",
        amount: 6,
      },
      {
        id: "carbon-fiber",
        amount: 2,
      },
      {
        id: "refined-gold",
        amount: 2,
      },
    ],
    bench: "fabricator",
  },
  {
    id: "compound-bow",
    name: "Compound Bow",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/a/a6/ITEM_Compound_Bow.png/revision/latest?cb=20210916204153",
    url: "https://icarus.fandom.com/wiki/Compound_Bow",
    craft: [
      {
        id: "carbon-fiber",
        amount: 8,
      },
      {
        id: "composites",
        amount: 18,
      },
      {
        id: "aluminium-ingot",
        amount: 16,
      },
      {
        id: "steel-screw",
        amount: 4,
      },
    ],
    bench: "Fabricator",
  },
  {
    id: "concrete-beam",
    name: "Concrete Beam",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/f/f5/ITEM_Concrete_Beam.png/revision/latest?cb=20210916191847",
    url: "https://icarus.fandom.com/wiki/Concrete_Beam",
    craft: [
      {
        id: "steel-rebar",
        amount: 8,
      },
      {
        id: "concrete-mix",
        amount: 2,
      },
      {
        id: "steel-screw",
        amount: 2,
      },
    ],
    bench: "Machining Bench",
  },
  {
    id: "concrete-floor",
    name: "Concrete Floor",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/3/37/ITEM_Concrete_Floor.png/revision/latest?cb=20210916191847",
    url: "https://icarus.fandom.com/wiki/Concrete_Floor",
    craft: [
      {
        id: "steel-rebar",
        amount: 10,
      },
      {
        id: "concrete-mix",
        amount: 4,
      },
      {
        id: "steel-screw",
        amount: 4,
      },
    ],
    bench: "Machining Bench",
  },

  {
    id: "concrete-frame",
    name: "Concrete Frame",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/a/ac/ITEM_Concrete_Frame.png/revision/latest?cb=20210916191848",
    url: "https://icarus.fandom.com/wiki/Concrete_Frame",
    craft: [
      {
        id: "steel-rebar",
        amount: 20,
      },
      {
        id: "concrete-mix",
        amount: 8,
      },
      {
        id: "steel-screw",
        amount: 10,
      },
    ],
    bench: "Machining Bench",
  },
  {
    id: "concrete-furnace",
    name: "Concrete Furnace",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/6/6d/ITEM_Concrete_Furnace.png/revision/latest?cb=20211113110411",
    url: "https://icarus.fandom.com/wiki/Concrete_Furnace",
    craft: [
      {
        id: "iron-ingot",
        amount: 12,
      },
      {
        id: "rope",
        amount: 8,
      },
      {
        id: "epoxy",
        amount: 12,
      },
      {
        id: "concrete-mix",
        amount: 20,
      },
    ],
    bench: "machining-bench",
  },
  {
    id: "concrete-halfpieces",
    name: "Concrete Halfpieces",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/f/ff/ITEM_Concrete_Halfpieces.png/revision/latest?cb=20211224000333",
    url: "https://icarus.fandom.com/wiki/Concrete_Halfpieces",
    craft: [
      {
        id: "steel-rebar",
        amount: 10,
      },
      {
        id: "concrete-mix",
        amount: 4,
      },
      {
        id: "steel-screw",
        amount: 4,
      },
    ],
    bench: "Machining Bench",
  },
  {
    id: "concrete-halfpitches",
    name: "Concrete Halfpitches",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/7/75/ITEM_Concrete_Halfpitches.png/revision/latest?cb=20211224000344",
    url: "https://icarus.fandom.com/wiki/Concrete_Halfpitches",
    craft: [
      {
        id: "steel-rebar",
        amount: 10,
      },
      {
        id: "concrete-mix",
        amount: 4,
      },
      {
        id: "steel-screw",
        amount: 4,
      },
    ],
    bench: "Machining Bench",
  },
  {
    id: "concrete-mix",
    name: "Concrete Mix",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/e/e5/ITEM_Concrete_Mix.png/revision/latest?cb=20210916205447",
    url: "https://icarus.fandom.com/wiki/Concrete_Mix",
    craft: [
      {
        id: "tree-sap",
        amount: 1,
      },
      {
        id: "stone",
        amount: 8,
      },
      {
        id: "silica-ore",
        amount: 4,
      },
    ],
    bench: "cement-mixer",
  },
  {
    id: "concrete-railing",
    name: "Concrete Railing",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/d/df/ITEM_Concrete_Railing.png/revision/latest?cb=20211224002009",
    url: "https://icarus.fandom.com/wiki/Concrete_Railing",
    craft: [
      {
        id: "aluminium-ore",
        amount: 2,
      },
      {
        id: "wood",
        amount: 2,
      },
      {
        id: "steel-screw",
        amount: 6,
      },
    ],
    bench: "Machining Bench",
  },
  {
    id: "concrete-ramp",
    name: "Concrete Ramp",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/f/f4/ITEM_Concrete_Ramp.png/revision/latest?cb=20210916191848",
    url: "https://icarus.fandom.com/wiki/Concrete_Ramp",
    craft: [
      {
        id: "steel-rebar",
        amount: 12,
      },
      {
        id: "concrete-mix",
        amount: 4,
      },
      {
        id: "steel-screw",
        amount: 4,
      },
    ],
    bench: "Machining Bench",
  },

  {
    id: "cooked-bacon",
    name: "Cooked Bacon",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/e/e0/ITEM_Cooked_Bacon.png/revision/latest?cb=20220401134521",
    url: "https://icarus.fandom.com/wiki/Cooked_Bacon",
    craft: [],
    bench: "campfire",
  },
  {
    id: "cooked-fatty-tbone",
    name: "Cooked Fatty Tbone",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/b/b3/ITEM_Cooked_Fatty_Tbone.png/revision/latest?cb=20220325090240",
    url: "https://icarus.fandom.com/wiki/Cooked_Fatty_Tbone",
    craft: [],
    bench: "campfire",
  },
  {
    id: "cooked-fish",
    name: "Cooked Fish",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/f/f6/Cooked_Fish.png/revision/latest?cb=20210915215921",
    url: "https://icarus.fandom.com/wiki/Cooked_Fish",
    craft: [],
    bench: "campfire",
  },
  {
    id: "cooked-game-meat",
    name: "Cooked Game Meat",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/2/21/ITEM_Cooked_Game_Meat.png/revision/latest?cb=20220320075018",
    url: "https://icarus.fandom.com/wiki/Cooked_Game_Meat",
    craft: [],
    bench: "campfire",
  },
  {
    id: "cooked-giant-steak",
    name: "Cooked Giant Steak",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/5/5b/ITEM_Cooked_Giant_Steak.png/revision/latest?cb=20210916211951",
    url: "https://icarus.fandom.com/wiki/Cooked_Giant_Steak",
    craft: [],
    bench: "campfire",
  },
  {
    id: "cooked-meat",
    name: "Cooked Meat",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/8/8a/ITEM_Cooked_Meat.png/revision/latest?cb=20210916211951",
    url: "https://icarus.fandom.com/wiki/Cooked_Meat",
    craft: [],
    bench: "campfire",
  },
  {
    id: "cooked-soft-meat",
    name: "Cooked Soft Meat",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/c/c4/ITEM_Cooked_Soft_Meat.png/revision/latest?cb=20220325090242",
    url: "https://icarus.fandom.com/wiki/Cooked_Soft_Meat",
    craft: [],
    bench: "campfire",
  },
  {
    id: "cooked-stringy-meat",
    name: "Cooked Stringy Meat",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/1/1c/ITEM_Cooked_Stringy_Meat.png/revision/latest?cb=20220320075018",
    url: "https://icarus.fandom.com/wiki/Cooked_Stringy_Meat",
    craft: [],
    bench: "campfire",
  },
  {
    id: "cooked-white-meat",
    name: "Cooked White Meat",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/e/e0/ITEM_Cooked_White_Meat.png/revision/latest?cb=20220320075018",
    url: "https://icarus.fandom.com/wiki/Cooked_White_Meat",
    craft: [],
    bench: "campfire",
  },
  {
    id: "cooking-station",
    name: "Cooking Station",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/e/e5/ITEM_Cooking_Station.png/revision/latest?cb=20210916213205",
    url: "https://icarus.fandom.com/wiki/Cooking_Station",
    craft: [],
    bench: "crafting-bench",
  },
  {
    id: "cooling-bandage",
    name: "Cooling Bandage",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/7/74/ITEM_Cooling_Bandage.png/revision/latest?cb=20220325110734",
    url: "https://icarus.fandom.com/wiki/Cooling_Bandage",
    craft: [
      {
        id: "fiber",
        amount: 40,
      },
      {
        id: "oxite",
        amount: 4,
      },
      {
        id: "charcoal",
        amount: 10,
      },
    ],
    bench: "character-crafting",
  },

  {
    id: "copper-ingot",
    name: "Copper Ingot",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/d/d9/ITEM_Copper_Ingot.png/revision/latest?cb=20211223230409",
    url: "https://icarus.fandom.com/wiki/Copper_Ingot",
    craft: [
      {
        id: "copper-ore",
        amount: 2,
      },
    ],
    bench: "Stone Furnace",
  },
  {
    id: "corn",
    name: "Corn",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/c/c5/ITEM_Corn.png/revision/latest?cb=20210916211951",
    url: "https://icarus.fandom.com/wiki/Corn",
    craft: [],
  },

  {
    id: "crafting-bench",
    name: "Crafting Bench",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/f/fe/ITEM_Crafting_Bench.png/revision/latest?cb=20210916204947",
    url: "https://icarus.fandom.com/wiki/Crafting_Bench",
    craft: [
      {
        id: "fiber",
        amount: 60,
      },
      {
        id: "wood",
        amount: 50,
      },
      {
        id: "stone",
        amount: 12,
      },
      {
        id: "leather",
        amount: 20,
      },
    ],
  },
  {
    id: "creamed-corn",
    name: "Creamed Corn",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/a/a4/ITEM_Creamed_Corn.png/revision/latest?cb=20211224115815",
    url: "https://icarus.fandom.com/wiki/Creamed_Corn",
    craft: [
      {
        id: "corn",
        amount: 1,
      },
      {
        id: "animal-fat",
        amount: 1,
      },
    ],
    bench: "cooking-station",
  },
  {
    id: "crispy-bacon",
    name: "Crispy Bacon",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/c/cd/ITEM_Crispy_Bacon.png/revision/latest?cb=20220401134512",
    url: "https://icarus.fandom.com/wiki/Crispy_Bacon",
    craft: [],
    bench: "potbelly-stove",
  },
  {
    id: "crossbow",
    name: "Crossbow",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/2/23/ITEM_Crossbow.png/revision/latest?cb=20210916203841",
    url: "https://icarus.fandom.com/wiki/Crossbow",
    craft: [
      {
        id: "wood",
        amount: 18,
      },
      {
        id: "leather",
        amount: 12,
      },
      {
        id: "iron-ingot",
        amount: 12,
      },
      {
        id: "iron-nail",
        amount: 2,
      },
    ],
    bench: "Anvil Bench",
  },
  {
    id: "crumbed-fish-fillet",
    name: "Crumbed Fish Fillet",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/b/b0/ITEM_Crumbed_Fish_Fillet.png/revision/latest?cb=20211224115815",
    url: "https://icarus.fandom.com/wiki/Crumbed_Fish_Fillet",
    craft: [
      {
        id: "raw-fish",
        amount: 1,
      },
      {
        id: "animal-fat",
        amount: 1,
      },
      {
        id: "bread-dough",
        amount: 1,
      },
    ],
    bench: "biofuel-stove",
  },
  {
    id: "crushed-bone",
    name: "Crushed Bone",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/5/56/ITEM_Crushed_Bone.png/revision/latest?cb=20211110014357",
    url: "https://icarus.fandom.com/wiki/Crushed_Bone",
    craft: [
      {
        id: "bone",
        amount: 2,
      },
    ],
    bench: "mortar-and-pestle",
  },
  {
    id: "cured-head-armor",
    name: "Cured Head Armor",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/7/78/ITEM_Cured_Head_Armor.png/revision/latest/scale-to-width-down/350?cb=20221017225751",
    url: "https://icarus.fandom.com/wiki/Cured_Head_Armor",
    craft: [
      {
        id: "cured-leather",
        amount: 6,
      },
      {
        id: "platinum-weave",
        amount: 1,
      },
    ],
    bench: "advanced-textiles-bench",
  },
  {
    id: "cured-leather",
    name: "Cured Leather",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/c/c0/ITEM_Cured_Leather.png/revision/latest?cb=20221017202036",
    url: "https://icarus.fandom.com/wiki/Cured_Leather",
    craft: [
      {
        id: "leather",
        amount: 6,
      },
      {
        id: "tree-sap",
        amount: 2,
      },
    ],
    bench: "drying-rack",
  },
  {
    id: "cured-leather-arms-armor",
    name: "Cured Leather Arms Armor",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/b/be/ITEM_Cured_Leather_Arms_Armor.png/revision/latest/scale-to-width-down/350?cb=20221017230815",
    url: "https://icarus.fandom.com/wiki/Cured_Leather_Arms_Armor",
    craft: [
      {
        id: "cured-leather",
        amount: 7,
      },
      {
        id: "platinum-weave",
        amount: 1,
      },
    ],
    bench: "advanced-textiles-bench",
  },
  {
    id: "cured-leather-chest-armor",
    name: "Cured Leather Chest Armor",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/d/d7/ITEM_Cured_Leather_Chest_Armor.png/revision/latest/scale-to-width-down/350?cb=20221017230524",
    url: "https://icarus.fandom.com/wiki/Cured_Leather_Chest_Armor",
    craft: [
      {
        id: "cured-leather",
        amount: 13,
      },
      {
        id: "platinum-weave",
        amount: 3,
      },
    ],
    bench: "advanced-textiles-bench",
  },
  {
    id: "cured-leather-feet-armor",
    name: "Cured Leather Feet Armor",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/3/3a/ITEM_Cured_Leather_Feet_Armor.png/revision/latest/scale-to-width-down/350?cb=20221017231457",
    url: "https://icarus.fandom.com/wiki/Cured_Leather_Feet_Armor",
    craft: [
      {
        id: "cured-leather",
        amount: 4,
      },
      {
        id: "platinum-weave",
        amount: 1,
      },
    ],
    bench: "advanced-textiles-bench",
  },
  {
    id: "cured-leather-leg-armor",
    name: "Cured Leather Leg Armor",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/9/90/ITEM_Cured_Leather_Leg_Armor.png/revision/latest/scale-to-width-down/350?cb=20221017231214",
    url: "https://icarus.fandom.com/wiki/Cured_Leather_Leg_Armor",
    craft: [
      {
        id: "cured-leather",
        amount: 10,
      },
      {
        id: "platinum-weave",
        amount: 2,
      },
    ],
    bench: "advanced-textiles-bench",
  },
  {
    id: "deep-mining-ore-scanner",
    name: "Deep Mining Ore Scanner",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/7/7b/ITEM_Deep_Mining_Ore_Scanner.png/revision/latest?cb=20220408200700",
    url: "https://icarus.fandom.com/wiki/Deep_Mining_Ore_Scanner",
    craft: [
      {
        id: "steel-ingot",
        amount: 10,
      },
      {
        id: "electronics",
        amount: 4,
      },
      {
        id: "steel-screw",
        amount: 16,
      },
      {
        id: "copper-ingot",
        amount: 5,
      },
    ],
    bench: "fabricator",
  },

  {
    id: "dehumidifier",
    name: "Dehumidifier",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/4/46/ITEM_Dehumidifier.png/revision/latest?cb=20211114002420",
    url: "https://icarus.fandom.com/wiki/Dehumidifier",
    craft: [
      {
        id: "steel-ingot",
        amount: 12,
      },
      {
        id: "glass",
        amount: 4,
      },
      {
        id: "copper-ingot",
        amount: 24,
      },
      {
        id: "epoxy",
        amount: 12,
      },
      {
        id: "electronics",
        amount: 20,
      },
    ],
    bench: "machining-bench",
  },
  {
    id: "directional-worklamp",
    name: "Directional Worklamp",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/6/62/ITEM_Directional_Worklamp.png/revision/latest?cb=20211224011115",
    url: "https://icarus.fandom.com/wiki/Directional_Worklamp",
    craft: [
      {
        id: "aluminium-ingot",
        amount: 10,
      },
      {
        id: "glass",
        amount: 5,
      },
      {
        id: "composites",
        amount: 5,
      },
      {
        id: "electronics",
        amount: 2,
      },
    ],
    bench: "fabricator",
  },
  {
    id: "dried-fatty-tbone",
    name: "Dried Fatty Tbone",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/e/e9/ITEM_Dried_Fatty_Tbone.png/revision/latest?cb=20220325090242",
    url: "https://icarus.fandom.com/wiki/Dried_Fatty_Tbone",
    craft: [],
    bench: "drying-rack",
  },
  {
    id: "dried-game-meat",
    name: "Dried Game Meat",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/e/e0/ITEM_Dried_Game_Meat.png/revision/latest?cb=20220320075018",
    url: "https://icarus.fandom.com/wiki/Dried_Game_Meat",
    craft: [],
    bench: "drying-rack",
  },
  {
    id: "dried-giant-steak",
    name: "Dried Giant Steak",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/7/75/ITEM_Dried_Giant_Steak.png/revision/latest?cb=20220325085831",
    url: "https://icarus.fandom.com/wiki/Dried_Giant_Steak",
    craft: [],
    bench: "drying-rack",
  },
  {
    id: "dried-soft-meat",
    name: "Dried Soft Meat",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/a/a1/ITEM_Dried_Soft_Meat.png/revision/latest?cb=20220325090242",
    url: "https://icarus.fandom.com/wiki/Dried_Soft_Meat",
    craft: [],
    bench: "drying-rack",
  },
  {
    id: "dried-stringy-meat",
    name: "Dried Stringy Meat",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/f/f9/ITEM_Dried_Stringy_Meat.png/revision/latest?cb=20220320075018",
    url: "https://icarus.fandom.com/wiki/Dried_Stringy_Meat",
    craft: [],
    bench: "drying-rack",
  },
  {
    id: "dried-white-meat",
    name: "Dried White Meat",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/3/34/ITEM_Dried_White_Meat.png/revision/latest?cb=20220320075018",
    url: "https://icarus.fandom.com/wiki/Dried_White_Meat",
    craft: [],
    bench: "drying-rack",
  },
  {
    id: "drying-rack",
    name: "Drying Rack",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/3/3e/ITEM_Drying_Rack.png/revision/latest?cb=20220402110219",
    url: "https://icarus.fandom.com/wiki/Drying_Rack",
    craft: [],
    bench: "character-crafting",
  },

  {
    id: "electric-carpentry-bench",
    name: "Electric Carpentry Bench",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/2/29/ITEM_Electric_Carpentry_Bench.png/revision/latest?cb=20211224011122",
    url: "https://icarus.fandom.com/wiki/Electric_Carpentry_Bench",
    craft: [
      {
        id: "steel-ingot",
        amount: 60,
      },
      {
        id: "composites",
        amount: 6,
      },
      {
        id: "iron-ingot",
        amount: 40,
      },
      {
        id: "steel-screw",
        amount: 10,
      },
      {
        id: "electronics",
        amount: 8,
      },
    ],
    bench: "fabricator",
  },
  {
    id: "electric-composter",
    name: "Electric Composter",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/8/89/ITEM_Electric_Composter.png/revision/latest?cb=20211224011130",
    url: "https://icarus.fandom.com/wiki/Electric_Composter",
    craft: [
      {
        id: "composites",
        amount: 20,
      },
      {
        id: "steel-ingot",
        amount: 60,
      },
      {
        id: "electronics",
        amount: 10,
      },
      {
        id: "concrete-mix",
        amount: 100,
      },
      {
        id: "steel-screw",
        amount: 20,
      },
    ],
    bench: "fabricator",
  },
  {
    id: "electric-deep-mining-drill",
    name: "Electric Deep-Mining Drill",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/0/03/ITEM_Electric_Deep-Mining_Drill.png/revision/latest?cb=20220304155553",
    url: "https://icarus.fandom.com/wiki/Electric_Deep-Mining_Drill",
    craft: [
      {
        id: "aluminium-ingot",
        amount: 25,
      },
      {
        id: "electronics",
        amount: 15,
      },
      {
        id: "steel-screw",
        amount: 12,
      },
      {
        id: "titanium-ingot",
        amount: 8,
      },
      {
        id: "carbon-fiber",
        amount: 8,
      },
    ],
    bench: "fabricator",
  },
  {
    id: "electric-dehumidifier",
    name: "Electric Dehumidifier",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/9/97/ITEM_Electric_Dehumidifier.png/revision/latest?cb=20211224011236",
    url: "https://icarus.fandom.com/wiki/Electric_Dehumidifier",
    craft: [
      {
        id: "aluminium-ingot",
        amount: 20,
      },
      {
        id: "glass",
        amount: 15,
      },
      {
        id: "composites",
        amount: 20,
      },
      {
        id: "steel-screw",
        amount: 12,
      },
      {
        id: "electronics",
        amount: 35,
      },
    ],
    bench: "Fabricator",
  },
  {
    id: "electric-extractor",
    name: "Electric Extractor",
    imageUrl: "",
    url: "https://icarus.fandom.com/wiki/Electric_Extractor",
    craft: [
      {
        id: "iron-ingot",
        amount: 20,
      },
      {
        id: "electronics",
        amount: 5,
      },
    ],
    bench: "fabricator",
  },
  {
    id: "electric-furnace",
    name: "Electric Furnace",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/e/e0/ITEM_Electric_Furnace.png/revision/latest?cb=20210916213205",
    url: "https://icarus.fandom.com/wiki/Electric_Furnace",
    craft: [
      {
        id: "steel-ingot",
        amount: 30,
      },
      {
        id: "glass",
        amount: 4,
      },
      {
        id: "electronics",
        amount: 60,
      },
      {
        id: "concrete-mix",
        amount: 80,
      },
      {
        id: "steel-screw",
        amount: 8,
      },
    ],
    bench: "fabricator",
  },
  {
    id: "electric-masonry-bench",
    name: "Electric Masonry Bench",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/5/50/ITEM_Electric_Masonry_Bench.png/revision/latest?cb=20211224011245",
    url: "https://icarus.fandom.com/wiki/Electric_Masonry_Bench",
    craft: [
      {
        id: "steel-ingot",
        amount: 60,
      },
      {
        id: "composites",
        amount: 6,
      },
      {
        id: "concrete-mix",
        amount: 100,
      },
      {
        id: "steel-screw",
        amount: 10,
      },
      {
        id: "electronics",
        amount: 8,
      },
    ],
    bench: "fabricator",
  },
  {
    id: "electric-radar",
    name: "Electric Radar",
    imageUrl: "",
    url: "https://icarus.fandom.com/wiki/Electric_Radar",
    craft: [
      {
        id: "composites",
        amount: 12,
      },
      {
        id: "glass",
        amount: 2,
      },
      {
        id: "electronics",
        amount: 10,
      },
      {
        id: "steel-screw",
        amount: 8,
      },
      {
        id: "steel-ingot",
        amount: 12,
      },
    ],
    bench: "fabricator",
  },
  {
    id: "electricity-tool",
    name: "Electricity Tool",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/3/32/ITEM_Electricity_Tool.png/revision/latest?cb=20220313071336",
    url: "https://icarus.fandom.com/wiki/Electricity_Tool",
    craft: [
      {
        id: "copper-ingot",
        amount: 20,
      },
      {
        id: "refined-gold",
        amount: 8,
      },
      {
        id: "carbon-fiber",
        amount: 4,
      },
    ],
    bench: "fabricator",
  },
  {
    id: "electronics",
    name: "Electronics",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/4/47/ITEM_Electronics.png/revision/latest?cb=20210916210404",
    url: "https://icarus.fandom.com/wiki/Electronics",
    craft: [
      {
        id: "refined-gold",
        amount: 1,
      },
      {
        id: "copper-ingot",
        amount: 3,
      },
      {
        id: "organic-resin",
        amount: 2,
      },
      {
        id: "epoxy",
        amount: 2,
      },
    ],
    bench: "machining-bench",
  },
  {
    id: "fabricator",
    name: "Fabricator",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/7/71/ITEM_Fabricator.png/revision/latest?cb=20210916213205",
    url: "https://icarus.fandom.com/wiki/Fabricator",
    craft: [
      {
        id: "steel-ingot",
        amount: 8,
      },
      {
        id: "aluminium-ingot",
        amount: 40,
      },
      {
        id: "electronics",
        amount: 60,
      },
      {
        id: "steel-screw",
        amount: 30,
      },
      {
        id: "concrete-mix",
        amount: 30,
      },
      {
        id: "carbon-fiber",
        amount: 8,
      },
    ],
    bench: "machining-bench",
  },
  {
    id: "fiber",
    name: "Fiber",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/6/6f/ITEM_Fiber.png/revision/latest?cb=20210919214005",
    url: "https://icarus.fandom.com/wiki/Fiber",
    craft: [],
  },
  {
    id: "fire-extinguisher",
    name: "Fire Extinguisher",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/7/77/ITEM_Fire_Extinguisher.png/revision/latest?cb=20210916211002",
    url: "https://icarus.fandom.com/wiki/Fire_Extinguisher",
    craft: [
      {
        id: "steel-ingot",
        amount: 20,
      },
      {
        id: "copper-ingot",
        amount: 4,
      },
      {
        id: "sulfur",
        amount: 8,
      },
      {
        id: "epoxy",
        amount: 4,
      },
      {
        id: "oxite",
        amount: 8,
      },
    ],
  },
  {
    id: "fire-whacker",
    name: "Fire Whacker",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/c/cf/ITEM_Fire_Whacker.png/revision/latest?cb=20210915232015",
    url: "https://icarus.fandom.com/wiki/Fire_Whacker",
    craft: [
      {
        id: "fiber",
        amount: 10,
      },
      {
        id: "stick",
        amount: 4,
      },
      {
        id: "stone",
        amount: 2,
      },
    ],
  },
  {
    id: "firepit",
    name: "Firepit",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/e/e6/ITEM_Firepit.png/revision/latest?cb=20210916003040",
    url: "https://icarus.fandom.com/wiki/Firepit",
    craft: [
      {
        id: "stone",
        amount: 100,
      },
      {
        id: "wood",
        amount: 25,
      },
    ],
  },
  {
    id: "fireplace",
    name: "Fireplace",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/6/62/ITEM_Fireplace.png/revision/latest?cb=20210916184555",
    url: "https://icarus.fandom.com/wiki/Fireplace",
    craft: [
      {
        id: "stone",
        amount: 120,
      },
      {
        id: "wood",
        amount: 30,
      },
    ],
  },
  {
    id: "fish-curry",
    name: "Fish Curry",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/4/46/ITEM_Fish_Curry.png/revision/latest?cb=20220313070858",
    url: "https://icarus.fandom.com/wiki/Fish_Curry",
    craft: [
      {
        id: "animal-fat",
        amount: 1,
      },
      {
        id: "soy-bean",
        amount: 1,
      },
      {
        id: "raw-fish",
        amount: 1,
      },
    ],
    bench: "potbelly-stove",
  },
  {
    id: "fishing-rod",
    name: "Fishing Rod",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/a/a7/ITEM_Fishing_Rod.png/revision/latest?cb=20210916203255",
    url: "https://icarus.fandom.com/wiki/Fishing_Rod",
    craft: [],
  },
  {
    id: "fishing-trap",
    name: "Fishing Trap",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/0/01/ITEM_Fishing_Trap.png/revision/latest?cb=20211019214217",
    url: "https://icarus.fandom.com/wiki/Fishing_Trap",
    craft: [],
  },
  {
    id: "flashlight",
    name: "Flashlight",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/0/0f/ITEM_Flashlight.png/revision/latest?cb=20210916211002",
    url: "https://icarus.fandom.com/wiki/Flashlight",
    craft: [
      {
        id: "electronics",
        amount: 2,
      },
      {
        id: "glass",
        amount: 4,
      },
      {
        id: "aluminium-ingot",
        amount: 4,
      },
      {
        id: "epoxy",
        amount: 4,
      },
    ],
    bench: "fabricator",
  },
  {
    id: "flatbread",
    name: "Flatbread",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/b/b9/ITEM_Flatbread.png/revision/latest?cb=20210916211951",
    url: "https://icarus.fandom.com/wiki/Flatbread",
    craft: [],
    bench: "campfire",
  },
  {
    id: "flatbread-dough",
    name: "Flatbread Dough",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/1/17/ITEM_Bread_Dough.png/revision/latest?cb=20210916205447",
    url: "https://icarus.fandom.com/wiki/Flatbread_Dough",
    craft: [
      {
        id: "flour",
        amount: 5,
      },
    ],
    bench: "herbalism-bench",
  },

  {
    id: "floor-torch",
    name: "Floor Torch",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/2/25/ITEM_Floor_Torch.png/revision/latest?cb=20210916184733",
    url: "https://icarus.fandom.com/wiki/Floor_Torch",
    craft: [
      {
        id: "fiber",
        amount: 20,
      },
      {
        id: "stick",
        amount: 8,
      },
      {
        id: "sulfur",
        amount: 8,
      },
    ],
    bench: "character-crafting",
  },
  {
    id: "flour",
    name: "Flour",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/e/e1/ITEM_Flour.png/revision/latest?cb=20211006151112",
    url: "https://icarus.fandom.com/wiki/Flour",
    craft: [
      {
        id: "wheat",
        amount: 10,
      },
    ],
    bench: "mortar-and-pestle",
  },

  {
    id: "frag-grenade",
    name: "Frag Grenade",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/4/4a/ITEM_Frag_Grenade.png/revision/latest?cb=20210916211002",
    url: "https://icarus.fandom.com/wiki/Frag_Grenade",
    craft: [
      {
        id: "iron-ingot",
        amount: 1,
      },
      {
        id: "gunpowder",
        amount: 10,
      },
      {
        id: "biofuel-can",
        amount: null,
      },
    ],
    bench: "Machining Bench",
  },
  {
    id: "fruit-pie",
    name: "Fruit Pie",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/4/4c/ITEM_Fruit_Pie.png/revision/latest?cb=20211224115813",
    url: "https://icarus.fandom.com/wiki/Fruit_Pie",
    craft: [
      {
        id: "pastry",
        amount: 1,
      },
      {
        id: "wild-berry",
        amount: 1,
      },
      {
        id: "watermelon",
        amount: 1,
      },
    ],
    bench: "biofuel-stove",
  },
  {
    id: "fruit-salad",
    name: "Fruit Salad",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/4/40/ITEM_Fruit_Salad.png/revision/latest?cb=20211224115845",
    url: "https://icarus.fandom.com/wiki/Fruit_Salad",
    craft: [
      {
        id: "wild-berry",
        amount: 1,
      },
      {
        id: "watermelon",
        amount: 1,
      },
    ],
    bench: "cooking-station",
  },
  {
    id: "fur",
    name: "Fur",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/d/df/ITEM_Fur.png/revision/latest?cb=20210915164417",
    url: "https://icarus.fandom.com/wiki/Fur",
    craft: [],
  },
  {
    id: "fur-arms-armor",
    name: "Fur Arms Armor",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/6/6a/ITEM_Fur_Arms_Armor.png/revision/latest?cb=20210916184042",
    url: "https://icarus.fandom.com/wiki/Fur_Arms_Armor",
    craft: [
      {
        id: "leather",
        amount: 4,
      },
      {
        id: "fur",
        amount: 8,
      },
      {
        id: "rope",
        amount: 2,
      },
    ],
    bench: "textiles-bench",
  },
  {
    id: "fur-chest-armor",
    name: "Fur Chest Armor",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/3/39/ITEM_Fur_Chest_Armor.png/revision/latest?cb=20210916183651",
    url: "https://icarus.fandom.com/wiki/Fur_Chest_Armor",
    craft: [
      {
        id: "leather",
        amount: 8,
      },
      {
        id: "fur",
        amount: 24,
      },
      {
        id: "rope",
        amount: 6,
      },
    ],
    bench: "textiles-bench",
  },
  {
    id: "fur-feet-armor",
    name: "Fur Feet Armor",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/4/45/ITEM_Fur_Feet_Armor.png/revision/latest?cb=20210916184043",
    url: "https://icarus.fandom.com/wiki/Fur_Feet_Armor",
    craft: [
      {
        id: "leather",
        amount: 6,
      },
      {
        id: "fur",
        amount: 12,
      },
      {
        id: "rope",
        amount: 4,
      },
    ],
    bench: "textiles-bench",
  },
  {
    id: "fur-head-armor",
    name: "Fur Head Armor",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/8/8e/ITEM_Fur_Head_Armor.png/revision/latest?cb=20210916184043",
    url: "https://icarus.fandom.com/wiki/Fur_Head_Armor",
    craft: [
      {
        id: "leather",
        amount: 4,
      },
      {
        id: "fur",
        amount: 12,
      },
      {
        id: "rope",
        amount: 4,
      },
    ],
    bench: "textiles-bench",
  },
  {
    id: "fur-legs-armor",
    name: "Fur Legs Armor",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/2/29/ITEM_Fur_Legs_Armor.png/revision/latest?cb=20210916184043",
    url: "https://icarus.fandom.com/wiki/Fur_Legs_Armor",
    craft: [
      {
        id: "leather",
        amount: 8,
      },
      {
        id: "fur",
        amount: 18,
      },
      {
        id: "rope",
        amount: 6,
      },
    ],
    bench: "textiles-bench",
  },
  {
    id: "ghillie-arms-armor",
    name: "Ghillie Arms Armor",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/c/c2/ITEM_Ghillie_Arms_Armor.png/revision/latest?cb=20210916184043",
    url: "https://icarus.fandom.com/wiki/Ghillie_Arms_Armor",
    craft: [
      {
        id: "fiber",
        amount: 120,
      },
      {
        id: "stick",
        amount: 4,
      },
      {
        id: "rope",
        amount: 2,
      },
    ],
    bench: "textiles-bench",
  },
  {
    id: "ghillie-chest-armor",
    name: "Ghillie Chest Armor",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/4/48/ITEM_Ghillie_Chest_Armor.png/revision/latest?cb=20210916184043",
    url: "https://icarus.fandom.com/wiki/Ghillie_Chest_Armor",
    craft: [
      {
        id: "fiber",
        amount: 160,
      },
      {
        id: "stick",
        amount: 8,
      },
      {
        id: "rope",
        amount: 6,
      },
    ],
    bench: "textiles-bench",
  },
  {
    id: "ghillie-feet-armor",
    name: "Ghillie Feet Armor",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/6/68/ITEM_Ghillie_Feet_Armor.png/revision/latest?cb=20210916184239",
    url: "https://icarus.fandom.com/wiki/Ghillie_Feet_Armor",
    craft: [
      {
        id: "fiber",
        amount: 80,
      },
      {
        id: "stick",
        amount: 6,
      },
      {
        id: "rope",
        amount: 4,
      },
    ],
    bench: "textiles-bench",
  },
  {
    id: "ghillie-head-armor",
    name: "Ghillie Head Armor",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/6/64/ITEM_Ghillie_Head_Armor.png/revision/latest?cb=20210916184239",
    url: "https://icarus.fandom.com/wiki/Ghillie_Head_Armor",
    craft: [
      {
        id: "fiber",
        amount: 120,
      },
      {
        id: "stick",
        amount: 2,
      },
      {
        id: "rope",
        amount: 4,
      },
    ],
    bench: "textiles-bench",
  },
  {
    id: "ghillie-legs-armor",
    name: "Ghillie Legs Armor",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/3/36/ITEM_Ghillie_Legs_Armor.png/revision/latest?cb=20210916184043",
    url: "https://icarus.fandom.com/wiki/Ghillie_Legs_Armor",
    craft: [
      {
        id: "fiber",
        amount: 160,
      },
      {
        id: "stick",
        amount: 8,
      },
      {
        id: "rope",
        amount: 6,
      },
    ],
    bench: "textiles-bench",
  },
  {
    id: "glass-beam",
    name: "Glass Beam",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/8/8d/ITEM_Glass_Beam.png/revision/latest?cb=20211224000110",
    url: "https://icarus.fandom.com/wiki/Glass_Beam",
    craft: [
      {
        id: "iron-ingot",
        amount: 6,
      },
      {
        id: "epoxy",
        amount: 12,
      },
    ],
    bench: "Glassworking Bench",
  },
  {
    id: "glass-door",
    name: "Glass Door",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/9/9f/ITEM_Glass_Door.png/revision/latest?cb=20210916185437",
    url: "https://icarus.fandom.com/wiki/Glass_Door",
    craft: [
      {
        id: "iron-ingot",
        amount: 6,
      },
      {
        id: "glass",
        amount: 20,
      },
      {
        id: "epoxy",
        amount: 12,
      },
    ],
    bench: "Glassworking Bench",
  },

  {
    id: "glassworking-bench",
    name: "Glassworking Bench",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/a/ac/ITEM_Glassworking_Bench.png/revision/latest?cb=20211112202241",
    url: "https://icarus.fandom.com/wiki/Glassworking_Bench",
    craft: [
      {
        id: "iron-ingot",
        amount: 24,
      },
      {
        id: "wood",
        amount: 10,
      },
      {
        id: "epoxy",
        amount: 6,
      },
      {
        id: "rope",
        amount: 6,
      },
      {
        id: "copper-nail",
        amount: 40,
      },
    ],
    bench: "Machining Bench",
  },

  {
    id: "gorse-flower",
    name: "Gorse Flower",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/2/2f/ITEM_Gorse_Flower.png/revision/latest?cb=20211224115846",
    url: "https://icarus.fandom.com/wiki/Gorse_Flower",
    craft: [],
  },
  {
    id: "gorse-tea",
    name: "Gorse Tea",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/c/ca/ITEM_Gorse_Tea.png/revision/latest?cb=20211219094238",
    url: "https://icarus.fandom.com/wiki/Gorse_Tea",
    craft: [],
  },
  {
    id: "grilled-pumpkin",
    name: "Grilled Pumpkin",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/0/02/ITEM_Grilled_Pumpkin.png/revision/latest?cb=20211224120200",
    url: "https://icarus.fandom.com/wiki/Grilled_Pumpkin",
    craft: [],
    bench: "campfire",
  },
  {
    id: "growth-fertilizer",
    name: "Growth Fertilizer",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/6/66/ITEM_Growth_Fertilizer.png/revision/latest?cb=20220313070842",
    url: "https://icarus.fandom.com/wiki/Growth_Fertilizer",
    craft: [
      {
        id: "silica-ore",
        amount: 1,
      },
      {
        id: "basic-fertilizer",
        amount: 5,
      },
    ],
    bench: "chemistry-bench",
  },
  {
    id: "gunpowder",
    name: "Gunpowder",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/1/1a/ITEM_Gunpowder.png/revision/latest?cb=20210916205915",
    url: "https://icarus.fandom.com/wiki/Gunpowder",
    craft: [
      {
        id: "sulfur",
        amount: 1,
      },
      {
        id: "charcoal",
        amount: 3,
      },
    ],
    bench: "mortar-and-pestle",
  },

  {
    id: "heat-bandage",
    name: "Heat Bandage",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/c/c1/ITEM_Heat_Bandage.png/revision/latest?cb=20220325105502",
    url: "https://icarus.fandom.com/wiki/Heat_Bandage",
    craft: [
      {
        id: "fiber",
        amount: 40,
      },
      {
        id: "oxite",
        amount: 4,
      },
      {
        id: "charcoal",
        amount: 10,
      },
    ],
    bench: "character-crafting",
  },
  {
    id: "heavy-air-conditioner",
    name: "Heavy Air Conditioner",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/3/34/ITEM_Heavy_Air_Conditioner.png/revision/latest?cb=20211224011251",
    url: "https://icarus.fandom.com/wiki/Heavy_Air_Conditioner",
    craft: [
      {
        id: "aluminium-ingot",
        amount: 40,
      },
      {
        id: "electronics",
        amount: 20,
      },
      {
        id: "steel-screw",
        amount: 8,
      },
      {
        id: "carbon-fiber",
        amount: 8,
      },
    ],
    bench: "fabricator",
  },

  {
    id: "heavy-heater",
    name: "Heavy Heater",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/4/44/ITEM_Heavy_Heater.png/revision/latest?cb=20211224011258",
    url: "https://icarus.fandom.com/wiki/Heavy_Heater",
    craft: [
      {
        id: "aluminium-ingot",
        amount: 40,
      },
      {
        id: "electronics",
        amount: 20,
      },
      {
        id: "steel-screw",
        amount: 8,
      },
      {
        id: "carbon-fiber",
        amount: 8,
      },
    ],
    bench: "fabricator",
  },

  {
    id: "herbalism-bench",
    name: "Herbalism Bench",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/4/44/ITEM_Herbalism_Bench.png/revision/latest?cb=20210916211520",
    url: "https://icarus.fandom.com/wiki/Herbalism_Bench",
    craft: [
      {
        id: "wood",
        amount: 50,
      },
      {
        id: "stick",
        amount: 20,
      },
      {
        id: "fiber",
        amount: 12,
      },
      {
        id: "stone",
        amount: 12,
      },
    ],
    bench: "Crafting Bench",
  },
  {
    id: "high-quality-fertilizer",
    name: "High-Quality Fertilizer",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/8/82/ITEM_High-Quality_Fertilizer.png/revision/latest?cb=20220313070842",
    url: "https://icarus.fandom.com/wiki/High-Quality_Fertilizer",
    craft: [
      {
        id: "sulfur",
        amount: 1,
      },
      {
        id: "basic-fertilizer",
        amount: 5,
      },
    ],
    bench: "chemistry-bench",
  },
  {
    id: "hot-cocoa",
    name: "Hot Cocoa",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/c/ce/ITEM_Hot_Cocoa.png/revision/latest?cb=20211219094257",
    url: "https://icarus.fandom.com/wiki/Hot_Cocoa",
    craft: [],
  },
  {
    id: "hot-coffee",
    name: "Hot Coffee",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/d/d3/ITEM_Hot_Coffee.png/revision/latest?cb=20211219094151",
    url: "https://icarus.fandom.com/wiki/Hot_Coffee",
    craft: [],
  },
  {
    id: "hot-tea",
    name: "Hot Tea",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/1/19/ITEM_Hot_Tea.png/revision/latest?cb=20211219094316",
    url: "https://icarus.fandom.com/wiki/Hot_Tea",
    craft: [],
  },
  {
    id: "hunter-arms-armor",
    name: "Hunter Arms Armor",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/8/83/ITEM_Hunter_Arms_Armor.png/revision/latest?cb=20211224002842",
    url: "https://icarus.fandom.com/wiki/Hunter_Arms_Armor",
    craft: [
      {
        id: "platinum-weave",
        amount: 2,
      },
      {
        id: "cured-leather",
        amount: 4,
      },
      {
        id: "epoxy",
        amount: 4,
      },
    ],
    bench: "advanced-textiles-bench",
  },
  {
    id: "hunter-chest-armor",
    name: "Hunter Chest Armor",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/2/27/ITEM_Hunter_Chest_Armor.png/revision/latest?cb=20211224002854",
    url: "https://icarus.fandom.com/wiki/Hunter_Chest_Armor",
    craft: [
      {
        id: "platinum-weave",
        amount: 5,
      },
      {
        id: "cured-leather",
        amount: 6,
      },
      {
        id: "rope",
        amount: 6,
      },
      {
        id: "epoxy",
        amount: 16,
      },
    ],
    bench: "machining-bench",
  },
  {
    id: "hunter-feet-armor",
    name: "Hunter Feet Armor",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/6/62/ITEM_Hunter_Feet_Armor.png/revision/latest?cb=20211224002817",
    url: "https://icarus.fandom.com/wiki/Hunter_Feet_Armor",
    craft: [
      {
        id: "platinum-weave",
        amount: 1,
      },
      {
        id: "cured-leather",
        amount: 2,
      },
      {
        id: "rope",
        amount: 4,
      },
      {
        id: "epoxy",
        amount: 4,
      },
    ],
    bench: "advanced-textiles-bench",
  },
  {
    id: "hunter-head-armor",
    name: "Hunter Head Armor",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/b/b6/ITEM_Hunter_Head_Armor.png/revision/latest?cb=20211224002906",
    url: "https://icarus.fandom.com/wiki/Hunter_Head_Armor",
    craft: [
      {
        id: "platinum-weave",
        amount: 2,
      },
      {
        id: "cured-leather",
        amount: 3,
      },
      {
        id: "rope",
        amount: 4,
      },
      {
        id: "epoxy",
        amount: 8,
      },
    ],
    bench: "advanced-textiles-bench",
  },
  {
    id: "hunter-legs-armor",
    name: "Hunter Legs Armor",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/5/5d/ITEM_Hunter_Legs_Armor.png/revision/latest?cb=20211224002830",
    url: "https://icarus.fandom.com/wiki/Hunter_Legs_Armor",
    craft: [
      {
        id: "platinum-weave",
        amount: 4,
      },
      {
        id: "cured-leather",
        amount: 4,
      },
      {
        id: "rope",
        amount: 6,
      },
      {
        id: "epoxy",
        amount: 8,
      },
    ],
    bench: "advanced-textiles-bench",
  },
  {
    id: "hunting-rifle",
    name: "Hunting Rifle",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/9/90/ITEM_Hunting_Rifle.png/revision/latest?cb=20210916203841",
    url: "https://icarus.fandom.com/wiki/Hunting_Rifle",
    craft: [
      {
        id: "wood",
        amount: 12,
      },
      {
        id: "leather",
        amount: 8,
      },
      {
        id: "titanium-ingot",
        amount: 40,
      },
      {
        id: "epoxy",
        amount: 4,
      },
      {
        id: "steel-screw",
        amount: 16,
      },
    ],
    bench: "Fabricator",
  },
  {
    id: "hydroponic-crop-plot",
    name: "Hydroponic Crop Plot",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/0/0c/ITEM_Hydroponic_Crop_Plot.png/revision/latest?cb=20220313070842",
    url: "https://icarus.fandom.com/wiki/Hydroponic_Crop_Plot",
    craft: [
      {
        id: "composites",
        amount: 20,
      },
      {
        id: "steel-ingot",
        amount: 25,
      },
      {
        id: "steel-screw",
        amount: 10,
      },
      {
        id: "electronics",
        amount: 10,
      },
    ],
    bench: "fabricator",
  },
  {
    id: "ice",
    name: "Ice",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/b/b4/ITEM_Ice.png/revision/latest?cb=20211114000522",
    url: "https://icarus.fandom.com/wiki/Ice",
    craft: [],
  },
  {
    id: "ice-box",
    name: "Ice Box",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/1/1f/ITEM_Ice_Box.png/revision/latest?cb=20210916211521",
    url: "https://icarus.fandom.com/wiki/Ice_Box",
    craft: [
      {
        id: "wood",
        amount: 40,
      },
      {
        id: "leather",
        amount: 24,
      },
      {
        id: "iron-ingot",
        amount: 8,
      },
    ],
  },
  {
    id: "interior-wood-beam",
    name: "Interior Wood Beam",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/1/12/ITEM_Interior_Wood_Beam.png/revision/latest?cb=20210916190650",
    url: "https://icarus.fandom.com/wiki/Interior_Wood_Beam",
    craft: [
      {
        id: "refined-wood",
        amount: 6,
      },
      {
        id: "copper-nail",
        amount: 4,
      },
    ],
  },
  {
    id: "interior-wood-cupboard",
    name: "Interior Wood Cupboard",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/4/45/ITEM_Interior_Wood_Cupboard.png/revision/latest?cb=20210916184733",
    url: "https://icarus.fandom.com/wiki/Interior_Wood_Cupboard",
    craft: [
      {
        id: "refined-wood",
        amount: 40,
      },
      {
        id: "rope",
        amount: 8,
      },
      {
        id: "leather",
        amount: 8,
      },
      {
        id: "copper-nail",
        amount: 20,
      },
    ],
    bench: "carpentry-bench",
  },
  {
    id: "interior-wood-door",
    name: "Interior Wood Door",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/b/bb/ITEM_Interior_Wood_Door.png/revision/latest?cb=20220109063638",
    url: "https://icarus.fandom.com/wiki/Interior_Wood_Door",
    craft: [
      {
        id: "rope",
        amount: 8,
      },
      {
        id: "refined-wood",
        amount: 10,
      },
      {
        id: "copper-nail",
        amount: 6,
      },
    ],
  },
  {
    id: "interior-wood-floor",
    name: "Interior Wood Floor",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/4/42/ITEM_Interior_Wood_Floor.png/revision/latest?cb=20211224000605",
    url: "https://icarus.fandom.com/wiki/Interior_Wood_Floor",
    craft: [
      {
        id: "refined-wood",
        amount: 20,
      },
      {
        id: "copper-nail",
        amount: 4,
      },
    ],
  },

  {
    id: "interior-wood-halfpieces",
    name: "Interior Wood Halfpieces",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/6/62/ITEM_Interior_Wood_Halfpieces.png/revision/latest?cb=20211224000627",
    url: "https://icarus.fandom.com/wiki/Interior_Wood_Halfpieces",
    craft: [
      {
        id: "refined-wood",
        amount: 20,
      },
      {
        id: "copper-nail",
        amount: 4,
      },
    ],
  },
  {
    id: "interior-wood-halfpitches",
    name: "Interior Wood Halfpitches",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/1/14/ITEM_Interior_Wood_Halfpitches.png/revision/latest?cb=20211224000640",
    url: "https://icarus.fandom.com/wiki/Interior_Wood_Halfpitches",
    craft: [
      {
        id: "refined-wood",
        amount: 20,
      },
      {
        id: "copper-nail",
        amount: 4,
      },
    ],
  },
  {
    id: "interior-wood-ladder",
    name: "Interior Wood Ladder",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/1/1f/ITEM_Interior_Wood_Ladder.png/revision/latest?cb=20210916184733",
    url: "https://icarus.fandom.com/wiki/Interior_Wood_Ladder",
    craft: [
      {
        id: "refined-wood",
        amount: 10,
      },
      {
        id: "copper-nail",
        amount: 6,
      },
    ],
  },
  {
    id: "interior-wood-railing",
    name: "Interior Wood Railing",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/4/42/ITEM_Interior_Wood_Railing.png/revision/latest?cb=20211224002125",
    url: "https://icarus.fandom.com/wiki/Interior_Wood_Railing",
    craft: [
      {
        id: "refined-wood",
        amount: 8,
      },
      {
        id: "copper-nail",
        amount: 4,
      },
    ],
  },
  {
    id: "interior-wood-ramp",
    name: "Interior Wood Ramp",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/d/de/ITEM_Interior_Wood_Ramp.png/revision/latest?cb=20211224000652",
    url: "https://icarus.fandom.com/wiki/Interior_Wood_Ramp",
    craft: [
      {
        id: "refined-wood",
        amount: 20,
      },
      {
        id: "copper-nail",
        amount: 4,
      },
    ],
  },

  {
    id: "iron-axe",
    name: "Iron Axe",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/d/dc/ITEM_Iron_Axe.png/revision/latest?cb=20210916181424",
    url: "https://icarus.fandom.com/wiki/Iron_Axe",
    craft: [
      {
        id: "wood",
        amount: 5,
      },
      {
        id: "leather",
        amount: 4,
      },
      {
        id: "iron-ingot",
        amount: 6,
      },
      {
        id: "iron-nail",
        amount: 2,
      },
    ],
  },
  {
    id: "iron-crop-plot",
    name: "Iron Crop Plot",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/3/32/ITEM_Iron_Crop_Plot.png/revision/latest?cb=20220313070842",
    url: "https://icarus.fandom.com/wiki/Iron_Crop_Plot",
    craft: [
      {
        id: "iron-ingot",
        amount: 10,
      },
      {
        id: "copper-ingot",
        amount: 4,
      },
      {
        id: "sulfur",
        amount: 12,
      },
      {
        id: "steel-screw",
        amount: 8,
      },
    ],
    bench: "machining-bench",
  },
  {
    id: "iron-cupboard",
    name: "Iron Cupboard",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/c/c7/ITEM_Iron_Cupboard.png/revision/latest?cb=20210916185437",
    url: "https://icarus.fandom.com/wiki/Iron_Cupboard",
    craft: [
      {
        id: "iron-ingot",
        amount: 40,
      },
      {
        id: "rope",
        amount: 4,
      },
      {
        id: "epoxy",
        amount: 12,
      },
    ],
    bench: "machining-bench",
  },
  {
    id: "iron-hammer",
    name: "Iron Hammer",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/b/be/ITEM_Iron_Hammer.png/revision/latest?cb=20211101165953",
    url: "https://icarus.fandom.com/wiki/Iron_Hammer",
    craft: [
      {
        id: "wood",
        amount: 4,
      },
      {
        id: "leather",
        amount: 4,
      },
      {
        id: "iron-ingot",
        amount: 10,
      },
    ],
    bench: "anvil-bench",
  },
  {
    id: "iron-ingot",
    name: "Iron Ingot",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/c/ce/ITEM_Iron_Ingot.png/revision/latest?cb=20211223230236",
    url: "https://icarus.fandom.com/wiki/Iron_Ingot",
    craft: [
      {
        id: "iron-ore",
        amount: 2,
      },
    ],
    bench: "Stone Furnace",
  },
  {
    id: "iron-knife",
    name: "Iron Knife",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/c/c4/ITEM_Iron_Knife.png/revision/latest?cb=20210915182240",
    url: "https://icarus.fandom.com/wiki/Iron_Knife",
    craft: [
      {
        id: "wood",
        amount: 5,
      },
      {
        id: "leather",
        amount: 4,
      },
      {
        id: "iron-ingot",
        amount: 6,
      },
      {
        id: "iron-nail",
        amount: 2,
      },
    ],
    bench: "anvil-bench",
  },
  {
    id: "iron-ore",
    name: "Iron Ore",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/6/68/ITEM_Iron_Ore.png/revision/latest?cb=20211112195852",
    url: "https://icarus.fandom.com/wiki/Iron_Ore",
    craft: [],
  },
  {
    id: "iron-pickaxe",
    name: "Iron Pickaxe",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/6/6d/ITEM_Iron_Pickaxe.png/revision/latest?cb=20210916181424",
    url: "https://icarus.fandom.com/wiki/Iron_Pickaxe",
    craft: [
      {
        id: "wood",
        amount: 5,
      },
      {
        id: "leather",
        amount: 4,
      },
      {
        id: "iron-ingot",
        amount: 6,
      },
    ],
    bench: "anvil-bench",
  },
  {
    id: "iron-sickle",
    name: "Iron Sickle",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/9/9a/ITEM_Iron_Sickle.png/revision/latest?cb=20210916181424",
    url: "https://icarus.fandom.com/wiki/Iron_Sickle",
    craft: [
      {
        id: "wood",
        amount: 4,
      },
      {
        id: "leather",
        amount: 4,
      },
      {
        id: "iron-ingot",
        amount: 10,
      },
    ],
    bench: "Anvil Bench",
  },

  {
    id: "kitchen-bench",
    name: "Kitchen Bench",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/4/4c/ITEM_Kitchen_Bench.png/revision/latest?cb=20211114001409",
    url: "https://icarus.fandom.com/wiki/Kitchen_Bench",
    craft: [],
    bench: "machining-bench",
  },
  {
    id: "kitchen-storage-block",
    name: "Kitchen Storage Block",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/a/af/ITEM_Kitchen_Storage_Block.png/revision/latest?cb=20211114001407",
    url: "https://icarus.fandom.com/wiki/Kitchen_Storage_Block",
    craft: [
      {
        id: "refined-wood",
        amount: 30,
      },
      {
        id: "iron-ingot",
        amount: 2,
      },
      {
        id: "epoxy",
        amount: 20,
      },
      {
        id: "copper-nail",
        amount: 12,
      },
    ],
    bench: "machining-bench",
  },
  {
    id: "lantern",
    name: "Lantern",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/b/b9/ITEM_Lantern.png/revision/latest?cb=20210916210517",
    url: "https://icarus.fandom.com/wiki/Lantern",
    craft: [
      {
        id: "iron-ingot",
        amount: 8,
      },
      {
        id: "rope",
        amount: 4,
      },
      {
        id: "glass",
        amount: 12,
      },
    ],
    bench: "crafting-bench",
  },
  {
    id: "leather",
    name: "Leather",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/d/db/ITEM_Leather.png/revision/latest?cb=20210915164428",
    url: "https://icarus.fandom.com/wiki/Leather",
    craft: [],
  },
  {
    id: "leather-arms-armor",
    name: "Leather Arms Armor",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/f/f2/ITEM_Leather_Arms_Armor.png/revision/latest?cb=20210916184239",
    url: "https://icarus.fandom.com/wiki/Leather_Arms_Armor",
    craft: [
      {
        id: "fiber",
        amount: 40,
      },
      {
        id: "leather",
        amount: 8,
      },
    ],
    bench: "textiles-bench",
  },

  {
    id: "leather-backpack",
    name: "Leather Backpack",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/c/c1/ITEM_Leather_Backpack.png/revision/latest?cb=20220305171151",
    url: "https://icarus.fandom.com/wiki/Leather_Backpack",
    craft: [
      {
        id: "rope",
        amount: 8,
      },
      {
        id: "leather",
        amount: 20,
      },
      {
        id: "fiber",
        amount: 10,
      },
    ],
    bench: "textiles-bench",
  },
  {
    id: "leather-chest-armor",
    name: "Leather Chest Armor",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/0/0c/ITEM_Leather_Chest_Armor.png/revision/latest?cb=20210916184239",
    url: "https://icarus.fandom.com/wiki/Leather_Chest_Armor",
    craft: [
      {
        id: "fiber",
        amount: 60,
      },
      {
        id: "leather",
        amount: 24,
      },
    ],
    bench: "textiles-bench",
  },
  {
    id: "leather-curtain-door",
    name: "Leather Curtain Door",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/3/3e/ITEM_Leather_Curtain_Door.png/revision/latest?cb=20211224002200",
    url: "https://icarus.fandom.com/wiki/Leather_Curtain_Door",
    craft: [
      {
        id: "fiber",
        amount: 20,
      },
      {
        id: "wood",
        amount: 5,
      },
      {
        id: "leather",
        amount: 15,
      },
    ],
    bench: "crafting-bench",
  },

  {
    id: "leather-feet-armor",
    name: "Leather Feet Armor",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/e/ef/ITEM_Leather_Feet_Armor.png/revision/latest?cb=20210916184239",
    url: "https://icarus.fandom.com/wiki/Leather_Feet_Armor",
    craft: [
      {
        id: "fiber",
        amount: 20,
      },
      {
        id: "leather",
        amount: 12,
      },
    ],
    bench: "textiles-bench",
  },
  {
    id: "leather-head-armor",
    name: "Leather Head Armor",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/7/7f/ITEM_Leather_Head_Armor.png/revision/latest?cb=20210916184239",
    url: "https://icarus.fandom.com/wiki/Leather_Head_Armor",
    craft: [
      {
        id: "fiber",
        amount: 40,
      },
      {
        id: "leather",
        amount: 12,
      },
    ],
    bench: "textiles-bench",
  },
  {
    id: "leather-legs-armor",
    name: "Leather Legs Armor",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/3/34/ITEM_Leather_Legs_Armor.png/revision/latest?cb=20210916184239",
    url: "https://icarus.fandom.com/wiki/Leather_Legs_Armor",
    craft: [
      {
        id: "fiber",
        amount: 60,
      },
      {
        id: "leather",
        amount: 18,
      },
    ],
    bench: "textiles-bench",
  },
  {
    id: "lightning-rod",
    name: "Lightning Rod",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/6/6c/ITEM_Lightning_Rod.png/revision/latest?cb=20211224145424",
    url: "https://icarus.fandom.com/wiki/Lightning_Rod",
    craft: [
      {
        id: "copper-ingot",
        amount: 10,
      },
    ],
    bench: "crafting-bench",
  },

  {
    id: "lily",
    name: "Lily",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/8/88/ITEM_Lily.png/revision/latest/scale-to-width-down/350?cb=20211223225416",
    url: "https://icarus.fandom.com/wiki/Lily",
    craft: [],
  },
  {
    id: "longbow",
    name: "Longbow",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/a/ac/ITEM_Longbow.png/revision/latest?cb=20210916203841",
    url: "https://icarus.fandom.com/wiki/Longbow",
    craft: [
      {
        id: "wood",
        amount: 24,
      },
      {
        id: "leather",
        amount: 32,
      },
      {
        id: "bone",
        amount: 4,
      },
    ],
    bench: "Crafting Bench",
  },
  {
    id: "machete",
    name: "Machete",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/1/1a/ITEM_Machete.png/revision/latest?cb=20210916203255",
    url: "https://icarus.fandom.com/wiki/Machete",
    craft: [
      {
        id: "iron-ingot",
        amount: 12,
      },
      {
        id: "wood",
        amount: 4,
      },
      {
        id: "epoxy",
        amount: 4,
      },
      {
        id: "steel-screw",
        amount: 2,
      },
    ],
    bench: "fabricator",
  },
  {
    id: "machining-bench",
    name: "Machining Bench",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/1/13/ITEM_Machining_Bench.png/revision/latest?cb=20210916211521",
    url: "https://icarus.fandom.com/wiki/Machining_Bench",
    craft: [
      {
        id: "wood",
        amount: 20,
      },
      {
        id: "stone",
        amount: 12,
      },
      {
        id: "iron-nail",
        amount: 120,
      },
      {
        id: "iron-ingot",
        amount: 40,
      },
      {
        id: "epoxy",
        amount: 10,
      },
      {
        id: "rope",
        amount: 24,
      },
    ],
  },

  {
    id: "masonry-bench",
    name: "Masonry Bench",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/1/18/ITEM_Masonry_Bench.png/revision/latest?cb=20210916213015",
    url: "https://icarus.fandom.com/wiki/Masonry_Bench",
    craft: [
      {
        id: "wood",
        amount: 80,
      },
      {
        id: "leather",
        amount: 12,
      },
      {
        id: "iron-nail",
        amount: 120,
      },
      {
        id: "rope",
        amount: 12,
      },
    ],
    bench: "crafting-bench",
  },
  {
    id: "material-processor",
    name: "Material Processor",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/b/b3/ITEM_Material_Processor.png/revision/latest?cb=20210916213206",
    url: "https://icarus.fandom.com/wiki/Material_Processor",
    craft: [
      {
        id: "aluminium-ingot",
        amount: 30,
      },
      {
        id: "electronics",
        amount: 80,
      },
      {
        id: "steel-screw",
        amount: 12,
      },
      {
        id: "titanium-ingot",
        amount: 8,
      },
      {
        id: "carbon-fiber",
        amount: 8,
      },
    ],
    bench: "fabricator",
  },
  {
    id: "mature-coconut",
    name: "Mature Coconut",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/7/7a/ITEM_Mature_Coconut.png/revision/latest?cb=20211224115844",
    url: "https://icarus.fandom.com/wiki/Mature_Coconut",
    craft: [],
  },
  {
    id: "meat-pie",
    name: "Meat Pie",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/c/c3/ITEM_Meat_Pie.png/revision/latest?cb=20211224115845",
    url: "https://icarus.fandom.com/wiki/Meat_Pie",
    craft: [
      {
        id: "pastry",
        amount: 1,
      },
      {
        id: "mushroom",
        amount: 1,
      },
      {
        id: "pumpkin",
        amount: 1,
      },
      {
        id: "raw-meat",
        amount: 1,
      },
    ],
    bench: "biofuel-stove",
  },
  {
    id: "medium-interior-wood-crate",
    name: "Medium Interior Wood Crate",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/a/ab/ITEM_Medium_Interior_Wood_Crate.png/revision/latest?cb=20210916184555",
    url: "https://icarus.fandom.com/wiki/Medium_Interior_Wood_Crate",
    craft: [
      {
        id: "refined-wood",
        amount: 32,
      },
      {
        id: "rope",
        amount: 8,
      },
      {
        id: "copper-nail",
        amount: 10,
      },
    ],
    bench: "carpentry-bench",
  },
  {
    id: "medium-iron-crate",
    name: "Medium Iron Crate",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/1/16/ITEM_Medium_Iron_Crate.png/revision/latest?cb=20210916190549",
    url: "https://icarus.fandom.com/wiki/Medium_Iron_Crate",
    craft: [
      {
        id: "iron-ingot",
        amount: 32,
      },
      {
        id: "epoxy",
        amount: 8,
      },
    ],
    bench: "machining-bench",
  },
  {
    id: "medium-wood-crate",
    name: "Medium Wood Crate",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/8/89/ITEM_Medium_Wood_Crate.png/revision/latest?cb=20210916202649",
    url: "https://icarus.fandom.com/wiki/Medium_Wood_Crate",
    craft: [
      {
        id: "fiber",
        amount: 32,
      },
      {
        id: "wood",
        amount: 32,
      },
    ],
    bench: "character-crafting",
  },
  {
    id: "medium-wood-hedgehog",
    name: "Medium Wood Hedgehog",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/7/74/ITEM_Medium_Wood_Hedgehog.png/revision/latest?cb=20210916185416",
    url: "https://icarus.fandom.com/wiki/Medium_Wood_Hedgehog",
    craft: [
      {
        id: "wood",
        amount: 60,
      },
      {
        id: "rope",
        amount: 4,
      },
    ],
    bench: "carpentry-bench",
  },

  {
    id: "metal-oxite-dissolver",
    name: "Metal Oxite Dissolver",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/c/ca/ITEM_Metal_Oxite_Dissolver.png/revision/latest?cb=20210916215335",
    url: "https://icarus.fandom.com/wiki/Metal_Oxite_Dissolver",
    craft: [
      {
        id: "steel-ingot",
        amount: 12,
      },
      {
        id: "glass",
        amount: 4,
      },
      {
        id: "copper-ingot",
        amount: 24,
      },
      {
        id: "epoxy",
        amount: 12,
      },
      {
        id: "electronics",
        amount: 20,
      },
    ],
  },
  {
    id: "mortar-and-pestle",
    name: "Mortar and Pestle",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/4/4f/ITEM_Mortar_and_Pestle.png/revision/latest?cb=20210916211521",
    url: "https://icarus.fandom.com/wiki/Mortar_and_Pestle",
    craft: [
      {
        id: "silica-ore",
        amount: 4,
      },
      {
        id: "stone",
        amount: 12,
      },
    ],
    bench: "crafting-bench",
  },
  {
    id: "mushroom-soup",
    name: "Mushroom Soup",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/6/60/ITEM_Mushroom_Soup.png/revision/latest?cb=20211224115845",
    url: "https://icarus.fandom.com/wiki/Mushroom_Soup",
    craft: [
      {
        id: "water",
        amount: 100,
      },
      {
        id: "mushroom",
        amount: 1,
      },
    ],
    bench: "campfire",
  },

  {
    id: "omnidirectional-worklamp",
    name: "Omnidirectional Worklamp",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/a/af/ITEM_Omnidirectional_Worklamp.png/revision/latest?cb=20211224011142",
    url: "https://icarus.fandom.com/wiki/Omnidirectional_Worklamp",
    craft: [
      {
        id: "aluminium-ingot",
        amount: 20,
      },
      {
        id: "glass",
        amount: 5,
      },
      {
        id: "composites",
        amount: 10,
      },
      {
        id: "electronics",
        amount: 2,
      },
    ],
    bench: "fabricator",
  },
  {
    id: "organic-resin",
    name: "Organic Resin",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/8/84/ITEM_Organic_Resin.png/revision/latest?cb=20210916205915",
    url: "https://icarus.fandom.com/wiki/Organic_Resin",
    craft: [
      {
        id: "wood",
        amount: 1,
      },
      {
        id: "oxite",
        amount: 1,
      },
    ],
    bench: "mortar-and-pestle",
  },
  {
    id: "oxidizer",
    name: "Oxidizer",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/e/e5/ITEM_Oxidizer.png/revision/latest?cb=20211114002200",
    url: "https://icarus.fandom.com/wiki/Oxidizer",
    craft: [
      {
        id: "bone",
        amount: 10,
      },
      {
        id: "leather",
        amount: 20,
      },
      {
        id: "fiber",
        amount: 24,
      },
      {
        id: "stick",
        amount: 8,
      },
    ],
    bench: "character-crafting",
  },
  {
    id: "oxite-dissolver",
    name: "Oxite Dissolver",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/d/d0/ITEM_Oxite_Dissolver.png/revision/latest?cb=20210916211521",
    url: "https://icarus.fandom.com/wiki/Oxite_Dissolver",
    craft: [
      {
        id: "wood",
        amount: 12,
      },
      {
        id: "leather",
        amount: 80,
      },
      {
        id: "bone",
        amount: 12,
      },
    ],
  },
  {
    id: "oxygen-bladder",
    name: "Oxygen Bladder",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/9/97/ITEM_Oxygen_Bladder.png/revision/latest?cb=20210916210517",
    url: "https://icarus.fandom.com/wiki/Oxygen_Bladder",
    craft: [
      {
        id: "fiber",
        amount: 20,
      },
      {
        id: "leather",
        amount: 30,
      },
      {
        id: "bone",
        amount: 8,
      },
    ],
    bench: "crafting-bench",
  },

  {
    id: "oxygen-tank",
    name: "Oxygen Tank",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/6/6b/ITEM_Oxygen_Tank.png/revision/latest?cb=20210916210709",
    url: "https://icarus.fandom.com/wiki/Oxygen_Tank",
    craft: [
      {
        id: "steel-ingot",
        amount: 20,
      },
      {
        id: "epoxy",
        amount: 4,
      },
    ],
    bench: "machining-bench",
  },
  {
    id: "pastry",
    name: "Pastry",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/2/27/ITEM_Pastry.png/revision/latest?cb=20211224115845",
    url: "https://icarus.fandom.com/wiki/Pastry",
    craft: [
      {
        id: "animal-fat",
        amount: 1,
      },
      {
        id: "flour",
        amount: 1,
      },
      {
        id: "water",
        amount: null,
      },
    ],
    bench: "kitchen-bench",
  },
  {
    id: "pickled-carrot",
    name: "Pickled Carrot",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/9/9f/ITEM_Pickled_Carrot.png/revision/latest?cb=20211224115845",
    url: "https://icarus.fandom.com/wiki/Pickled_Carrot",
    craft: [],
    bench: "kitchen-bench",
  },
  {
    id: "pistol",
    name: "Pistol",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/c/c1/ITEM_Pistol.png/revision/latest?cb=20211224011304",
    url: "https://icarus.fandom.com/wiki/Pistol",
    craft: [
      {
        id: "wood",
        amount: 6,
      },
      {
        id: "leather",
        amount: 8,
      },
      {
        id: "steel-ingot",
        amount: 20,
      },
      {
        id: "epoxy",
        amount: 4,
      },
      {
        id: "steel-screw",
        amount: 8,
      },
    ],
    bench: "Machining Bench",
  },

  {
    id: "platinum-axe",
    name: "Platinum Axe",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/7/7e/ITEM_Platinum_Axe.png/revision/latest?cb=20211113183513",
    url: "https://icarus.fandom.com/wiki/Platinum_Axe",
    craft: [
      {
        id: "wood",
        amount: 2,
      },
      {
        id: "leather",
        amount: 4,
      },
      {
        id: "platinum-ingot",
        amount: 12,
      },
    ],
    bench: "Machining Bench",
  },
  {
    id: "platinum-hammer",
    name: "Platinum Hammer",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/6/6e/ITEM_Platinum_Hammer.png/revision/latest?cb=20211113183529",
    url: "https://icarus.fandom.com/wiki/Platinum_Hammer",
    craft: [
      {
        id: "wood",
        amount: 5,
      },
      {
        id: "epoxy",
        amount: 4,
      },
      {
        id: "platinum-ingot",
        amount: 6,
      },
      {
        id: "steel-screw",
        amount: 2,
      },
    ],
    bench: "Machining Bench",
  },
  {
    id: "platinum-ingot",
    name: "Platinum Ingot",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/3/3d/ITEM_Platinum_Ingot.png/revision/latest?cb=20211110174013",
    url: "https://icarus.fandom.com/wiki/Platinum_Ingot",
    craft: [
      {
        id: "platinum-ore",
        amount: 5,
      },
    ],
    bench: "Concrete Furnace",
  },
  {
    id: "platinum-knife",
    name: "Platinum Knife",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/c/ca/ITEM_Platinum_Knife.png/revision/latest?cb=20211113183542",
    url: "https://icarus.fandom.com/wiki/Platinum_Knife",
    craft: [
      {
        id: "wood",
        amount: 2,
      },
      {
        id: "leather",
        amount: 4,
      },
      {
        id: "platinum-ingot",
        amount: 12,
      },
    ],
    bench: "machining-bench",
  },
  {
    id: "platinum-pickaxe",
    name: "Platinum Pickaxe",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/4/47/ITEM_Platinum_Pickaxe.png/revision/latest?cb=20211101203852",
    url: "https://icarus.fandom.com/wiki/Platinum_Pickaxe",
    craft: [
      {
        id: "wood",
        amount: 2,
      },
      {
        id: "leather",
        amount: 4,
      },
      {
        id: "platinum-ingot",
        amount: 12,
      },
    ],
    bench: "Machining Bench",
  },
  {
    id: "platinum-sickle",
    name: "Platinum Sickle",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/a/ab/ITEM_Platinum_Sickle.png/revision/latest?cb=20211113183556",
    url: "https://icarus.fandom.com/wiki/Platinum_Sickle",
    craft: [
      {
        id: "wood",
        amount: 4,
      },
      {
        id: "stick",
        amount: 2,
      },
      {
        id: "platinum-ingot",
        amount: 10,
      },
    ],
    bench: "Machining Bench",
  },

  {
    id: "platinum-weave",
    name: "Platinum Weave",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/8/85/ITEM_Platinum_Weave.png/revision/latest?cb=20221018024308",
    url: "https://icarus.fandom.com/wiki/Platinum_Weave",
    craft: [
      {
        id: "fiber",
        amount: 30,
      },
      {
        id: "platinum-ingot",
        amount: 1,
      },
    ],
    bench: "advanced-textiles-bench",
  },

  {
    id: "polar-bear-arms-armor",
    name: "Polar Bear Arms Armor",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/5/57/ITEM_Polar_Bear_Arms_Armor.png/revision/latest?cb=20210929211605",
    url: "https://icarus.fandom.com/wiki/Polar_Bear_Arms_Armor",
    craft: [
      {
        id: "leather",
        amount: 6,
      },
      {
        id: "polar-bear-pelt",
        amount: 8,
      },
      {
        id: "rope",
        amount: 4,
      },
    ],
    bench: "textiles-bench",
  },
  {
    id: "polar-bear-chest-armor",
    name: "Polar Bear Chest Armor",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/9/97/ITEM_Polar_Bear_Chest_Armor.png/revision/latest?cb=20210929211605",
    url: "https://icarus.fandom.com/wiki/Polar_Bear_Chest_Armor",
    craft: [
      {
        id: "leather",
        amount: 10,
      },
      {
        id: "polar-bear-pelt",
        amount: 20,
      },
      {
        id: "rope",
        amount: 6,
      },
    ],
    bench: "textiles-bench",
  },
  {
    id: "polar-bear-feet-armor",
    name: "Polar Bear Feet Armor",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/c/c0/ITEM_Polar_Bear_Feet_Armor.png/revision/latest?cb=20210929211605",
    url: "https://icarus.fandom.com/wiki/Polar_Bear_Feet_Armor",
    craft: [
      {
        id: "leather",
        amount: 6,
      },
      {
        id: "polar-bear-pelt",
        amount: 14,
      },
      {
        id: "rope",
        amount: 4,
      },
    ],
    bench: "textiles-bench",
  },
  {
    id: "polar-bear-head-armor",
    name: "Polar Bear Head Armor",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/f/fb/ITEM_Polar_Bear_Head_Armor.png/revision/latest?cb=20210929211603",
    url: "https://icarus.fandom.com/wiki/Polar_Bear_Head_Armor",
    craft: [
      {
        id: "leather",
        amount: 6,
      },
      {
        id: "polar-bear-pelt",
        amount: 15,
      },
      {
        id: "rope",
        amount: 8,
      },
    ],
    bench: "textiles-bench",
  },
  {
    id: "polar-bear-legs-armor",
    name: "Polar Bear Legs Armor",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/3/3e/ITEM_Polar_Bear_Legs_Armor.png/revision/latest?cb=20210929211605",
    url: "https://icarus.fandom.com/wiki/Polar_Bear_Legs_Armor",
    craft: [
      {
        id: "leather",
        amount: 8,
      },
      {
        id: "polar-bear-pelt",
        amount: 18,
      },
      {
        id: "rope",
        amount: 8,
      },
    ],
    bench: "textiles-bench",
  },
  {
    id: "polar-bear-pelt",
    name: "Polar Bear Pelt",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/6/65/ITEM_Polar_Bear_Pelt.png/revision/latest?cb=20210929211605",
    url: "https://icarus.fandom.com/wiki/Polar_Bear_Pelt",
    craft: [],
  },

  {
    id: "portable-beacon",
    name: "Portable Beacon",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/d/d1/ITEM_Portable_Beacon.png/revision/latest?cb=20211113205100",
    url: "https://icarus.fandom.com/wiki/Portable_Beacon",
    craft: [
      {
        id: "composites",
        amount: 20,
      },
      {
        id: "glass",
        amount: 12,
      },
      {
        id: "electronics",
        amount: 10,
      },
      {
        id: "steel-screw",
        amount: 8,
      },
      {
        id: "copper-ingot",
        amount: 8,
      },
    ],
    bench: "fabricator",
  },
  {
    id: "potbelly-stove",
    name: "Potbelly Stove",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/1/12/ITEM_Potbelly_Stove.png/revision/latest?cb=20211114002709",
    url: "https://icarus.fandom.com/wiki/Potbelly_Stove",
    craft: [],
    bench: "crafting-bench",
  },

  {
    id: "pumpkin",
    name: "Pumpkin",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/a/a9/ITEM_Pumpkin.png/revision/latest?cb=20211224115845",
    url: "https://icarus.fandom.com/wiki/Pumpkin",
    craft: [],
  },
  {
    id: "pumpkin-bread",
    name: "Pumpkin Bread",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/6/60/ITEM_Pumpkin_Bread.png/revision/latest?cb=20211224115946",
    url: "https://icarus.fandom.com/wiki/Pumpkin_Bread",
    craft: [
      {
        id: "pumpkin",
        amount: 1,
      },
      {
        id: "bread-dough",
        amount: 1,
      },
    ],
    bench: "biofuel-stove",
  },
  {
    id: "rain-reservoir",
    name: "Rain Reservoir",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/6/6d/ITEM_Rain_Reservoir.png/revision/latest?cb=20210916213015",
    url: "https://icarus.fandom.com/wiki/Rain_Reservoir",
    craft: [
      {
        id: "stick",
        amount: 8,
      },
      {
        id: "wood",
        amount: 24,
      },
      {
        id: "stone",
        amount: 80,
      },
      {
        id: "leather",
        amount: 8,
      },
    ],
  },
  {
    id: "ranged-attachment-pack",
    name: "Ranged Attachment Pack",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/8/8f/ITEM_Ranged_Attachment_Pack.png/revision/latest/scale-to-width-down/350?cb=20221019005818",
    url: "https://icarus.fandom.com/wiki/Ranged_Attachment_Pack",
    craft: [
      {
        id: "steel-ingot",
        amount: null,
      },
      {
        id: "steel-ingot",
        amount: null,
      },
      {
        id: "epoxy",
        amount: null,
      },
      {
        id: "epoxy",
        amount: null,
      },
      {
        id: "rope",
        amount: null,
      },
      {
        id: "epoxy",
        amount: null,
      },
      {
        id: "epoxy",
        amount: null,
      },
      {
        id: "titanium-ingot",
        amount: null,
      },
      {
        id: "steel-ingot",
        amount: null,
      },
      {
        id: "steel-ingot",
        amount: null,
      },
    ],
    bench: "alteration-bench",
  },
  {
    id: "raw-bacon",
    name: "Raw Bacon",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/a/a7/ITEM_Raw_Bacon.png/revision/latest?cb=20220401134535",
    url: "https://icarus.fandom.com/wiki/Raw_Bacon",
    craft: [],
  },
  {
    id: "raw-fatty-tbone",
    name: "Raw Fatty Tbone",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/a/a6/ITEM_Raw_Fatty_Tbone.png/revision/latest?cb=20220325090241",
    url: "https://icarus.fandom.com/wiki/Raw_Fatty_Tbone",
    craft: [],
  },
  {
    id: "raw-fish",
    name: "Raw Fish",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/7/77/Raw_Fish.png/revision/latest?cb=20210915214541",
    url: "https://icarus.fandom.com/wiki/Raw_Fish",
    craft: [],
  },
  {
    id: "raw-game-meat",
    name: "Raw Game Meat",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/8/88/ITEM_Raw_Game_Meat.png/revision/latest?cb=20220320075018",
    url: "https://icarus.fandom.com/wiki/Raw_Game_Meat",
    craft: [],
  },
  {
    id: "raw-giant-steak",
    name: "Raw Giant Steak",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/3/32/ITEM_Raw_Giant_Steak.png/revision/latest?cb=20210915164455",
    url: "https://icarus.fandom.com/wiki/Raw_Giant_Steak",
    craft: [],
  },
  {
    id: "raw-meat",
    name: "Raw Meat",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/2/22/ITEM_Raw_Meat.png/revision/latest?cb=20210915164442",
    url: "https://icarus.fandom.com/wiki/Raw_Meat",
    craft: [],
  },
  {
    id: "raw-soft-meat",
    name: "Raw Soft Meat",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/1/1a/ITEM_Raw_Soft_Meat.png/revision/latest?cb=20220325090242",
    url: "https://icarus.fandom.com/wiki/Raw_Soft_Meat",
    craft: [],
  },
  {
    id: "raw-stringy-meat",
    name: "Raw Stringy Meat",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/6/6c/ITEM_Raw_Stringy_Meat.png/revision/latest?cb=20220320075018",
    url: "https://icarus.fandom.com/wiki/Raw_Stringy_Meat",
    craft: [],
  },
  {
    id: "raw-white-meat",
    name: "Raw White Meat",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/1/13/ITEM_Raw_White_Meat.png/revision/latest?cb=20220320075018",
    url: "https://icarus.fandom.com/wiki/Raw_White_Meat",
    craft: [],
  },

  {
    id: "reed-flower",
    name: "Reed Flower",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/3/3e/ITEM_Reed_Flower.png/revision/latest?cb=20210916210127",
    url: "https://icarus.fandom.com/wiki/Reed_Flower",
    craft: [],
  },
  {
    id: "refrigerator",
    name: "Refrigerator",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/2/2b/ITEM_Refrigerator.png/revision/latest?cb=20210916190549",
    url: "https://icarus.fandom.com/wiki/Refrigerator",
    craft: [
      {
        id: "aluminium-ingot",
        amount: 40,
      },
      {
        id: "electronics",
        amount: 20,
      },
      {
        id: "carbon-fiber",
        amount: 8,
      },
      {
        id: "steel-screw",
        amount: 12,
      },
    ],
  },
  {
    id: "reinforced-door",
    name: "Reinforced Door",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/2/2a/ITEM_Reinforced_Door.png/revision/latest?cb=20220109064259",
    url: "https://icarus.fandom.com/wiki/Reinforced_Door",
    craft: [
      {
        id: "wood",
        amount: 4,
      },
      {
        id: "iron-ingot",
        amount: 6,
      },
      {
        id: "iron-nail",
        amount: 8,
      },
      {
        id: "rope",
        amount: 4,
      },
    ],
  },
  {
    id: "reinforced-ladder",
    name: "Reinforced Ladder",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/a/a8/ITEM_Reinforced_Ladder.png/revision/latest?cb=20210916184733",
    url: "https://icarus.fandom.com/wiki/Reinforced_Ladder",
    craft: [
      {
        id: "wood",
        amount: 10,
      },
      {
        id: "iron-ingot",
        amount: 8,
      },
      {
        id: "iron-nail",
        amount: 8,
      },
    ],
  },
  {
    id: "reinforced-railing",
    name: "Reinforced Railing",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/e/e0/ITEM_Reinforced_Railing.png/revision/latest?cb=20211224002221",
    url: "https://icarus.fandom.com/wiki/Reinforced_Railing",
    craft: [
      {
        id: "wood",
        amount: 10,
      },
      {
        id: "iron-ingot",
        amount: 8,
      },
      {
        id: "iron-nail",
        amount: 8,
      },
    ],
  },

  {
    id: "resources",
    name: "Resources",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/e/e9/Icon_Resources.gif/revision/latest?cb=20220112015256",
    url: "https://icarus.fandom.com/wiki/Resources",
    craft: [],
  },
  {
    id: "ripe-coconut",
    name: "Ripe Coconut",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/3/3c/ITEM_Ripe_Coconut.png/revision/latest?cb=20211224115946",
    url: "https://icarus.fandom.com/wiki/Ripe_Coconut",
    craft: [],
  },
  {
    id: "roast-squash",
    name: "Roast Squash",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/5/5d/ITEM_Roast_Squash.png/revision/latest?cb=20211224115946",
    url: "https://icarus.fandom.com/wiki/Roast_Squash",
    craft: [],
    bench: "campfire",
  },
  {
    id: "roast-vegetables",
    name: "Roast Vegetables",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/7/79/ITEM_Roast_Vegetables.png/revision/latest?cb=20220313070900",
    url: "https://icarus.fandom.com/wiki/Roast_Vegetables",
    craft: [
      {
        id: "pumpkin",
        amount: 1,
      },
      {
        id: "carrot",
        amount: 1,
      },
      {
        id: "squash",
        amount: 1,
      },
    ],
    bench: "potbelly-stove",
  },

  {
    id: "rusty-shotgun",
    name: "Rusty Shotgun",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/9/9f/ITEM_Shotgun.png/revision/latest?cb=20211223222312",
    url: "https://icarus.fandom.com/wiki/Rusty_Shotgun",
    craft: [
      {
        id: "wood",
        amount: 15,
      },
      {
        id: "leather",
        amount: 10,
      },
      {
        id: "steel-ingot",
        amount: 10,
      },
      {
        id: "tree-sap",
        amount: 10,
      },
    ],
    bench: "Machining Bench",
  },
  {
    id: "sandworm-bow",
    name: "Sandworm Bow",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/c/c8/ITEM_Sandworm_Bow.png/revision/latest?cb=20220325213238",
    url: "https://icarus.fandom.com/wiki/Sandworm_Bow",
    craft: [
      {
        id: "wood",
        amount: null,
      },
      {
        id: "leather",
        amount: null,
      },
      {
        id: "sandworm-scale",
        amount: null,
      },
    ],
    bench: "Character Crafting",
  },
  {
    id: "sandworm-knife",
    name: "Sandworm Knife",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/0/01/ITEM_Sandworm_Knife.png/revision/latest?cb=20220325213249",
    url: "https://icarus.fandom.com/wiki/Sandworm_Knife",
    craft: [
      {
        id: "wood",
        amount: 2,
      },
      {
        id: "leather",
        amount: 2,
      },
      {
        id: "sandworm-scale",
        amount: 1,
      },
    ],
    bench: "character-crafting",
  },
  {
    id: "sandworm-scale",
    name: "Sandworm Scale",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/6/62/ITEM_Sandworm_Scale.png/revision/latest?cb=20211110185405",
    url: "https://icarus.fandom.com/wiki/Sandworm_Scale",
    craft: [],
  },

  {
    id: "scorpion-hedgehog",
    name: "Scorpion Hedgehog",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/d/db/ITEM_Scorpion_Hedgehog.png/revision/latest?cb=20220414075218",
    url: "https://icarus.fandom.com/wiki/Scorpion_Hedgehog",
    craft: [
      {
        id: "scorpion-tail",
        amount: 1,
      },
      {
        id: "medium-wood-hedgehog",
        amount: 1,
      },
    ],
    bench: "crafting-bench",
  },
  {
    id: "scorpion-pincer-trap",
    name: "Scorpion Pincer Trap",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/a/ab/ITEM_Scorpion_Pincer_Trap.png/revision/latest?cb=20220414075220",
    url: "https://icarus.fandom.com/wiki/Scorpion_Pincer_Trap",
    craft: [
      {
        id: "stone",
        amount: 4,
      },
      {
        id: "stick",
        amount: 4,
      },
      {
        id: "scorpion-pincer",
        amount: 4,
      },
    ],
    bench: "crafting-bench",
  },
  {
    id: "shotgun",
    name: "Shotgun",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/9/9f/ITEM_Shotgun.png/revision/latest?cb=20211223222312",
    url: "https://icarus.fandom.com/wiki/Shotgun",
    craft: [
      {
        id: "wood",
        amount: 12,
      },
      {
        id: "leather",
        amount: 8,
      },
      {
        id: "steel-ingot",
        amount: 26,
      },
      {
        id: "epoxy",
        amount: 4,
      },
      {
        id: "steel-screw",
        amount: 10,
      },
    ],
    bench: "Machining Bench",
  },
  {
    id: "shovel",
    name: "Shovel",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/f/fe/ITEM_Shovel.png/revision/latest?cb=20210916203256",
    url: "https://icarus.fandom.com/wiki/Shovel",
    craft: [
      {
        id: "wood",
        amount: 4,
      },
      {
        id: "iron-ingot",
        amount: 6,
      },
    ],
  },

  {
    id: "skinning-bench",
    name: "Skinning Bench",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/9/9e/ITEM_Skinning_Bench.png/revision/latest?cb=20210916211521",
    url: "https://icarus.fandom.com/wiki/Skinning_Bench",
    craft: [
      {
        id: "fiber",
        amount: 60,
      },
      {
        id: "wood",
        amount: 50,
      },
      {
        id: "stone",
        amount: 12,
      },
      {
        id: "leather",
        amount: 20,
      },
    ],
    bench: "Crafting Bench",
  },
  {
    id: "small-interior-wood-crate",
    name: "Small Interior Wood Crate",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/0/08/ITEM_Small_Interior_Wood_Crate.png/revision/latest?cb=20210916184555",
    url: "https://icarus.fandom.com/wiki/Small_Interior_Wood_Crate",
    craft: [
      {
        id: "refined-wood",
        amount: 24,
      },
      {
        id: "rope",
        amount: 4,
      },
      {
        id: "copper-nail",
        amount: 5,
      },
    ],
    bench: "carpentry-bench",
  },
  {
    id: "small-iron-crate",
    name: "Small Iron Crate",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/b/b0/ITEM_Small_Iron_Crate.png/revision/latest?cb=20210916190549",
    url: "https://icarus.fandom.com/wiki/Small_Iron_Crate",
    craft: [
      {
        id: "iron-ingot",
        amount: 24,
      },
      {
        id: "epoxy",
        amount: 4,
      },
    ],
    bench: "machining-bench",
  },
  {
    id: "small-wood-crate",
    name: "Small Wood Crate",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/e/eb/ITEM_Small_Wood_Crate.png/revision/latest?cb=20210916185121",
    url: "https://icarus.fandom.com/wiki/Small_Wood_Crate",
    craft: [
      {
        id: "fiber",
        amount: 16,
      },
      {
        id: "wood",
        amount: 24,
      },
    ],
    bench: "character-crafting",
  },
  {
    id: "small-wood-sign",
    name: "Small Wood Sign",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/d/de/ITEM_Small_Wood_Sign.png/revision/latest?cb=20210916185123",
    url: "https://icarus.fandom.com/wiki/Small_Wood_Sign",
    craft: [
      {
        id: "refined-wood",
        amount: 12,
      },
      {
        id: "rope",
        amount: 2,
      },
      {
        id: "copper-nail",
        amount: 2,
      },
    ],
    bench: "carpentry-bench",
  },
  {
    id: "smoke-grenade",
    name: "Smoke Grenade",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/7/7c/ITEM_Smoke_Grenade.png/revision/latest?cb=20210916211002",
    url: "https://icarus.fandom.com/wiki/Smoke_Grenade",
    craft: [
      {
        id: "iron-ingot",
        amount: 1,
      },
      {
        id: "stone",
        amount: 10,
      },
    ],
    bench: "Machining Bench",
  },

  {
    id: "solar-panel",
    name: "Solar Panel",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/4/4a/ITEM_Solar_Panel.png/revision/latest?cb=20211224011228",
    url: "https://icarus.fandom.com/wiki/Solar_Panel",
    craft: [
      {
        id: "composites",
        amount: 18,
      },
      {
        id: "carbon-fiber",
        amount: 8,
      },
      {
        id: "electronics",
        amount: 30,
      },
      {
        id: "steel-screw",
        amount: 10,
      },
      {
        id: "glass",
        amount: 60,
      },
    ],
    bench: "fabricator",
  },
  {
    id: "soy-bean",
    name: "Soy Bean",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/b/b1/ITEM_Soy_Bean.png/revision/latest?cb=20220304153446",
    url: "https://icarus.fandom.com/wiki/Soy_Bean",
    craft: [],
  },
  {
    id: "soy-bean-stir-fry",
    name: "Soy Bean Stir-Fry",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/0/03/ITEM_Soy_Bean_Stir-Fry.png/revision/latest?cb=20220313070900",
    url: "https://icarus.fandom.com/wiki/Soy_Bean_Stir-Fry",
    craft: [
      {
        id: "mushroom",
        amount: 1,
      },
      {
        id: "carrot",
        amount: 1,
      },
      {
        id: "soy-bean",
        amount: 1,
      },
    ],
    bench: "potbelly-stove",
  },
  {
    id: "splint",
    name: "Splint",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/7/73/ITEM_Splint.png/revision/latest?cb=20211101184209",
    url: "https://icarus.fandom.com/wiki/Splint",
    craft: [
      {
        id: "wood",
        amount: 2,
      },
      {
        id: "stick",
        amount: 8,
      },
      {
        id: "rope",
        amount: 6,
      },
    ],
    bench: "character-crafting",
  },
  {
    id: "spoiled-meat",
    name: "Spoiled Meat",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/d/dd/ITEM_Spoiled_Meat.png/revision/latest?cb=20211101181854",
    url: "https://icarus.fandom.com/wiki/Spoiled_Meat",
    craft: [],
  },
  {
    id: "spoiled-plants",
    name: "Spoiled Plants",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/1/10/ITEM_Spoiled_Plants.png/revision/latest?cb=20220313070842",
    url: "https://icarus.fandom.com/wiki/Spoiled_Plants",
    craft: [],
  },
  {
    id: "sponge",
    name: "Sponge",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/a/ad/ITEM_Sponge.png/revision/latest?cb=20210916210128",
    url: "https://icarus.fandom.com/wiki/Sponge",
    craft: [],
  },
  {
    id: "squash",
    name: "Squash",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/2/25/ITEM_Squash.png/revision/latest?cb=20211224115946",
    url: "https://icarus.fandom.com/wiki/Squash",
    craft: [],
  },

  {
    id: "steel-axe",
    name: "Steel Axe",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/9/9f/ITEM_Steel_Axe.png/revision/latest?cb=20210916181424",
    url: "https://icarus.fandom.com/wiki/Steel_Axe",
    craft: [
      {
        id: "wood",
        amount: 5,
      },
      {
        id: "epoxy",
        amount: 4,
      },
      {
        id: "steel-ingot",
        amount: 6,
      },
      {
        id: "steel-screw",
        amount: 2,
      },
    ],
  },
  {
    id: "steel-hammer",
    name: "Steel Hammer",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/f/fd/ITEM_Steel_Hammer.png/revision/latest?cb=20211101170003",
    url: "https://icarus.fandom.com/wiki/Steel_Hammer",
    craft: [
      {
        id: "wood",
        amount: 5,
      },
      {
        id: "epoxy",
        amount: 4,
      },
      {
        id: "steel-ingot",
        amount: 6,
      },
      {
        id: "steel-screw",
        amount: 2,
      },
    ],
    bench: "anvil-bench",
  },
  {
    id: "steel-ingot",
    name: "Steel Ingot",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/9/93/ITEM_Steel_Ingot.png/revision/latest?cb=20211223230253",
    url: "https://icarus.fandom.com/wiki/Steel_Ingot",
    craft: [
      {
        id: "steel-bloom",
        amount: 1,
      },
    ],
    bench: "Concrete Furnace",
  },
  {
    id: "steel-knife",
    name: "Steel Knife",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/7/79/ITEM_Steel_Knife.png/revision/latest?cb=20210915182255",
    url: "https://icarus.fandom.com/wiki/Steel_Knife",
    craft: [
      {
        id: "wood",
        amount: 5,
      },
      {
        id: "epoxy",
        amount: 4,
      },
      {
        id: "steel-ingot",
        amount: 6,
      },
      {
        id: "steel-screw",
        amount: 2,
      },
    ],
    bench: "anvil-bench",
  },
  {
    id: "steel-pickaxe",
    name: "Steel Pickaxe",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/2/2d/ITEM_Steel_Pickaxe.png/revision/latest?cb=20210916210838",
    url: "https://icarus.fandom.com/wiki/Steel_Pickaxe",
    craft: [
      {
        id: "wood",
        amount: 5,
      },
      {
        id: "epoxy",
        amount: 4,
      },
      {
        id: "steel-ingot",
        amount: 6,
      },
    ],
    bench: "anvil-bench",
  },
  {
    id: "steel-rebar",
    name: "Steel Rebar",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/c/c7/ITEM_Steel_Rebar.png/revision/latest?cb=20211114000707",
    url: "https://icarus.fandom.com/wiki/Steel_Rebar",
    craft: [
      {
        id: "steel-ingot",
        amount: 1,
      },
    ],
    bench: "machining-bench",
  },
  {
    id: "steel-screw",
    name: "Steel Screw",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/9/9a/ITEM_Steel_Screw.png/revision/latest?cb=20211110185552",
    url: "https://icarus.fandom.com/wiki/Steel_Screw",
    craft: [
      {
        id: "steel-ingot",
        amount: 1,
      },
    ],
    bench: "machining-bench",
  },

  {
    id: "stew",
    name: "Stew",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/c/c9/ITEM_Stew.png/revision/latest?cb=20211224115845",
    url: "https://icarus.fandom.com/wiki/Stew",
    craft: [
      {
        id: "water",
        amount: 100,
      },
      {
        id: "mushroom",
        amount: 1,
      },
      {
        id: "carrot",
        amount: 1,
      },
      {
        id: "raw-meat",
        amount: 1,
      },
    ],
    bench: "potbelly-stove",
  },
  {
    id: "stick",
    name: "Stick",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/6/6e/ITEM_Stick.png/revision/latest?cb=20210915191652",
    url: "https://icarus.fandom.com/wiki/Stick",
    craft: [
      {
        id: "wood",
        amount: 1,
      },
    ],
    bench: "carpentry-bench",
  },
  {
    id: "stone",
    name: "Stone",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/c/ce/ITEM_Stone.png/revision/latest?cb=20211113122734",
    url: "https://icarus.fandom.com/wiki/Stone",
    craft: [],
  },
  {
    id: "stone-axe",
    name: "Stone Axe",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/f/f7/ITEM_Stone_Axe.png/revision/latest?cb=20210916181306",
    url: "https://icarus.fandom.com/wiki/Stone_Axe",
    craft: [
      {
        id: "fiber",
        amount: 10,
      },
      {
        id: "stick",
        amount: 4,
      },
      {
        id: "stone",
        amount: 6,
      },
    ],
  },
  {
    id: "stone-beam",
    name: "Stone Beam",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/5/51/ITEM_Stone_Beam.png/revision/latest?cb=20210916202300",
    url: "https://icarus.fandom.com/wiki/Stone_Beam",
    craft: [
      {
        id: "wood",
        amount: 2,
      },
      {
        id: "stone",
        amount: 6,
      },
      {
        id: "leather",
        amount: 1,
      },
      {
        id: "iron-nail",
        amount: 6,
      },
    ],
  },
  {
    id: "stone-floor",
    name: "Stone Floor",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/b/b8/ITEM_Stone_Floor.png/revision/latest?cb=20210916202511",
    url: "https://icarus.fandom.com/wiki/Stone_Floor",
    craft: [
      {
        id: "wood",
        amount: 6,
      },
      {
        id: "stone",
        amount: 20,
      },
      {
        id: "leather",
        amount: 4,
      },
      {
        id: "iron-nail",
        amount: 6,
      },
    ],
  },

  {
    id: "stone-frame",
    name: "Stone Frame",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/f/f1/ITEM_Stone_Frame.png/revision/latest?cb=20210916202512",
    url: "https://icarus.fandom.com/wiki/Stone_Frame",
    craft: [
      {
        id: "wood",
        amount: 12,
      },
      {
        id: "stone",
        amount: 40,
      },
      {
        id: "leather",
        amount: 4,
      },
      {
        id: "iron-nail",
        amount: 12,
      },
    ],
  },
  {
    id: "stone-furnace",
    name: "Stone Furnace",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/0/09/ITEM_Stone_Furnace.png/revision/latest?cb=20210916213015",
    url: "https://icarus.fandom.com/wiki/Stone_Furnace",
    craft: [
      {
        id: "stick",
        amount: 4,
      },
      {
        id: "wood",
        amount: 12,
      },
      {
        id: "stone",
        amount: 80,
      },
      {
        id: "leather",
        amount: 12,
      },
    ],
  },
  {
    id: "stone-halfpieces",
    name: "Stone Halfpieces",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/c/cc/ITEM_Stone_Halfpieces.png/revision/latest?cb=20211224000418",
    url: "https://icarus.fandom.com/wiki/Stone_Halfpieces",
    craft: [
      {
        id: "wood",
        amount: 6,
      },
      {
        id: "stone",
        amount: 20,
      },
      {
        id: "leather",
        amount: 4,
      },
      {
        id: "iron-nail",
        amount: 6,
      },
    ],
  },
  {
    id: "stone-halfpitches",
    name: "Stone Halfpitches",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/1/1f/ITEM_Stone_Halfpitches.png/revision/latest?cb=20211224000429",
    url: "https://icarus.fandom.com/wiki/Stone_Halfpitches",
    craft: [
      {
        id: "wood",
        amount: 6,
      },
      {
        id: "stone",
        amount: 20,
      },
      {
        id: "leather",
        amount: 4,
      },
      {
        id: "iron-nail",
        amount: 6,
      },
    ],
  },
  {
    id: "stone-knife",
    name: "Stone Knife",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/7/71/ITEM_Stone_Knife.png/revision/latest?cb=20210915182152",
    url: "https://icarus.fandom.com/wiki/Stone_Knife",
    craft: [
      {
        id: "fiber",
        amount: 2,
      },
      {
        id: "stick",
        amount: 2,
      },
      {
        id: "stone",
        amount: 4,
      },
    ],
    bench: "character-crafting",
  },
  {
    id: "stone-pickaxe",
    name: "Stone Pickaxe",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/e/ed/ITEM_Stone_Pickaxe.png/revision/latest?cb=20210916181424",
    url: "https://icarus.fandom.com/wiki/Stone_Pickaxe",
    craft: [
      {
        id: "fiber",
        amount: 10,
      },
      {
        id: "stick",
        amount: 4,
      },
      {
        id: "stone",
        amount: 6,
      },
    ],
  },
  {
    id: "stone-pile",
    name: "Stone Pile",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/e/ec/ITEM_Stone_Pile.png/revision/latest?cb=20211224010954",
    url: "https://icarus.fandom.com/wiki/Stone_Pile",
    craft: [
      {
        id: "stone",
        amount: 100,
      },
    ],
  },
  {
    id: "stone-ramp",
    name: "Stone Ramp",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/7/78/ITEM_Stone_Ramp.png/revision/latest?cb=20210916202512",
    url: "https://icarus.fandom.com/wiki/Stone_Ramp",
    craft: [
      {
        id: "wood",
        amount: 6,
      },
      {
        id: "stone",
        amount: 20,
      },
      {
        id: "leather",
        amount: 4,
      },
      {
        id: "iron-nail",
        amount: 6,
      },
    ],
  },

  {
    id: "suture-kit",
    name: "Suture Kit",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/e/e2/ITEM_Suture_Kit.png/revision/latest?cb=20211224010903",
    url: "https://icarus.fandom.com/wiki/Suture_Kit",
    craft: [
      {
        id: "fiber",
        amount: 10,
      },
      {
        id: "bone",
        amount: 5,
      },
      {
        id: "leather",
        amount: 2,
      },
    ],
    bench: "character-crafting",
  },
  {
    id: "sweetcorn-soup",
    name: "Sweetcorn Soup",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/8/83/ITEM_Sweetcorn_Soup.png/revision/latest?cb=20220313070900",
    url: "https://icarus.fandom.com/wiki/Sweetcorn_Soup",
    craft: [
      {
        id: "water",
        amount: 100,
      },
      {
        id: "corn",
        amount: 1,
      },
    ],
    bench: "potbelly-stove",
  },
  {
    id: "taxidermy-knife",
    name: "Taxidermy Knife",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/b/b6/ITEM_Taxidermy_Knife.png/revision/latest?cb=20210916203256",
    url: "https://icarus.fandom.com/wiki/Taxidermy_Knife",
    craft: [
      {
        id: "wood",
        amount: 2,
      },
      {
        id: "iron-nail",
        amount: 2,
      },
      {
        id: "iron-ingot",
        amount: 6,
      },
      {
        id: "leather",
        amount: 4,
      },
    ],
    bench: "anvil-bench",
  },
  {
    id: "tea",
    name: "Tea",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/5/5a/ITEM_Tea.png/revision/latest?cb=20211224115946",
    url: "https://icarus.fandom.com/wiki/Tea",
    craft: [],
  },
  {
    id: "textiles-bench",
    name: "Textiles Bench",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/8/87/ITEM_Textiles_Bench.png/revision/latest?cb=20210916204947",
    url: "https://icarus.fandom.com/wiki/Textiles_Bench",
    craft: [
      {
        id: "fiber",
        amount: 60,
      },
      {
        id: "stick",
        amount: 20,
      },
      {
        id: "wood",
        amount: 50,
      },
      {
        id: "stone",
        amount: 12,
      },
    ],
  },
  {
    id: "thatch-beam",
    name: "Thatch Beam",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/3/3a/ITEM_Thatch_Beam.png/revision/latest?cb=20210919210453",
    url: "https://icarus.fandom.com/wiki/Thatch_Beam",
    craft: [
      {
        id: "fiber",
        amount: 12,
      },
      {
        id: "stick",
        amount: 6,
      },
    ],
  },
  {
    id: "thatch-door",
    name: "Thatch Door",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/3/3e/ITEM_Thatch_Door.png/revision/latest?cb=20210916184924",
    url: "https://icarus.fandom.com/wiki/Thatch_Door",
    craft: [
      {
        id: "fiber",
        amount: 10,
      },
      {
        id: "stick",
        amount: 4,
      },
    ],
  },
  {
    id: "thatch-floor",
    name: "Thatch Floor",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/e/eb/ITEM_Thatch_Floor.png/revision/latest?cb=20210919232124",
    url: "https://icarus.fandom.com/wiki/Thatch_Floor",
    craft: [
      {
        id: "fiber",
        amount: 20,
      },
      {
        id: "stick",
        amount: 3,
      },
    ],
  },

  {
    id: "thatch-halfpieces",
    name: "Thatch Halfpieces",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/7/7b/ITEM_Thatch_Halfpieces.png/revision/latest?cb=20211224000703",
    url: "https://icarus.fandom.com/wiki/Thatch_Halfpieces",
    craft: [
      {
        id: "fiber",
        amount: 20,
      },
      {
        id: "stick",
        amount: 3,
      },
    ],
  },
  {
    id: "thatch-halfpitches",
    name: "Thatch Halfpitches",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/7/78/ITEM_Thatch_Halfpitches.png/revision/latest?cb=20211224000714",
    url: "https://icarus.fandom.com/wiki/Thatch_Halfpitches",
    craft: [
      {
        id: "fiber",
        amount: 20,
      },
      {
        id: "stick",
        amount: 3,
      },
    ],
  },
  {
    id: "thatch-ladder",
    name: "Thatch Ladder",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/5/53/ITEM_Thatch_Ladder.png/revision/latest?cb=20210916184924",
    url: "https://icarus.fandom.com/wiki/Thatch_Ladder",
    craft: [
      {
        id: "fiber",
        amount: 6,
      },
      {
        id: "stick",
        amount: 10,
      },
    ],
  },
  {
    id: "thatch-railing",
    name: "Thatch Railing",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/f/fc/ITEM_Thatch_Railing.png/revision/latest?cb=20210916184924",
    url: "https://icarus.fandom.com/wiki/Thatch_Railing",
    craft: [
      {
        id: "fiber",
        amount: 8,
      },
      {
        id: "stick",
        amount: 2,
      },
    ],
  },
  {
    id: "thatch-ramp",
    name: "Thatch Ramp",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/0/01/ITEM_Thatch_Ramp.png/revision/latest?cb=20210919232127",
    url: "https://icarus.fandom.com/wiki/Thatch_Ramp",
    craft: [
      {
        id: "fiber",
        amount: 20,
      },
      {
        id: "stick",
        amount: 3,
      },
    ],
  },

  {
    id: "thermos",
    name: "Thermos",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/a/a6/ITEM_Thermos.png/revision/latest?cb=20210916210710",
    url: "https://icarus.fandom.com/wiki/Thermos",
    craft: [
      {
        id: "epoxy",
        amount: 8,
      },
      {
        id: "glass",
        amount: 4,
      },
      {
        id: "steel-ingot",
        amount: 12,
      },
    ],
  },

  {
    id: "titanium-axe",
    name: "Titanium Axe",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/e/e8/ITEM_Titanium_Axe.png/revision/latest?cb=20210916203734",
    url: "https://icarus.fandom.com/wiki/Titanium_Axe",
    craft: [
      {
        id: "wood",
        amount: 2,
      },
      {
        id: "leather",
        amount: 4,
      },
      {
        id: "titanium-ingot",
        amount: 12,
      },
    ],
  },
  {
    id: "titanium-hammer",
    name: "Titanium Hammer",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/b/bc/ITEM_Titanium_Hammer.png/revision/latest?cb=20220409171043",
    url: "https://icarus.fandom.com/wiki/Titanium_Hammer",
    craft: [
      {
        id: "carbon-fiber",
        amount: 4,
      },
      {
        id: "steel-screw",
        amount: 10,
      },
      {
        id: "epoxy",
        amount: 4,
      },
      {
        id: "titanium-ingot",
        amount: 10,
      },
    ],
    bench: "fabricator",
  },
  {
    id: "titanium-ingot",
    name: "Titanium Ingot",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/e/ec/ITEM_Titanium_Ingot.png/revision/latest?cb=20211223230151",
    url: "https://icarus.fandom.com/wiki/Titanium_Ingot",
    craft: [
      {
        id: "titanium-ore",
        amount: 5,
      },
    ],
    bench: "Concrete Furnace",
  },
  {
    id: "titanium-knife",
    name: "Titanium Knife",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/1/11/ITEM_Titanium_Knife.png/revision/latest?cb=20210916203735",
    url: "https://icarus.fandom.com/wiki/Titanium_Knife",
    craft: [
      {
        id: "carbon-fiber",
        amount: 4,
      },
      {
        id: "steel-screw",
        amount: 2,
      },
      {
        id: "epoxy",
        amount: 4,
      },
      {
        id: "titanium-ingot",
        amount: 8,
      },
    ],
    bench: "fabricator",
  },
  {
    id: "titanium-ore",
    name: "Titanium Ore",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/9/98/ITEM_Titanium_Ore.png/revision/latest?cb=20211113122119",
    url: "https://icarus.fandom.com/wiki/Titanium_Ore",
    craft: [],
  },
  {
    id: "titanium-pickaxe",
    name: "Titanium Pickaxe",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/4/48/ITEM_Titanium_Pickaxe.png/revision/latest?cb=20210916211131",
    url: "https://icarus.fandom.com/wiki/Titanium_Pickaxe",
    craft: [
      {
        id: "carbon-fiber",
        amount: 4,
      },
      {
        id: "steel-screw",
        amount: 8,
      },
      {
        id: "epoxy",
        amount: 4,
      },
      {
        id: "titanium-ingot",
        amount: 12,
      },
    ],
    bench: "fabricator",
  },
  {
    id: "titanium-sickle",
    name: "Titanium Sickle",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/c/cb/ITEM_Titanium_Sickle.png/revision/latest?cb=20210916203735",
    url: "https://icarus.fandom.com/wiki/Titanium_Sickle",
    craft: [
      {
        id: "carbon-fiber",
        amount: 4,
      },
      {
        id: "steel-screw",
        amount: 2,
      },
      {
        id: "epoxy",
        amount: 4,
      },
      {
        id: "titanium-ingot",
        amount: 10,
      },
    ],
    bench: "Fabricator",
  },

  {
    id: "tool-attachment-pack",
    name: "Tool Attachment Pack",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/4/48/ITEM_Tool_Attachment_Pack.png/revision/latest/scale-to-width-down/350?cb=20221019005809",
    url: "https://icarus.fandom.com/wiki/Tool_Attachment_Pack",
    craft: [
      {
        id: "steel-ingot",
        amount: null,
      },
      {
        id: "iron-ingot",
        amount: null,
      },
      {
        id: "iron-ingot",
        amount: null,
      },
      {
        id: "platinum-ingot",
        amount: null,
      },
      {
        id: "iron-ingot",
        amount: null,
      },
      {
        id: "iron-ingot",
        amount: null,
      },
      {
        id: "steel-ingot",
        amount: null,
      },
      {
        id: "steel-ingot",
        amount: null,
      },
      {
        id: "steel-ingot",
        amount: null,
      },
      {
        id: "steel-ingot",
        amount: null,
      },
      {
        id: "copper-ingot",
        amount: null,
      },
    ],
    bench: "alteration-bench",
  },

  {
    id: "trophy-bench",
    name: "Trophy Bench",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/4/4c/ITEM_Trophy_Bench.png/revision/latest?cb=20210916213015",
    url: "https://icarus.fandom.com/wiki/Trophy_Bench",
    craft: [
      {
        id: "wood",
        amount: 60,
      },
      {
        id: "copper-nail",
        amount: 50,
      },
      {
        id: "iron-ingot",
        amount: 2,
      },
      {
        id: "rope",
        amount: 12,
      },
    ],
    bench: "crafting-bench",
  },
  {
    id: "ultrameal",
    name: "Ultrameal",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/d/df/ITEM_Ultrameal.png/revision/latest?cb=20211220181809",
    url: "https://icarus.fandom.com/wiki/Ultrameal",
    craft: [],
  },
  {
    id: "vegetable-pie",
    name: "Vegetable Pie",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/4/40/ITEM_Vegetable_Pie.png/revision/latest?cb=20211224115945",
    url: "https://icarus.fandom.com/wiki/Vegetable_Pie",
    craft: [
      {
        id: "pastry",
        amount: 1,
      },
      {
        id: "squash",
        amount: 1,
      },
      {
        id: "soy-bean",
        amount: 1,
      },
      {
        id: "corn",
        amount: 1,
      },
    ],
    bench: "biofuel-stove",
  },
  {
    id: "wall-torch",
    name: "Wall Torch",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/e/e7/ITEM_Wall_Torch.png/revision/latest?cb=20210916184733",
    url: "https://icarus.fandom.com/wiki/Wall_Torch",
    craft: [
      {
        id: "wood",
        amount: 4,
      },
      {
        id: "leather",
        amount: 8,
      },
      {
        id: "sulfur",
        amount: 8,
      },
      {
        id: "iron-ingot",
        amount: 8,
      },
    ],
    bench: "crafting-bench",
  },

  {
    id: "water-pipe-tool",
    name: "Water Pipe Tool",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/d/d3/ITEM_Water_Pipe_Tool.png/revision/latest?cb=20220313070842",
    url: "https://icarus.fandom.com/wiki/Water_Pipe_Tool",
    craft: [
      {
        id: "copper-ingot",
        amount: 20,
      },
      {
        id: "refined-gold",
        amount: 8,
      },
      {
        id: "carbon-fiber",
        amount: 4,
      },
    ],
    bench: "fabricator",
  },
  {
    id: "water-pump",
    name: "Water Pump",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/4/4e/ITEM_Water_Pump.png/revision/latest?cb=20220313070843",
    url: "https://icarus.fandom.com/wiki/Water_Pump",
    craft: [
      {
        id: "steel-ingot",
        amount: 24,
      },
      {
        id: "electronics",
        amount: 4,
      },
      {
        id: "steel-screw",
        amount: 16,
      },
      {
        id: "concrete-mix",
        amount: 20,
      },
    ],
    bench: "fabricator",
  },
  {
    id: "water-sprinkler",
    name: "Water Sprinkler",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/d/de/ITEM_Water_Sprinkler.png/revision/latest?cb=20220313070843",
    url: "https://icarus.fandom.com/wiki/Water_Sprinkler",
    craft: [
      {
        id: "aluminium-ingot",
        amount: 8,
      },
      {
        id: "composites",
        amount: 12,
      },
      {
        id: "epoxy",
        amount: 4,
      },
    ],
    bench: "fabricator",
  },
  {
    id: "watermelon",
    name: "Watermelon",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/d/d1/ITEM_Watermelon.png/revision/latest?cb=20211224115946",
    url: "https://icarus.fandom.com/wiki/Watermelon",
    craft: [],
  },
  {
    id: "waterskin",
    name: "Waterskin",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/f/f0/ITEM_Waterskin.png/revision/latest?cb=20210916210710",
    url: "https://icarus.fandom.com/wiki/Waterskin",
    craft: [
      {
        id: "fiber",
        amount: 2,
      },
      {
        id: "leather",
        amount: 12,
      },
      {
        id: "bone",
        amount: 4,
      },
    ],
  },
  {
    id: "wayfarer-arms-armor",
    name: "Wayfarer Arms Armor",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/9/97/ITEM_Wayfarer_Arms_Armor.png/revision/latest/scale-to-width-down/350?cb=20221018035242",
    url: "https://icarus.fandom.com/wiki/Wayfarer_Arms_Armor",
    craft: [
      {
        id: "platinum-weave",
        amount: 4,
      },
    ],
    bench: "advanced-textiles-bench",
  },
  {
    id: "wayfarer-chest-armor",
    name: "Wayfarer Chest Armor",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/e/e2/ITEM_Wayfarer_Chest_Armor.png/revision/latest/scale-to-width-down/350?cb=20221018035047",
    url: "https://icarus.fandom.com/wiki/Wayfarer_Chest_Armor",
    craft: [
      {
        id: "platinum-weave",
        amount: 10,
      },
    ],
    bench: "advanced-textiles-bench",
  },
  {
    id: "wayfarer-feet-armor",
    name: "Wayfarer Feet Armor",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/e/e1/ITEM_Wayfarer_Feet_Armor.png/revision/latest/scale-to-width-down/350?cb=20221018035743",
    url: "https://icarus.fandom.com/wiki/Wayfarer_Feet_Armor",
    craft: [
      {
        id: "platinum-weave",
        amount: 2,
      },
    ],
    bench: "advanced-textiles-bench",
  },
  {
    id: "wayfarer-head-armor",
    name: "Wayfarer Head Armor",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/5/5d/ITEM_Wayfarer_Head_Armor.png/revision/latest/scale-to-width-down/350?cb=20221018034852",
    url: "https://icarus.fandom.com/wiki/Wayfarer_Head_Armor",
    craft: [
      {
        id: "platinum-weave",
        amount: 4,
      },
    ],
    bench: "advanced-textiles-bench",
  },
  {
    id: "wayfarer-leg-armor",
    name: "Wayfarer Leg Armor",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/f/f3/ITEM_Wayfarer_Leg_Armor.png/revision/latest/scale-to-width-down/350?cb=20221018035546",
    url: "https://icarus.fandom.com/wiki/Wayfarer_Leg_Armor",
    craft: [
      {
        id: "platinum-weave",
        amount: 8,
      },
    ],
    bench: "advanced-textiles-bench",
  },
  {
    id: "wheat",
    name: "Wheat",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/d/dc/ITEM_Wheat.png/revision/latest?cb=20210916212813",
    url: "https://icarus.fandom.com/wiki/Wheat",
    craft: [],
  },
  {
    id: "wild-berry",
    name: "Wild Berry",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/8/8b/ITEM_Wild_Berry.png/revision/latest?cb=20210916211950",
    url: "https://icarus.fandom.com/wiki/Wild_Berry",
    craft: [],
  },
  {
    id: "wild-salad",
    name: "Wild Salad",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/0/0b/ITEM_Wild_Salad.png/revision/latest?cb=20211224115946",
    url: "https://icarus.fandom.com/wiki/Wild_Salad",
    craft: [
      {
        id: "pumpkin",
        amount: 1,
      },
      {
        id: "squash",
        amount: 1,
      },
    ],
    bench: "cooking-station",
  },
  {
    id: "wine",
    name: "Wine",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/5/5c/ITEM_Wine.png/revision/latest?cb=20211101181204",
    url: "https://icarus.fandom.com/wiki/Wine",
    craft: [
      {
        id: "wild-berry",
        amount: 10,
      },
      {
        id: "reed-flower",
        amount: 1,
      },
      {
        id: "wine-bottle",
        amount: 1,
      },
    ],
  },
  {
    id: "wood",
    name: "Wood",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/3/3e/ITEM_Wood.png/revision/latest?cb=20210916004804",
    url: "https://icarus.fandom.com/wiki/Wood",
    craft: [],
  },
  {
    id: "wood-beam",
    name: "Wood Beam",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/3/34/ITEM_Wood_Beam.png/revision/latest?cb=20210921023048",
    url: "https://icarus.fandom.com/wiki/Wood_Beam",
    craft: [
      {
        id: "fiber",
        amount: 4,
      },
      {
        id: "wood",
        amount: 6,
      },
    ],
  },
  {
    id: "wood-bed",
    name: "Wood Bed",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/2/20/ITEM_Wood_Bed.png/revision/latest?cb=20210916204947",
    url: "https://icarus.fandom.com/wiki/Wood_Bed",
    craft: [
      {
        id: "refined-wood",
        amount: 20,
      },
      {
        id: "fur",
        amount: 30,
      },
      {
        id: "leather",
        amount: 10,
      },
      {
        id: "copper-nail",
        amount: 10,
      },
    ],
    bench: "carpentry-bench",
  },
  {
    id: "wood-bow",
    name: "Wood Bow",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/c/c4/ITEM_Wood_Bow.png/revision/latest?cb=20210916203841",
    url: "https://icarus.fandom.com/wiki/Wood_Bow",
    craft: [
      {
        id: "fiber",
        amount: 30,
      },
      {
        id: "stick",
        amount: 24,
      },
    ],
    bench: "Character Crafting",
  },
  {
    id: "wood-chair",
    name: "Wood Chair",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/3/3b/ITEM_Wood_Chair.png/revision/latest?cb=20210916184924",
    url: "https://icarus.fandom.com/wiki/Wood_Chair",
    craft: [
      {
        id: "refined-wood",
        amount: 6,
      },
      {
        id: "copper-nail",
        amount: 5,
      },
    ],
    bench: "carpentry-bench",
  },
  {
    id: "wood-composter",
    name: "Wood Composter",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/b/bc/ITEM_Wood_Composter.png/revision/latest?cb=20220313070843",
    url: "https://icarus.fandom.com/wiki/Wood_Composter",
    craft: [
      {
        id: "wood",
        amount: 25,
      },
      {
        id: "stone",
        amount: 10,
      },
      {
        id: "spoiled-plants",
        amount: 5,
      },
      {
        id: "sulfur",
        amount: 5,
      },
    ],
    bench: "crafting-bench",
  },
  {
    id: "wood-crop-plot",
    name: "Wood Crop Plot",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/6/6d/ITEM_Wood_Crop_Plot.png/revision/latest?cb=20220313071159",
    url: "https://icarus.fandom.com/wiki/Wood_Crop_Plot",
    craft: [
      {
        id: "wood",
        amount: 8,
      },
      {
        id: "sulfur",
        amount: 10,
      },
    ],
    bench: "crafting-bench",
  },
  {
    id: "wood-cupboard",
    name: "Wood Cupboard",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/0/0a/ITEM_Wood_Cupboard.png/revision/latest?cb=20210916184737",
    url: "https://icarus.fandom.com/wiki/Wood_Cupboard",
    craft: [
      {
        id: "wood",
        amount: 40,
      },
      {
        id: "leather",
        amount: 8,
      },
      {
        id: "copper-nail",
        amount: 4,
      },
      {
        id: "rope",
        amount: 8,
      },
    ],
    bench: "crafting-bench",
  },
  {
    id: "wood-door",
    name: "Wood Door",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/2/2d/ITEM_Wood_Door.png/revision/latest?cb=20210916185123",
    url: "https://icarus.fandom.com/wiki/Wood_Door",
    craft: [
      {
        id: "fiber",
        amount: 8,
      },
      {
        id: "wood",
        amount: 10,
      },
    ],
  },
  {
    id: "wood-floor",
    name: "Wood Floor",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/8/89/ITEM_Wood_Floor.png/revision/latest?cb=20210921031254",
    url: "https://icarus.fandom.com/wiki/Wood_Floor",
    craft: [
      {
        id: "fiber",
        amount: 12,
      },
      {
        id: "wood",
        amount: 20,
      },
    ],
  },

  {
    id: "wood-halfpieces",
    name: "Wood Halfpieces",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/9/97/ITEM_Wood_Halfpieces.png/revision/latest?cb=20211224000737",
    url: "https://icarus.fandom.com/wiki/Wood_Halfpieces",
    craft: [
      {
        id: "fiber",
        amount: 12,
      },
      {
        id: "wood",
        amount: 20,
      },
    ],
  },
  {
    id: "wood-halfpitches",
    name: "Wood Halfpitches",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/2/29/ITEM_Wood_Halfpitches.png/revision/latest?cb=20211224000748",
    url: "https://icarus.fandom.com/wiki/Wood_Halfpitches",
    craft: [
      {
        id: "fiber",
        amount: 12,
      },
      {
        id: "wood",
        amount: 20,
      },
    ],
  },
  {
    id: "wood-ladder",
    name: "Wood Ladder",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/d/d3/ITEM_Wood_Ladder.png/revision/latest?cb=20210916185123",
    url: "https://icarus.fandom.com/wiki/Wood_Ladder",
    craft: [
      {
        id: "fiber",
        amount: 6,
      },
      {
        id: "wood",
        amount: 10,
      },
    ],
  },
  {
    id: "wood-pile",
    name: "Wood Pile",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/d/dd/ITEM_Wood_Pile.png/revision/latest?cb=20211224011221",
    url: "https://icarus.fandom.com/wiki/Wood_Pile",
    craft: [
      {
        id: "wood",
        amount: 100,
      },
    ],
  },
  {
    id: "wood-rag-torch",
    name: "Wood Rag Torch",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/c/c0/ITEM_Wood_Rag_Torch.png/revision/latest?cb=20210915210634",
    url: "https://icarus.fandom.com/wiki/Wood_Rag_Torch",
    craft: [
      {
        id: "fiber",
        amount: 40,
      },
      {
        id: "stick",
        amount: 8,
      },
    ],
    bench: "character-crafting",
  },
  {
    id: "wood-railing",
    name: "Wood Railing",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/9/9b/ITEM_Wood_Railing.png/revision/latest?cb=20210921033317",
    url: "https://icarus.fandom.com/wiki/Wood_Railing",
    craft: [
      {
        id: "fiber",
        amount: 8,
      },
      {
        id: "wood",
        amount: 8,
      },
    ],
  },
  {
    id: "wood-ramp",
    name: "Wood Ramp",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/0/04/ITEM_Wood_Ramp.png/revision/latest?cb=20210921033317",
    url: "https://icarus.fandom.com/wiki/Wood_Ramp",
    craft: [
      {
        id: "fiber",
        amount: 12,
      },
      {
        id: "wood",
        amount: 20,
      },
    ],
  },
  {
    id: "wood-repair-hammer",
    name: "Wood Repair Hammer",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/c/cc/ITEM_Wood_Hammer.png/revision/latest?cb=20210915204804",
    url: "https://icarus.fandom.com/wiki/Wood_Repair_Hammer",
    craft: [
      {
        id: "fiber",
        amount: 10,
      },
      {
        id: "stick",
        amount: 4,
      },
      {
        id: "stone",
        amount: 6,
      },
    ],
    bench: "character-crafting",
  },

  {
    id: "wood-table",
    name: "Wood Table",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/c/cf/ITEM_Wood_Table.png/revision/latest?cb=20210916185123",
    url: "https://icarus.fandom.com/wiki/Wood_Table",
    craft: [
      {
        id: "refined-wood",
        amount: 10,
      },
      {
        id: "copper-nail",
        amount: 10,
      },
    ],
    bench: "carpentry-bench",
  },
  {
    id: "wood-torch",
    name: "Wood Torch",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/b/b5/ITEM_Wood_Torch.png/revision/latest?cb=20210916020934",
    url: "https://icarus.fandom.com/wiki/Wood_Torch",
    craft: [
      {
        id: "fiber",
        amount: 40,
      },
      {
        id: "stick",
        amount: 8,
      },
      {
        id: "sulfur",
        amount: 8,
      },
    ],
    bench: "character-crafting",
  },

  {
    id: "workshop-repair-kit-bundle",
    name: "Workshop Repair Kit Bundle",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/0/05/ITEM_Workshop_Repair_Kit_Bundle.png/revision/latest?cb=20220422090140",
    url: "https://icarus.fandom.com/wiki/Workshop_Repair_Kit_Bundle",
    craft: [],
  },

  {
    id: "young-coconut",
    name: "Young Coconut",
    imageUrl:
      "https://static.wikia.nocookie.net/icarus/images/6/62/ITEM_Young_Coconut.png/revision/latest?cb=20211224115946",
    url: "https://icarus.fandom.com/wiki/Young_Coconut",
    craft: [],
  },
];

export const craftables: Record<string, Craftable[]> = {
  attachments,
  base,
  buildingRelated,
  consumables,
  cooking,
  deployables,
  farming,
  ingots,
  tools,
  trophies,
  unsortedCraftables,
};

writeFileSync("./sortedCraftables.json", JSON.stringify(craftables, null, 2));
