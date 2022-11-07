import { Craftable } from "..";
import { ResourceWithAmount } from "../Decomposer";
import { getResourceFromResourceId } from "../helper";

export const getResourceWithAmount = (
  craftable: Craftable,
  amount: number
): ResourceWithAmount => {
  return {
    ...craftable,
    craft: craftable.craft?.map((craftItem) => ({
      ...craftItem,
      amount: craftItem.amount * amount,
    })),
    amount,
  };
};

export const getResourceForTests = (
  id: string,
  amount: number,
  craft: ResourceWithAmount[] = []
): ResourceWithAmount => {
  const craftable = getResourceFromResourceId(id);
  return {
    ...craftable,
    craft,
    amount,
  };
};
