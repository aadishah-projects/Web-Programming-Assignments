const calculatorForm = document.getElementById("calculatorForm");
const firstValueInput = document.getElementById("firstValue");
const secondValueInput = document.getElementById("secondValue");
const operatorSelect = document.getElementById("operator");
const resultValue = document.getElementById("resultValue");
const statusBadge = document.getElementById("statusBadge");
const historyList = document.getElementById("historyList");
const calculatorMessage = document.getElementById("calculatorMessage");
const clearHistoryButton = document.getElementById("clearHistory");
const resetInputsButton = document.getElementById("resetInputs");

const calculatorState = {
    history: []
};

const operations = {
    "+": {
        label: "Addition",
        calculate(left, right) {
            return left + right;
        }
    },
    "-": {
        label: "Subtraction",
        calculate(left, right) {
            return left - right;
        }
    },
    "*": {
        label: "Multiplication",
        calculate(left, right) {
            return left * right;
        }
    },
    "/": {
        label: "Division",
        calculate(left, right) {
            return left / right;
        }
    }
};

const statusClassMap = {
    good: "status-good",
    bad: "status-bad",
    warn: "status-warn"
};

calculatorForm.addEventListener("submit", handleCalculation);
clearHistoryButton.addEventListener("click", clearHistory);
resetInputsButton.addEventListener("click", resetInputs);

renderHistory();

function handleCalculation(event) {
    event.preventDefault();

    const left = Number(firstValueInput.value);
    const right = Number(secondValueInput.value);
    const operator = operatorSelect.value;

    if (!Number.isFinite(left) || !Number.isFinite(right)) {
        setMessage("Both inputs must be valid numbers.", "error");
        updateStatus("Invalid", "bad");
        resultValue.textContent = "--";
        return;
    }

    if (operator === "/" && right === 0) {
        setMessage("Division by zero is not allowed.", "error");
        updateStatus("Error", "bad");
        resultValue.textContent = "--";
        return;
    }

    const answer = operations[operator].calculate(left, right);
    const entry = {
        expression: `${formatNumber(left)} ${operator} ${formatNumber(right)}`,
        result: formatNumber(answer)
    };

    calculatorState.history.unshift(entry);
    calculatorState.history = calculatorState.history.slice(0, 5);

    resultValue.textContent = entry.result;
    setMessage(`${operations[operator].label} completed and saved to history.`, "success");
    updateStatus("Saved", "good");
    renderHistory();

    calculatorForm.reset();
    operatorSelect.value = operator;
    firstValueInput.focus();
}

function clearHistory() {
    calculatorState.history = [];
    renderHistory();
    setMessage("History cleared.", "success");
    updateStatus("Waiting", "warn");
}

function resetInputs() {
    calculatorForm.reset();
    resultValue.textContent = "--";
    setMessage("Inputs reset.", "success");
    updateStatus("Waiting", "warn");
    firstValueInput.focus();
}

function renderHistory() {
    historyList.replaceChildren();

    if (calculatorState.history.length === 0) {
        const emptyItem = document.createElement("li");
        emptyItem.className = "empty-state";
        emptyItem.textContent = "No calculations yet.";
        historyList.appendChild(emptyItem);
        return;
    }

    calculatorState.history.forEach((entry) => {
        const item = document.createElement("li");
        item.className = "item-card history-entry";

        const copy = document.createElement("div");
        const expression = document.createElement("strong");
        const label = document.createElement("span");
        const result = document.createElement("strong");

        expression.textContent = entry.expression;
        label.textContent = "Stored in history";
        result.textContent = entry.result;

        copy.append(expression, label);
        item.append(copy, result);
        historyList.appendChild(item);
    });
}

function updateStatus(text, tone) {
    statusBadge.textContent = text;
    statusBadge.className = `status ${statusClassMap[tone]}`;
}

function setMessage(text, tone) {
    calculatorMessage.textContent = text;
    calculatorMessage.className = tone ? `message ${tone}` : "message";
}

function formatNumber(value) {
    if (Number.isInteger(value)) {
        return String(value);
    }

    return value.toFixed(2).replace(/\.00$/, "").replace(/(\.\d*[1-9])0+$/, "$1");
}
