import fs from "node:fs/promises";
import { MAX_QUESTIONS_PER_CATEGORY } from "../generate.js";

/**
 *
 * @param {*} q
 */
export function generateQuestionHtml(q) {
  const html = /* html */ `
    <section>
        <h3>${q.question}</h3>
        <p>${q.answer}</p>
    </section>
  `;
  return html;
}

export async function createCategorySites(questions) {
  questions = questions.filter((q) => q !== null);

  const easyHistoryQuestions = questions
    .filter((q) => q.categoryNumber === "4" && q.difficulty === "1")
    .slice(0, MAX_QUESTIONS_PER_CATEGORY);
  const easyMusicQuestions = questions
    .filter((q) => q.categoryNumber === "6" && q.difficulty === "1")
    .slice(0, MAX_QUESTIONS_PER_CATEGORY);
  const easyGeoQuestions = questions
    .filter((q) => q.categoryNumber === "5" && q.difficulty === "1")
    .slice(0, MAX_QUESTIONS_PER_CATEGORY);
  const easyLitQuestions = questions
    .filter((q) => q.categoryNumber === "3" && q.difficulty === "1")
    .slice(0, MAX_QUESTIONS_PER_CATEGORY);
  const easyStemQuestions = questions
    .filter(
      (q) =>
        q.categoryNumber === "2" &&
        q.difficulty === "1" &&
        q.subcategory !== "Stærðfræði",
    )
    .slice(0, MAX_QUESTIONS_PER_CATEGORY);
  const easyGameQuestions = questions
    .filter((q) => q.subcategory === "Tölvur og tækni" && q.difficulty === "1")
    .slice(0, MAX_QUESTIONS_PER_CATEGORY);

  var output = easyHistoryQuestions.map(generateQuestionHtml).join("\n");
  var path = "./dist/saga.html";
  await fs.writeFile(path, output, "utf-8");

  output = easyMusicQuestions.map(generateQuestionHtml).join("\n");
  path = "./dist/tonlist.html";
  await fs.writeFile(path, output, "utf-8");

  output = easyGeoQuestions.map(generateQuestionHtml).join("\n");
  path = "./dist/lond.html";
  await fs.writeFile(path, output, "utf-8");

  output = easyLitQuestions.map(generateQuestionHtml).join("\n");
  path = "./dist/bokmenntir.html";
  await fs.writeFile(path, output, "utf-8");

  output = easyStemQuestions.map(generateQuestionHtml).join("\n");
  path = "./dist/visindi.html";
  await fs.writeFile(path, output, "utf-8");

  output = easyGameQuestions.map(generateQuestionHtml).join("\n");
  path = "./dist/leikir.html";
  await fs.writeFile(path, output, "utf-8");
}
