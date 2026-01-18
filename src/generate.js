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
        q.subcategory !== "Stærðfræði"
    )
    .slice(0, MAX_QUESTIONS_PER_CATEGORY);
  const easyGameQuestions = questions
    .filter((q) => q.subcategory === "Tölvur og tækni" && q.difficulty === "1")
    .slice(0, MAX_QUESTIONS_PER_CATEGORY);

  console.log(easyHistoryQuestions);

  var output = easyHistoryQuestions.map(generateQuestionHtml).join("\n");
  var path = "./dist/saga.html";
  fs.writeFile(path, output, "utf-8");

  output = easyMusicQuestions.map(generateQuestionHtml).join("\n");
  path = "./dist/tonlist.html";
  fs.writeFile(path, output, "utf-8");

  output = easyGeoQuestions.map(generateQuestionHtml).join("\n");
  path = "./dist/lond.html";
  fs.writeFile(path, output, "utf-8");

  output = easyLitQuestions.map(generateQuestionHtml).join("\n");
  path = "./dist/bokmenntir.html";
  fs.writeFile(path, output, "utf-8");

  output = easyStemQuestions.map(generateQuestionHtml).join("\n");
  path = "./dist/visindi.html";
  fs.writeFile(path, output, "utf-8");

  output = easyGameQuestions.map(generateQuestionHtml).join("\n");
  path = "./dist/leikir.html";
  fs.writeFile(path, output, "utf-8");
}

//keyrir main með try-catch
main().catch((error) => {
  console.error("error generating", error);
});
