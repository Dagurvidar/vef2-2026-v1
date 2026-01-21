export function parseQuestions() {
  return "test";
}

export function parseLine(line) {
  const split = line.split(",");
  const categoryNumber = split[0];
  const subCategory = split[1];
  const difficulty = split[2];
  const quality = split[3];
  const question = split[4];
  const answer = split[5];

  if (split.length !== 6) {
    return null;
  }

  const q = {
    categoryNumber,
    subCategory,
    difficulty,
    quality,
    question,
    answer,
  };

  return q;
}
