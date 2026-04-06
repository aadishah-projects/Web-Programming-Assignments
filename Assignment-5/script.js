const questionText = document.getElementById("questionText");
const optionList = document.getElementById("optionList");
const quizForm = document.getElementById("quizForm");
const nextButton = document.getElementById("nextButton");
const restartQuizButton = document.getElementById("restartQuiz");
const progressBadge = document.getElementById("progressBadge");
const quizMessage = document.getElementById("quizMessage");
const resultPanel = document.getElementById("resultPanel");
const quizStage = document.getElementById("quizStage");
const reviewList = document.getElementById("reviewList");
const correctAnswers = document.getElementById("correctAnswers");
const totalQuestions = document.getElementById("totalQuestions");
const scoreSummary = document.getElementById("scoreSummary");

const quizQuestions = [
    {
        prompt: "Which HTML tag is used to create a hyperlink?",
        options: ["<link>", "<a>", "<button>", "<p>"],
        correct: 1
    },
    {
        prompt: "Which CSS property changes the text color?",
        options: ["font-style", "background-color", "color", "text-align"],
        correct: 2
    },
    {
        prompt: "Which JavaScript keyword declares a block-scoped variable?",
        options: ["var", "const", "print", "echo"],
        correct: 1
    },
    {
        prompt: "Which method attaches an event handler in JavaScript?",
        options: ["appendChild()", "addEventListener()", "querySelector()", "setAttribute()"],
        correct: 1
    },
    {
        prompt: "Which selector targets an element with id='card' in CSS?",
        options: [".card", "#card", "card", "*card"],
        correct: 1
    }
];

const quizState = {
    currentIndex: 0,
    answers: new Array(quizQuestions.length).fill(null)
};

quizForm.addEventListener("submit", handleNext);
restartQuizButton.addEventListener("click", restartQuiz);

renderQuestion();

function handleNext(event) {
    event.preventDefault();

    const selectedOption = quizForm.querySelector('input[name="answer"]:checked');

    if (!selectedOption) {
        setMessage("Select an answer before moving on.", "error");
        return;
    }

    quizState.answers[quizState.currentIndex] = Number(selectedOption.value);

    if (quizState.currentIndex === quizQuestions.length - 1) {
        showResults();
        return;
    }

    quizState.currentIndex += 1;
    setMessage("Answer saved. Move to the next question.", "success");
    renderQuestion();
}

function renderQuestion() {
    const question = quizQuestions[quizState.currentIndex];
    const savedAnswer = quizState.answers[quizState.currentIndex];

    progressBadge.textContent = `Question ${quizState.currentIndex + 1} of ${quizQuestions.length}`;
    questionText.textContent = question.prompt;
    nextButton.textContent = quizState.currentIndex === quizQuestions.length - 1 ? "Finish quiz" : "Save and next";
    optionList.replaceChildren();

    question.options.forEach((option, index) => {
        const wrapper = document.createElement("div");
        wrapper.className = `option-card${savedAnswer === index ? " selected" : ""}`;

        const label = document.createElement("label");
        const radio = document.createElement("input");
        const copy = document.createElement("span");

        radio.type = "radio";
        radio.name = "answer";
        radio.value = index;
        radio.checked = savedAnswer === index;
        radio.addEventListener("change", updateSelectedCard);

        copy.textContent = option;

        label.append(radio, copy);
        wrapper.appendChild(label);
        optionList.appendChild(wrapper);
    });
}

function updateSelectedCard() {
    optionList.querySelectorAll(".option-card").forEach((card) => {
        const radio = card.querySelector('input[name="answer"]');
        card.classList.toggle("selected", radio.checked);
    });
}

function showResults() {
    const totalCorrect = quizQuestions.reduce((count, question, index) => {
        return count + (question.correct === quizState.answers[index] ? 1 : 0);
    }, 0);
    const percentage = (totalCorrect / quizQuestions.length) * 100;

    correctAnswers.textContent = totalCorrect;
    totalQuestions.textContent = quizQuestions.length;
    scoreSummary.textContent = `${percentage.toFixed(0)}%`;
    reviewList.replaceChildren();

    quizQuestions.forEach((question, index) => {
        const item = document.createElement("li");
        item.className = "item-card";

        const prompt = document.createElement("strong");
        const yourAnswer = document.createElement("span");
        const correctAnswer = document.createElement("span");

        prompt.textContent = question.prompt;
        yourAnswer.textContent = `Your answer: ${question.options[quizState.answers[index]] || "No answer"}`;
        correctAnswer.textContent = `Correct answer: ${question.options[question.correct]}`;

        item.append(prompt, yourAnswer, correctAnswer);
        reviewList.appendChild(item);
    });

    quizStage.hidden = true;
    resultPanel.hidden = false;
    progressBadge.textContent = "Quiz complete";
    progressBadge.className = "status status-good";
    setMessage("Quiz finished. Review your answers below.", "success");
}

function restartQuiz() {
    quizState.currentIndex = 0;
    quizState.answers = new Array(quizQuestions.length).fill(null);
    quizStage.hidden = false;
    resultPanel.hidden = true;
    progressBadge.className = "status status-warn";
    setMessage("Quiz reset. Start again from question one.", "success");
    renderQuestion();
}

function setMessage(text, tone) {
    quizMessage.textContent = text;
    quizMessage.className = tone ? `message ${tone}` : "message";
}
