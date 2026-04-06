const studentForm = document.getElementById("studentForm");
const nameInput = document.getElementById("studentName");
const rollInput = document.getElementById("rollNumber");
const markInputs = Array.from(document.querySelectorAll(".mark-input"));
const marksMessage = document.getElementById("marksMessage");
const resultTableBody = document.getElementById("resultTableBody");
const clearResultsButton = document.getElementById("clearResults");

const latestTotal = document.getElementById("latestTotal");
const latestPercentage = document.getElementById("latestPercentage");
const latestGrade = document.getElementById("latestGrade");
const latestResult = document.getElementById("latestResult");

const students = [];

const gradeBands = [
    { min: 90, grade: "A+" },
    { min: 80, grade: "A" },
    { min: 70, grade: "B" },
    { min: 60, grade: "C" },
    { min: 50, grade: "D" },
    { min: 40, grade: "E" },
    { min: 0, grade: "F" }
];

studentForm.addEventListener("submit", handleStudentSubmit);
clearResultsButton.addEventListener("click", clearResults);

renderTable();

function handleStudentSubmit(event) {
    event.preventDefault();

    const name = nameInput.value.trim();
    const roll = rollInput.value.trim();

    if (!name || !roll) {
        setMessage("Student name and roll number are required.", "error");
        return;
    }

    const marks = {};
    const values = [];

    for (const input of markInputs) {
        const value = Number(input.value);

        if (!Number.isFinite(value) || value < 0 || value > 100) {
            setMessage(`Enter a valid mark for ${input.dataset.subject}.`, "error");
            return;
        }

        marks[input.dataset.subject] = value;
        values.push(value);
    }

    const total = values.reduce((sum, value) => sum + value, 0);
    const percentage = total / values.length;
    const passed = values.every((value) => value >= 40) && percentage >= 40;
    const student = {
        name,
        roll,
        marks,
        total,
        percentage,
        grade: getGrade(percentage),
        passed
    };

    students.push(student);
    updateLatest(student);
    renderTable();
    setMessage(`${student.name} added to the results table.`, "success");
    studentForm.reset();
    nameInput.focus();
}

function clearResults() {
    students.length = 0;
    renderTable();
    latestTotal.textContent = "--";
    latestPercentage.textContent = "--";
    latestGrade.textContent = "--";
    latestResult.innerHTML = '<span class="status status-warn">Waiting</span>';
    setMessage("Result table cleared.", "success");
}

function renderTable() {
    resultTableBody.replaceChildren();

    if (students.length === 0) {
        const row = document.createElement("tr");
        const cell = document.createElement("td");
        cell.colSpan = 6;
        cell.className = "empty-state";
        cell.textContent = "No student results added yet.";
        row.appendChild(cell);
        resultTableBody.appendChild(row);
        return;
    }

    students.forEach((student) => {
        const row = document.createElement("tr");
        row.classList.add(student.passed ? "pass-row" : "fail-row");

        appendCell(row, student.name);
        appendCell(row, student.roll);
        appendCell(row, student.total, "number-cell");
        appendCell(row, `${student.percentage.toFixed(2)}%`, "number-cell");
        appendCell(row, student.grade);
        appendCell(row, student.passed ? "Pass" : "Fail");

        resultTableBody.appendChild(row);
    });
}

function updateLatest(student) {
    latestTotal.textContent = student.total;
    latestPercentage.textContent = `${student.percentage.toFixed(2)}%`;
    latestGrade.textContent = student.grade;
    latestResult.innerHTML = student.passed
        ? '<span class="status status-good">Pass</span>'
        : '<span class="status status-bad">Fail</span>';
}

function getGrade(percentage) {
    return gradeBands.find((band) => percentage >= band.min).grade;
}

function appendCell(row, value, className = "") {
    const cell = document.createElement("td");
    if (className) {
        cell.className = className;
    }
    cell.textContent = value;
    row.appendChild(cell);
}

function setMessage(text, tone) {
    marksMessage.textContent = text;
    marksMessage.className = tone ? `message ${tone}` : "message";
}
