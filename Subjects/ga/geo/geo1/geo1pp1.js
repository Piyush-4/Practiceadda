/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight,
      sectionTop = current.offsetTop - 50,
      sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.add("active-link");
    } else {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.remove("active-link");
    }
  });
}
window.addEventListener("scroll", scrollActive);

/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader() {
  const header = document.getElementById("header");
  // When the scroll is greater than 80 viewport height, add the scroll-header class to the header tag
  if (this.scrollY >= 80) header.classList.add("scroll-header");
  else header.classList.remove("scroll-header");
}
window.addEventListener("scroll", scrollHeader);

/*=========header section ends here=======*/

/*=========Test section starts here=======*/

let startBtn = document.querySelector(".start-btn"),
  backBtn = document.querySelector(".back-btn"),
  instructionCard = document.querySelector(".instruction"),
  instructionExit = document.querySelectorAll(".instruction button")[0],
  startQuizBtn = document.querySelectorAll(".instruction button")[1],
  wrapper = document.querySelector(".wrapper"),
  nxtBtn = document.querySelector(".btn button"),
  resultCard = document.querySelector(".result-card"),
  time = document.querySelectorAll(".Timer p")[1],
  progressBar = document.querySelector(".inner"),
  questionEl = document.querySelector(".question-container"),
  answerContainer = document.querySelector(".option-container"),
  currentQuestionNum = document.querySelector(".current-question"),
  totalQuestion = document.querySelector(".total-question"),
  totalScore = document.querySelector(".total-score .value"),
  yourScore = document.querySelector(".user-score .value"),
  unattempted = document.querySelector(".unattempted .value"),
  attempted = document.querySelector(".attempted .value"),
  wrong = document.querySelector(".wrong .value"),
  replayQuiz = document.querySelectorAll(".score-btn button")[0];
exitQuiz = document.querySelectorAll(".score-btn button")[1];
let currentQuestion = 0;
let userAnswers = [];
let timer,
  progressInterval,
  width = 1,
  score = 0,
  attemptQuestion = 0,
  unattemptedQuestion = 0,
  wrongQuestion = 0;

replayQuiz.addEventListener("click", () => {
  resultCard.style.width = "0";
  resultCard.style.transform = "scale(0)";
  wrapper.style.transform = "scale(1)";
  wrapper.style.width = "100%";
  currentQuestion = 0;
  (score = 0),
    (attemptQuestion = 0),
    (unattemptedQuestion = 0),
    (wrongQuestion = 0);
  startQuiz();
});
exitQuiz.addEventListener("click", () => {
  resultCard.style.width = "0";
  resultCard.style.transform = "scale(0)";
  currentQuestion = 0;
  (score = 0),
    (attemptQuestion = 0),
    (unattemptedQuestion = 0),
    (wrongQuestion = 0);
  startBtn.style.transform = "scale(1)";
  startBtn.style.width = "100%";
});

startBtn.addEventListener("click", () => {
  instructionCard.style.transform = "scale(1)";
  instructionCard.style.width = "100%";
  instructionCard.style.opacity = "1";
  startBtn.style.transform = "scale(0)";
  startBtn.style.width = "0";
});
// backBtn.addEventListener("click", () => {
//   instructionCard.style.transform = "scale(1)";
//   instructionCard.style.width = "100%";
//   instructionCard.style.opacity = "1";
//   backBtn.style.transform = "scale(0)";
//   backBtn.style.width = "0";
// });

instructionExit.addEventListener("click", () => {
  instructionCard.style.transform = "scale(0)";
  instructionCard.style.width = "0%";
  startBtn.style.transform = "scale(1)";
  startBtn.style.width = "100%";
});

startQuizBtn.addEventListener("click", () => {
  wrapper.style.transform = "scale(1)";
  wrapper.style.width = "100%";
  instructionCard.style.transform = "scale(0)";
  instructionCard.style.width = "0%";
  startQuiz();
});

