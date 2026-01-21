import assert from "node:assert";
import { describe, it } from "node:test";
import { parseLine, parseQuestions } from "./parse.js";

describe("parse", () => {
  describe("parseQuestions", () => {
    it("should test", () => {
      const result = parseQuestions();
      assert.strictEqual(result, "test");
    });
  });

  describe("parseLine", () => {
    it("should parse a legit question string", () => {
      const input =
        '6,Tónlist,2,,"Hver gerði lagið ""Jump they say""",David Bowie';
      const output = parseLine(input);

      assert.strictEqual(output?.answer, "David Bowie");
      assert.strictEqual(output?.categoryNumber, "6");
    });
  });
});
