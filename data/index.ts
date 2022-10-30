import craftablesJSON from "./craftables.json" assert { type: "json" };

export interface Craftable {
  id: string;
  name: string;
  url?: string;
  imageUrl?: string;
  bench?: string;
  craft:
    | Array<{
        id: string;
        amount: number;
      }>
    | Array<{
        id: string;
        amount: number;
      }>[];
  quantityProduced?: number;
}

export const craftables: Record<string, Craftable[]> = craftablesJSON as Record<
  string,
  Craftable[]
>;