const questions = [
  {
    question: "Identify the terrestrial planet from among the following.",
    options: ["Uranus", "Jupiter", "Mercury", "Neptune"],
    answer: "2",
  },
  {
    question: "Which of the following is the Galilean moon that was observed in 1610 by the Italian astronomer Galileo Galilei using a homemade telescope",
    options: [
      "Namaka",
      "Phobos",
      "Titan",
      "Ganymede",
    ],
    answer: "3",
  },
  {
    question: "Which of the following dwarf planets lies in the main asteroid belt?",
    options: ["Eris", "Makemake", "Ceres", "Haumea"],
    answer: "2",
  },
  {
    question: "The ______ radiation belts are giant swaths of magnetically trapped highly energetic charged particles that surround Earth.",
    options: ["Van Allen", "Aurora", "Kuiper", "Chinook"],
    answer: "0",
  },
  {
    question: "Which of the following celestial bodies has a natural satellite named 'Charon'?",
    options: [
      "Haumea",
      "Pluto",
      "Mars",
      "Saturn",
    ],
    answer: "1",
  },
  {
    question: "Which of the following planets does NOT have any moon?",
    options: ["Saturn", "Venus", "Uranus", "Jupiter"],
    answer: "1",
  },
  {
    question: "What do you call one of the most famous constellations that we can see during summertime in the early part of the night?",
    options: [
      "Cassiopeia",
      "Ursa Minor",
      "Orion",
      "Ursa Major",
    ],
    answer: "3",
  },
  {
    question: "Which of the following is a dwarf planet in our solar system?",
    options: ["Europa", "Callisto", "Makemake", "Ganymede"],
    answer: "2",
  },
  {
    question: "How many natural satellites did Jupiter have as of 31st July 2025?",
    options: ["95", "79", "93", "86"],
    answer: "0",
  },
  {
    question: "Which of the following is the windiest planet in the solar system?",
    options: [
      "Neptune",
      "Uranus",
      "Saturn",
      "Mars",
    ],
    answer: "0",
  },
  {
    question: "After full moon day, every night the size of the bright part of the moon appears to become thinner and thinner. On the fifteenth day, the moon is not visible. This day is known as:",
    options: ["half-moon day", "full moon day", "new moon day", "moon day"],
    answer: "2",
  },
  {
    question: "In which of the following periods is the meteor shower named Quadrantids generally visible from Earth?",
    options: [
      "August/September",
      "October/November",
      "May/June",
      "December/January",
    ],
    answer: "3",
  },
  {
    question: "In Which of the following months may the meteor shower named Lyrids be seen from Earth?",
    options: ["April", "February", "June", "August"],
    answer: "0",
  },
  {
    question: "Which of the following planets has no satellite of its own?",
    options: ["Mercury", "Jupiter", "Saturn", "Mars"],
    answer: "0",
  },
  {
    question: "How many brightest stars is the constellation called the Great Bear made up of?",
    options: [
      "Three",
      "Seven",
      "Five",
      "Nine",
    ],
    answer: "3",
  },
  {
    question: "Which of the following planets has the most number of moons?",
    options: ["Jupiter", "Saturn", "Uranus", "Neptune"],
    answer: "1",
  },
  {
    question: "Big Bang theory explains:",
    options: [
      "origin of Universe",
      "origin of Stars",
      "origin of Galaxies",
      "origin of Solar System",
    ],
    answer: "0",
  },
  {
    question: "What do you call the point in the orbit of the noon or a satellite at which it is nearest to Earth?",
    options: ["Perigee", "Eclipse", "Apsis", "Apogee"],
    answer: "0",
  },
  {
    question: "IC 1101 is a _______ .",
    options: ["asteroid", "galaxy", "supernova", "satellite"],
    answer: "1",
  },
  {
    question: "The approximate period between two consecutive new moons is _______ days.",
    options: [
      "15.5",
      "28.5",
      "29.5",
      "15",
    ],
    answer: "2",
  },
  {
    question: "How many natural satellites does the planet Venus have?",
    options: ["1", "2", "0", "3"],
    answer: "2",
  },
  {
    question: "What is the radius of the mooon?",
    options: [
      "1.78 X 10^6 m",
      "1.79 X 10^6 m",
      "1.74 X 10^5 m",
      "1.74 X 10^6 m",
    ],
    answer: "3",
  },
  {
    question: "During the phenomenon of aphelion, the approximate distance between the earth and the sun is:",
    options: ["137 million km", "152 million km", "147 million km", "142 million km"],
    answer: "1",
  },
  {
    question: "_____ is no longer considered as a planet within Earth's Solar system.",
    options: ["Neptun", "Pluto", "Mars", "Uranus"],
    answer: "1",
  },
  {
    question: "Which planet is made up of thick white and yellowish clouds of sulfuric acid?",
    options: [
      "Mars",
      "Uranus",
      "Neptune",
      "Venus",
    ],
    answer: "3",
  },
];

