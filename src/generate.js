import fs from "node:fs/promises";

const MAX_QUESTIONS_PER_CATEGORY = 30;

function parseLine(line) {
  const split = line.split(",");
  const categoryNumber = split[0];
  const subcategory = split[1];
  const difficulty = split[2];
  const quality = split[3];
  const question = split[4];
  const answer = split[5];

  const q = {
    categoryNumber,
    subcategory,
    difficulty,
    quality,
    question,
    answer,
  };

  return q;
}

/**
 *
 * @param {*} q
 */
function generateQuestionHtml(q) {
  const html = `
    <section>
    <h3>${q.question}</h3>
    <p>${q.answer}</p>
    </section>
  `;
  return html;
}

async function main() {
  const content = await fs.readFile("./questions.csv", "utf-8");

  const lines = content.split("\n");

  const questions = lines.map(parseLine);

  const qualityHistoryQuestions = questions
    .filter((q) => q.categoryNumber === "4" && q.difficulty === "1")
    .slice(0, MAX_QUESTIONS_PER_CATEGORY);

  console.log(qualityHistoryQuestions.slice(0, 3));

  const output = qualityHistoryQuestions.map(generateQuestionHtml).join("\n");
  const path = "./dist/saga.html";
  fs.writeFile(path, output, "utf-8");
}

//keyrir main með try-catch
main().catch((error) => {
  console.error("error generating", error);
});
