import { describe, expect, it } from "vitest";
import { Decomposer } from "../Decomposer";
import { getResourceFromResourceId } from "../helper";
import { getResourceForTests, getResourceWithAmount } from "./testHelper";

describe("Decomposer", () => {
  describe("getPathToResource", () => {
    it("test with basic resource", () => {
      const decomposer = new Decomposer();

      const wood = getResourceFromResourceId("wood");
      const amount = 4;

      const result = decomposer.getPathToResource(wood, amount);

      expect(result).toEqual([getResourceWithAmount(wood, amount)]);
    });

    it("test with resource that has variants", () => {
      const decomposer = new Decomposer();

      const epoxy = getResourceFromResourceId("epoxy");
      const amount = 10;

      const result = decomposer.getPathToResource(epoxy, amount);

      expect(result).toEqual([
        getResourceForTests("epoxy-crushed-bone", 10, [
          getResourceForTests("crushed-bone", 40, [
            getResourceForTests("bone", 80),
          ]),
        ]),
      ]);
    });

    it("test with resource that has variants and a forced variant", () => {
      const decomposer = new Decomposer();

      const epoxy = getResourceFromResourceId("epoxy");
      const amount = 10;

      const result = decomposer.getPathToResource(epoxy, amount, [
        epoxy.variants![1],
      ]);

      expect(result).toEqual([
        getResourceForTests("epoxy-sulfur-and-tree-sap", 10, [
          getResourceForTests("sulfur", 20),
          getResourceForTests("tree-sap", 40, [
            getResourceForTests("stick", 160),
          ]),
        ]),
      ]);
    });

    it("test with complex resource (electronics)", () => {
      const decomposer = new Decomposer();

      const electronics = getResourceFromResourceId("electronics");
      const amount = 10;

      const result = decomposer.getPathToResource(electronics, amount);

      expect(result).toEqual([
        getResourceForTests("electronics", 10, [
          getResourceForTests("refined-gold", 10, [
            getResourceForTests("gold-ore", 20),
          ]),
          getResourceForTests("copper-ingot", 30, [
            getResourceForTests("copper-ore", 60),
          ]),
          getResourceForTests("organic-resin", 20, [
            getResourceForTests("wood", 20),
            getResourceForTests("oxite", 20),
          ]),
          getResourceForTests("epoxy-crushed-bone", 20, [
            getResourceForTests("crushed-bone", 80, [
              getResourceForTests("bone", 160),
            ]),
          ]),
        ]),
      ]);
    });

    it("test with complex resource (electronics) and forced variant", () => {
      const decomposer = new Decomposer();

      const electronics = getResourceFromResourceId("electronics");
      const amount = 10;

      const result = decomposer.getPathToResource(electronics, amount, [
        "epoxy-sulfur-and-tree-sap",
      ]);

      expect(result).toEqual([
        getResourceForTests("electronics", 10, [
          getResourceForTests("refined-gold", 10, [
            getResourceForTests("gold-ore", 20),
          ]),
          getResourceForTests("copper-ingot", 30, [
            getResourceForTests("copper-ore", 60),
          ]),
          getResourceForTests("organic-resin", 20, [
            getResourceForTests("wood", 20),
            getResourceForTests("oxite", 20),
          ]),
          getResourceForTests("epoxy-sulfur-and-tree-sap", 20, [
            getResourceForTests("sulfur", 40),
            getResourceForTests("tree-sap", 80, [
              getResourceForTests("stick", 320),
            ]),
          ]),
        ]),
      ]);
    });
  });
});
