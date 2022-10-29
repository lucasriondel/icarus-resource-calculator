export interface Resource {
  id: string;
  name: string;
  bench?: Array<{
    benchId: string;
  }>;
  craft?: Array<{
    resourceId: string;
    amount: number;
  }>;
}

export const resources: Resource[] = [
  {
    id: "resource-iron-ore",
    name: "Iron Ore",
  },
  {
    id: "resource-copper-ore",
    name: "Copper Ore",
  },
  {
    id: "resource-iron-ingot",
    name: "Iron Ingot",
    craft: [
      {
        resourceId: "resource-iron-ore",
        amount: 2,
      },
    ],
    bench: [
      {
        benchId: "bench-stone-furnace",
      },
    ],
  },
  {
    id: "resource-copper-ingot",
    name: "Copper Ingot",
    craft: [
      {
        resourceId: "resource-copper-ore",
        amount: 2,
      },
    ],
    bench: [
      {
        benchId: "bench-stone-furnace",
      },
    ],
  },
  {
    id: "resource-stick",
    name: "Stick",
  },
  {
    id: "resource-wood",
    name: "Wood",
  },
  {
    id: "resource-stone",
    name: "Stone",
  },
  {
    id: "resource-leather",
    name: "Leather",
  },
  {
    id: "resource-fiber",
    name: "Fiber",
  },
];
