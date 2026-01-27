const quizData = [
  {
    question: "Which HTML tag is used to link JavaScript file?",
    options: ["<js>", "<javascript>", "<script>", "<link>"],
    correct: 2
  },
  {
    question: "Which CSS property controls text size?",
    options: ["font-style", "text-size", "font-size", "text-style"],
    correct: 2
  },
  {
    question: "Which keyword is used to declare constant in JS?",
    options: ["var", "let", "const", "static"],
    correct: 2
  },
  {
    question: "Which method converts JSON to object?",
    options: ["JSON.parse()", "JSON.stringify()", "JSON.convert()", "JSON.object()"],
    correct: 0
  }
];

let index = 0;
let score = 0;
let timeLeft = 15;
let timer;
let answered = false;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const resultEl = document.getElementById("result");
const timeEl = document.getElementById("time");
const progressBar = document.getElementById("progressBar");

function loadQuestion() {
  answered = false;
  timeLeft = 15;
  timeEl.textContent = timeLeft;
  optionsEl.innerHTML = "";
  resultEl.innerHTML = "";

  updateProgress();
  startTimer();

  const q = quizData[index];
  questionEl.textContent = q.question;

  q.options.forEach((opt, i) => {
    const div = document.createElement("div");
    div.className = "option";
    div.textContent = opt;
    div.onclick = () => checkAnswer(div, i);
    optionsEl.appendChild(div);
  });
}

function startTimer() {
  clearInterval(timer);
  timer = setInterval(() => {
    timeLeft--;
    timeEl.textContent = timeLeft;
    if (timeLeft === 0) {
      clearInterval(timer);
      answered = true;
      highlightCorrect();
    }
  }, 1000);
}

function checkAnswer(element, i) {
  if (answered) return;
  answered = true;
  clearInterval(timer);

  const correct = quizData[index].correct;

  if (i === correct) {
    element.classList.add("correct");
    score++;
  } else {
    element.classList.add("wrong");
    optionsEl.children[correct].classList.add("correct");
  }
}

function highlightCorrect() {
  optionsEl.children[quizData[index].correct].classList.add("correct");
}

function updateProgress() {
  const progress = ((index) / quizData.length) * 100;
  progressBar.style.width = progress + "%";
}

nextBtn.onclick = () => {
  index++;
  if (index < quizData.length) {
    loadQuestion();
  } else {
    showResult();
  }
};

function showResult() {
  clearInterval(timer);
  questionEl.textContent = "Quiz Finished 🎉";
  optionsEl.innerHTML = "";
  nextBtn.style.display = "none";

  const percentage = Math.round((score / quizData.length) * 100);
  let message = percentage >= 70 ? "Excellent Performance 🚀" : "Keep Practicing 💪";

  resultEl.innerHTML = `Score: ${score}/${quizData.length}<br>Percentage: ${percentage}%<br>${message}`;
}

