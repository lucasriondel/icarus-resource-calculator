import craftablesJSON from "../items.json";

export interface Craftable {
  id: string;
  name: string;
  url?: string;
  imageUrl?: string;
  bench?: string;
  craft: Array<{
    id: string;
    amount: number;
  }>;
}

export const craftables: Craftable[] = craftablesJSON as Craftable[];
