export interface Craftable {
  id: string;
  name: string;
  url?: string;
  imageUrl?: string;
  bench?: string;
  craft:
    | Array<{
        id: string;
        amount: number | null;
      }>
    | Array<{
        id: string;
        amount: number | null;
      }>[];
}

export const craftables: Record<string, Craftable[]> = {};
