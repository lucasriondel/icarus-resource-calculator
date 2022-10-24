export interface Resource {
  id: string;
  name: string;
  createdWith?: Array<{
    benchId: string;
  }>;
  createdFrom?: Array<{
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
    createdFrom: [
      {
        resourceId: "resource-iron-ore",
        amount: 2,
      },
    ],
    createdWith: [
      {
        benchId: "bench-stone-furnace",
      },
    ],
  },
  {
    id: "resource-copper-ingot",
    name: "Copper Ingot",
    createdFrom: [
      {
        resourceId: "resource-copper-ore",
        amount: 2,
      },
    ],
    createdWith: [
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
