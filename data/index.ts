import craftablesJSON from "./craftables.json" assert { type: "json" };

export interface CraftItem {
  id: string;
  amount: number;
}

export interface Craftable {
  id: string;
  name: string;
  url: string;
  imageUrl: string;
  bench?: string;
  variants?: string[];
  craft?: CraftItem[];
  quantityProduced?: number;
}

// @ts-ignore
export const craftables: Record<string, Craftable[]> = craftablesJSON as Record<
  string,
  Craftable[]
>;

if (process.env.NODE_ENV !== "development") {
  delete craftables.debug;
}
