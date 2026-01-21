import fs from "node:fs/promises";
import { parseLine } from "../src/lib/parse.js";
import { createCategorySites } from "./lib/html.js";

export const MAX_QUESTIONS_PER_CATEGORY = 30;

async function main() {
  //búa til .dist möppu ef ekki til
  const distPath = "./dist";
  await fs.mkdir(distPath);

  const content = await fs.readFile("./questions.csv", "utf-8");

  const lines = content.split("\n");

  const questions = lines.map(parseLine);

  await createCategorySites(questions);
}

//keyrir main með try-catch
main().catch((error) => {
  console.error("error generating", error);
});
