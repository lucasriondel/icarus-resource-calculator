export interface Bench {
  id: string;
  name: string;
  createdFrom: Array<{
    resourceId: string;
    amount: number;
  }>;
  createdWith?: Array<{
    benchId: string;
  }>;
}

export const benchs: Bench[] = [
  {
    id: "bench-stone-furnace",
    name: "Stone Furnace",
    createdFrom: [
      {
        resourceId: "resource-stone",
        amount: 80,
      },
      {
        resourceId: "resource-stick",
        amount: 4,
      },
      {
        resourceId: "resource-wood",
        amount: 12,
      },
      {
        resourceId: "resource-leather",
        amount: 12,
      },
    ],
  },
  {
    id: "bench-crafting-bench",
    name: "Crafting Bench",
    createdFrom: [
      {
        resourceId: "resource-fiber",
        amount: 60,
      },
      {
        resourceId: "resource-wood",
        amount: 50,
      },
      {
        resourceId: "resource-stone",
        amount: 12,
      },
      {
        resourceId: "resource-leather",
        amount: 20,
      },
    ],
  },
  {
    id: "bench-anvil",
    name: "Anvil",
    createdFrom: [
      {
        resourceId: "resource-iron-ingot",
        amount: 40,
      },
      {
        resourceId: "resource-wood",
        amount: 20,
      },
      { resourceId: "resource-stone", amount: 10 },
    ],
    createdWith: [
      {
        benchId: "bench-crafting-bench",
      },
    ],
  },
];
