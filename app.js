const words = ["apple", "banana", "orange", "kiwi"];
const hints = ["Fruit", "Fruit", "Fruit", "Fruit", "Fruit"];
let remainingWords = [...words];
let currentWordIndex = 0;
let score = 0;
let timer;

const startButton = document.getElementById("startButton");
const hintButton = document.getElementById("hintButton");
const nextButton = document.getElementById("nextButton");
const wordInput = document.getElementById("wordInput");
const wordDisplay = document.getElementById("wordDisplay");
const wordBoxes = document.getElementById("wordBoxes");
const hintsContainer = document.getElementById("hints");
const alphabetContainer = document.getElementById("alphabetContainer");
const timerDisplay = document.getElementById("timer");
const scoreDisplay = document.getElementById("score");

// Add a restart button
const restartButton = document.createElement("button");
restartButton.textContent = "Restart";
restartButton.disabled = true;
restartButton.id = "restartButton";
restartButton.classList.add("btn");
document.querySelector(".action-btns").appendChild(restartButton);

startButton.addEventListener("click", startGame);
hintButton.addEventListener("click", showHints);
nextButton.addEventListener("click", nextWord);

// Show full alphabet initially
showAlphabets();

function startGame() {
  score = 0;
  currentWordIndex = 0;
  remainingWords = [...words];
  updateScore();
  nextWord();
  alphabetContainer.style.display = "block";
  restartButton.disabled = false;

  const alphabetButtons = document.querySelectorAll(".alphabet");
  alphabetButtons.forEach((button) => {
    button.style.boxShadow = "0 0 20px 5px rgba(255, 255, 255, 0.7)";
  });
}

function nextWord() {
  if (remainingWords.length > 0) {
    currentWordIndex = Math.floor(Math.random() * remainingWords.length);
    wordDisplay.textContent = "";
    wordBoxes.innerHTML = "";
    createWordBoxes(remainingWords[currentWordIndex]);
    showAlphabets();
    startTimer();
  } else {
    clearInterval(timer);
    wordDisplay.textContent = "Game Over!";
    wordDisplay.style.color = "greenyellow";
    alphabetContainer.style.display = "none";
    wordBoxes.style.display = "none";
  }
}

function checkWord() {
  const enteredWord = wordInput.value.trim().toLowerCase();
  const targetWord = remainingWords[currentWordIndex];

  if (enteredWord === targetWord) {
    score++;
    updateScore();
    remainingWords.splice(currentWordIndex, 1);
    if (remainingWords.length > 0) {
      currentWordIndex = Math.floor(Math.random() * remainingWords.length);
    } else {
      currentWordIndex = -1;
    }
    nextWord();
  } else {
    alert("Incorrect word! Try again.");
  }
}

function updateScore() {
  scoreDisplay.textContent = `Score: ${score}`;
}

function startTimer() {
  let secondsLeft = 30;
  timerDisplay.textContent = `Time: ${secondsLeft} `;

  timerDisplay.style.backgroundColor = "green";

  timer = setInterval(() => {
    secondsLeft--;
    if (secondsLeft >= 0) {
      timerDisplay.textContent = `Time: ${secondsLeft} `;
    } else {
      clearInterval(timer);
      wordDisplay.textContent = "Lost!";
      wordDisplay.style.color = "red";
      endGame();
    }
  }, 1000);
}

function endGame() {
  setTimeout(() => {
    startButton.disabled = true;
    hintButton.disabled = true;
    nextButton.disabled = true;
    wordBoxes.style.display = "none";
    restartButton.style.display = "block";

    const alphabetButtons = document.querySelectorAll(".alphabet");
    alphabetButtons.forEach((button) => {
      button.style.boxShadow = "none";
    });
  }, 1000);
}

restartButton.addEventListener("click", () => {
  restartGame();
});

function restartGame() {
  score = 0;
  updateScore();
  startButton.disabled = true;
  startGame();

  wordBoxes.style.display = "block";
}

function showHints() {
  hintsContainer.textContent = `Hint: ${
    hints[words.indexOf(remainingWords[currentWordIndex])]
  }`;
}

function showAlphabets() {
  alphabetContainer.innerHTML = "";
  const alphabets = "abcdefghijklmnopqrstuvwxyz";
  if (remainingWords.length > 0) {
    const currentWord = remainingWords[currentWordIndex];
    for (let i = 0; i < alphabets.length; i++) {
      const alphabetButton = document.createElement("button");
      alphabetButton.textContent = alphabets[i].toUpperCase();
      alphabetButton.classList.add("alphabet");

      alphabetButton.addEventListener(
        "click",
        ((index) => {
          return () => {
            const enteredLetter = alphabets[index];

            if (currentWord && currentWord.includes(enteredLetter)) {
              const boxes = document.querySelectorAll(".word-box");
              for (let j = 0; j < currentWord.length; j++) {
                if (
                  currentWord[j] === enteredLetter &&
                  boxes[j].textContent === ""
                ) {
                  boxes[j].textContent = enteredLetter;
                }
              }
              if (checkWordFound()) {
                clearInterval(timer);
                score++;
                updateScore();
                remainingWords.splice(currentWordIndex, 1);
                currentWordIndex--;
                nextWord();
              }
            }
          };
        })(i)
      );
      alphabetContainer.appendChild(alphabetButton);
    }
  }
}

function createWordBoxes(word) {
  const numberOfLetters = word.length;
  for (let i = 0; i < numberOfLetters; i++) {
    const box = document.createElement("div");
    box.classList.add("word-box");
    wordBoxes.style.backgroundColor = "transparent";
    wordBoxes.appendChild(box);
  }
}

function checkWordFound() {
  const boxes = document.querySelectorAll(".word-box");
  for (let box of boxes) {
    if (box.textContent === "") {
      return false;
    }
  }
  return true;
}
