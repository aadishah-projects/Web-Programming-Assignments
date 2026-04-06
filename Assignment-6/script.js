const clockTime = document.getElementById("clockTime");
const clockDate = document.getElementById("clockDate");
const timerDisplay = document.getElementById("timerDisplay");
const timerForm = document.getElementById("timerForm");
const minutesInput = document.getElementById("minutesInput");
const secondsInput = document.getElementById("secondsInput");
const pauseTimerButton = document.getElementById("pauseTimer");
const resetTimerButton = document.getElementById("resetTimer");
const timerMessage = document.getElementById("timerMessage");

const timerState = {
    remainingSeconds: 0,
    intervalId: null,
    running: false
};

timerForm.addEventListener("submit", startTimer);
pauseTimerButton.addEventListener("click", pauseTimer);
resetTimerButton.addEventListener("click", resetTimer);

updateClock();
updateTimerDisplay();
window.setInterval(updateClock, 1000);

function updateClock() {
    const now = new Date();
    clockTime.textContent = now.toLocaleTimeString();
    clockDate.textContent = now.toLocaleDateString(undefined, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    });
}

function startTimer(event) {
    event.preventDefault();

    if (timerState.running) {
        setMessage("Timer is already running.", "error");
        return;
    }

    if (timerState.remainingSeconds === 0) {
        const minutes = Number(minutesInput.value || 0);
        const seconds = Number(secondsInput.value || 0);

        if (!Number.isInteger(minutes) || minutes < 0 || !Number.isInteger(seconds) || seconds < 0 || seconds > 59) {
            setMessage("Enter valid minute and second values.", "error");
            return;
        }

        if (minutes === 0 && seconds === 0) {
            setMessage("Set the timer to more than zero seconds.", "error");
            return;
        }

        timerState.remainingSeconds = (minutes * 60) + seconds;
        updateTimerDisplay();
    }

    timerState.running = true;
    timerState.intervalId = window.setInterval(tickTimer, 1000);
    setMessage("Timer started.", "success");
}

function pauseTimer() {
    if (!timerState.running) {
        setMessage("Timer is not running.", "error");
        return;
    }

    window.clearInterval(timerState.intervalId);
    timerState.intervalId = null;
    timerState.running = false;
    setMessage("Timer paused.", "success");
}

function resetTimer() {
    window.clearInterval(timerState.intervalId);
    timerState.intervalId = null;
    timerState.running = false;
    timerState.remainingSeconds = 0;
    timerForm.reset();
    updateTimerDisplay();
    setMessage("Timer reset.", "success");
}

function tickTimer() {
    if (timerState.remainingSeconds > 0) {
        timerState.remainingSeconds -= 1;
        updateTimerDisplay();
    }

    if (timerState.remainingSeconds === 0) {
        window.clearInterval(timerState.intervalId);
        timerState.intervalId = null;
        timerState.running = false;
        setMessage("Time is up.", "success");
        window.alert("Countdown complete.");
    }
}

function updateTimerDisplay() {
    const minutes = String(Math.floor(timerState.remainingSeconds / 60)).padStart(2, "0");
    const seconds = String(timerState.remainingSeconds % 60).padStart(2, "0");
    timerDisplay.textContent = `${minutes}:${seconds}`;
}

function setMessage(text, tone) {
    timerMessage.textContent = text;
    timerMessage.className = tone ? `message ${tone}` : "message";
}