function startQuiz() {
  // Display the first question and its options
  displayQuestion(currentQuestion);

  // Start the timer
  timer = setInterval(updateTimer, 1000);

  // Update the progress bar
  updateProgress();
}

function displayQuestion(questionIndex) {
  updateProgress();
  // Get the question and options from the questions array
  let question = questions[questionIndex].question;
  let options = questions[questionIndex].options;

  // Display the question and options in their respective containers
  questionEl.innerHTML = question;

  for (let i = 0; i < options.length; i++) {
    let option = `<option onclick = checkAnswer(${i})>${options[i]} </option>`;

    answerContainer.insertAdjacentHTML("beforeend", option);
  }
}

function checkAnswer(selectedIndex) {
  // Get the selected answer from the user
  attemptQuestion++;
  answerContainer.style.pointerEvents = "none";
  clearInterval(timer);
  let selectedAnswer = questions[currentQuestion].options[selectedIndex];

  // Get the correct answer from the questions array
  let correctAnswer =
    questions[currentQuestion].options[questions[currentQuestion].answer];

  // Compare the selected answer to the correct answer
  if (selectedAnswer === correctAnswer) {
    score++;
    setTimeout(() => {
      document.querySelectorAll("option")[selectedIndex].style.backgroundColor =
        "#37BB1169";
      document.querySelectorAll("option")[selectedIndex].style.color = "#fff";
      document.querySelectorAll("option")[selectedIndex].style.borderColor =
        "green";
    }, 100);

    userAnswers[currentQuestion] = selectedIndex;

    // Display the correct answer and highlight it in green
  } else {
    wrongQuestion++;
    setTimeout(() => {
      document.querySelectorAll("option")[selectedIndex].style.backgroundColor =
        "#B6141469";
      document.querySelectorAll("option")[selectedIndex].style.color = "#fff";
      document.querySelectorAll("option")[selectedIndex].style.borderColor =
        "red";
      document.querySelectorAll("option")[
        questions[currentQuestion].answer
      ].style.backgroundColor = "#37BB1169";
      document.querySelectorAll("option")[
        questions[currentQuestion].answer
      ].style.color = "#fff";
      document.querySelectorAll("option")[
        questions[currentQuestion].answer
      ].style.borderColor = "green";
    }, 100);
  }
}

function nextQuestion() {
  // Check if the user has answered all questions

  answerContainer.style.pointerEvents = "initial";
  time.innerHTML = "15";
  updateProgress();
  timer = setInterval(updateTimer, 1000);
  answerContainer.innerHTML = "";
  if (currentQuestion === questions.length - 1) {
    resultCard.style.width = "300px";
    resultCard.style.transform = "scale(1)";
    totalScore.innerHTML = questions.length;
    yourScore.innerHTML = score;
    attempted.innerHTML = attemptQuestion;
    unattempted.innerHTML = unattemptedQuestion;
    wrong.innerHTML = wrongQuestion;
    wrapper.style.width = "0";
    wrapper.style.transform = "scale(0)";
    endQuiz();
  } else {
    // If there are more questions, update the currentQuestion variable and display the next question and its options
    currentQuestion++;
    currentQuestionNum.innerHTML = currentQuestion + 1;
    displayQuestion(currentQuestion);
  }
}

function updateTimer() {
  // Decrement the timer by 1 second
  let remainingTime = parseInt(timer.innerHTML) - 1;
//I have changed time to timer here
  // Update the timer display
  time.innerHTML = remainingTime > 9 ? remainingTime : "0" + remainingTime;

  // Update the progress bar

  // If the timer reaches 0, end the quiz
  if (remainingTime === 0) {
    unattemptedQuestion++;
    document.querySelectorAll("option")[
      questions[currentQuestion].answer
    ].style.backgroundColor = "#37BB1169";
    document.querySelectorAll("option")[
      questions[currentQuestion].answer
    ].style.color = "#fff";
    document.querySelectorAll("option")[
      questions[currentQuestion].answer
    ].style.borderColor = "green";
    answerContainer.style.pointerEvents = "none";
    endQuiz();
  }
}

function updateProgress() {
  progressBar.style.width =
    ((currentQuestion + 1) / questions.length) * 100 + "%";
}

function endQuiz() {
  // Stop the timer
  clearInterval(timer);

  // Hide the question and option containers
}

nxtBtn.addEventListener("click", nextQuestion);

totalQuestion.innerHTML = questions.length;
currentQuestionNum.innerHTML = currentQuestion + 1;
