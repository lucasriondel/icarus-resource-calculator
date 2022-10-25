export interface Tool {
  id: string;
  name: string;
  createdFrom: Array<{
    resourceId: string;
    amount: number;
  }>;
  createdWith: Array<{
    benchId: string;
  }>;
}

export const tools: Tool[] = [
  {
    id: "tool-iron-pickaxe",
    name: "Iron Pickaxe",
    createdWith: [
      {
        benchId: "bench-anvil",
      },
    ],
    createdFrom: [
      {
        resourceId: "resource-iron-ingot",
        amount: 6,
      },
      {
        resourceId: "resource-wood",
        amount: 5,
      },
      {
        resourceId: "resource-leather",
        amount: 4,
      },
    ],
  },
];
