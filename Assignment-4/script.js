const guessForm = document.getElementById("guessForm");
const guessInput = document.getElementById("guessInput");
const scoreValue = document.getElementById("scoreValue");
const attemptValue = document.getElementById("attemptValue");
const feedbackMessage = document.getElementById("feedbackMessage");
const guessHistory = document.getElementById("guessHistory");
const gameStatus = document.getElementById("gameStatus");
const newGameButton = document.getElementById("newGameButton");

let gameState = createGameState();

guessForm.addEventListener("submit", handleGuess);
newGameButton.addEventListener("click", resetGame);

renderGame();

function handleGuess(event) {
    event.preventDefault();

    if (gameState.finished) {
        setFeedback("Start a new game to continue playing.", "error");
        return;
    }

    const guess = Number(guessInput.value);

    if (!Number.isInteger(guess) || guess < 1 || guess > 100) {
        setFeedback("Enter a whole number from 1 to 100.", "error");
        return;
    }

    gameState.attempts += 1;

    if (guess === gameState.secret) {
        gameState.finished = true;
        gameState.history.unshift({ guess, hint: "Correct" });
        gameStatus.textContent = "Won";
        gameStatus.className = "status status-good";
        setFeedback(`Correct. The secret number was ${gameState.secret}.`, "success");
    } else {
        const hint = guess > gameState.secret ? "High" : "Low";
        gameState.score = Math.max(0, gameState.score - 10);
        gameState.history.unshift({ guess, hint });

        if (gameState.score === 0) {
            gameState.finished = true;
            gameStatus.textContent = "Lost";
            gameStatus.className = "status status-bad";
            setFeedback(`No score left. The number was ${gameState.secret}.`, "error");
        } else {
            setFeedback(`${hint}. Score decreased by 10.`, "error");
        }
    }

    guessForm.reset();
    guessInput.focus();
    renderGame();
}

function resetGame() {
    gameState = createGameState();
    guessForm.reset();
    guessInput.focus();
    gameStatus.textContent = "In progress";
    gameStatus.className = "status status-warn";
    setFeedback("New game started. Try to guess the secret number.", "success");
    renderGame();
}

function renderGame() {
    scoreValue.textContent = gameState.score;
    attemptValue.textContent = gameState.attempts;
    guessHistory.replaceChildren();

    if (gameState.history.length === 0) {
        const emptyItem = document.createElement("li");
        emptyItem.className = "empty-state";
        emptyItem.textContent = "No guesses yet.";
        guessHistory.appendChild(emptyItem);
        return;
    }

    gameState.history.forEach((entry) => {
        const item = document.createElement("li");
        item.className = "item-card guess-entry";

        const guessLabel = document.createElement("strong");
        guessLabel.textContent = `Guess ${entry.guess}`;

        const hintLabel = document.createElement("span");
        hintLabel.textContent = entry.hint;
        hintLabel.className = `status ${entry.hint === "Correct" ? "status-good" : "status-warn"}`;

        item.append(guessLabel, hintLabel);
        guessHistory.appendChild(item);
    });
}

function createGameState() {
    return {
        secret: Math.floor(Math.random() * 100) + 1,
        score: 100,
        attempts: 0,
        history: [],
        finished: false
    };
}

function setFeedback(text, tone) {
    feedbackMessage.textContent = text;
    feedbackMessage.className = tone ? `message ${tone}` : "message";
}
