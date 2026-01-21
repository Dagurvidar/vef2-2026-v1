/* útfæra */
//finnur elements með klasa counter og correct
const correctElement = document.querySelector(".counter .correct");
const incorrectElement = document.querySelector(".counter .incorrect");
if (!correctElement || !incorrectElement) {
  console.error('unable to find "correct" or "incorrect" element');
}

function questionAnswerHandler(e) {
  const button = e.target;

  const isCorrect = button.classList.contains("button-correct");

  if (isCorrect) {
  }
}

const buttons = document.querySelector("button");

console.log(buttons);

for (const button of buttons) {
  button.addEventListener("click", questionAnswerHandler);
}

export function generateIndexHtml() {
  const html = /* html */ `
        <html>
            <head>
                <script>
            </head>
            
    `;

  return html;
}
