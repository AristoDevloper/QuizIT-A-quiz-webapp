const selectedGenre = sessionStorage.getItem("genre");

const params = new URLSearchParams({
    selected_genre: selectedGenre
});

let questions = [];
let currentIndex = 0;
let lockAnswers = false;
let score=0;

const quizBox = document.getElementsByTagName('main');
const questionEl = document.querySelector(".question h1");
const answersEl = document.querySelector(".answers");
const currentQuestionEl = document.getElementById("current_question");
const totalQuestionEl = document.getElementById("total_question");

fetch(`/quizQuestions/?${params.toString()}`)
    .then(res => res.json())
    .then(data => {
        questions = data;
        totalQuestionEl.textContent = questions.length;
        loadQuestion();
    })
    .catch(() => console.log("Failed to get data"));

function loadQuestion() {
    lockAnswers = false;
    answersEl.innerHTML = "";

    const q = questions[currentIndex];

    questionEl.textContent = q.question;
    currentQuestionEl.textContent = currentIndex + 1;

    const answers = [
        q.rightAnswer,
        q.wrongAnswer1,
        q.wrongAnswer2,
        q.wrongAnswer3,
    ].sort(() => Math.random() - 0.5);

    answers.forEach(answer => {
        const div = document.createElement("div");
        div.classList.add("answer");
        div.textContent = answer;

        div.addEventListener("click", () =>
            checkAnswer(div, answer, q.rightAnswer)
        );

        answersEl.appendChild(div);
    });
}

function checkAnswer(clickedDiv, selected, correct) {
    if (lockAnswers) return;
    lockAnswers = true;

    const allAnswers = document.querySelectorAll(".answer");

    allAnswers.forEach(div => {
        div.classList.add("disabled");

        if (div.textContent === correct) {
            div.classList.add("correct");
            score+=5;
        }
    });

    if (selected !== correct) {
        clickedDiv.classList.add("wrong");
    }

    setTimeout(() => {
        currentIndex++;

        if (currentIndex < questions.length) {
            loadQuestion();
        } 
        else {
            // Save result data
            sessionStorage.setItem("score", score);
            sessionStorage.setItem("genre", selectedGenre);
            sessionStorage.setItem("username", "Aryan Danuwar"); // later dynamic

            // Redirect to result page
            window.location.href = "/resultPage/";
        }
    }, 1200);
}
