const generatorForm = document.getElementById("generatorForm");
const rowCountInput = document.getElementById("rowCount");
const columnCountInput = document.getElementById("columnCount");
const addRowButton = document.getElementById("addRow");
const deleteRowButton = document.getElementById("deleteRow");
const highlightRowsButton = document.getElementById("highlightRows");
const dynamicTable = document.getElementById("dynamicTable");
const tableWrap = document.getElementById("tableWrap");
const tablePlaceholder = document.getElementById("tablePlaceholder");
const tableMessage = document.getElementById("tableMessage");

const tableState = {
    rows: [],
    columnCount: 0,
    highlightEvenRows: false
};

generatorForm.addEventListener("submit", generateTable);
addRowButton.addEventListener("click", addRow);
deleteRowButton.addEventListener("click", deleteRow);
highlightRowsButton.addEventListener("click", toggleEvenRows);

function generateTable(event) {
    event.preventDefault();

    const rowCount = Number(rowCountInput.value);
    const columnCount = Number(columnCountInput.value);

    if (!Number.isInteger(rowCount) || rowCount < 1 || !Number.isInteger(columnCount) || columnCount < 1) {
        setMessage("Rows and columns must both be positive whole numbers.", "error");
        return;
    }

    tableState.columnCount = columnCount;
    tableState.rows = Array.from({ length: rowCount }, (_, rowIndex) => createRow(rowIndex, columnCount));
    tableState.highlightEvenRows = false;
    highlightRowsButton.textContent = "Highlight even rows";
    renderTable();
    setMessage("Table generated.", "success");
}

function addRow() {
    if (tableState.columnCount === 0) {
        setMessage("Generate a table before adding rows.", "error");
        return;
    }

    tableState.rows.push(createRow(tableState.rows.length, tableState.columnCount));
    renderTable();
    setMessage("One row added.", "success");
}

function deleteRow() {
    if (tableState.rows.length === 0) {
        setMessage("There is no row to delete.", "error");
        return;
    }

    tableState.rows.pop();
    renderTable();
    setMessage("Last row deleted.", "success");
}

function toggleEvenRows() {
    if (tableState.rows.length === 0) {
        setMessage("Generate a table before highlighting rows.", "error");
        return;
    }

    tableState.highlightEvenRows = !tableState.highlightEvenRows;
    highlightRowsButton.textContent = tableState.highlightEvenRows ? "Remove highlight" : "Highlight even rows";
    renderTable();
    setMessage(tableState.highlightEvenRows ? "Even rows highlighted." : "Even row highlight removed.", "success");
}

function renderTable() {
    dynamicTable.replaceChildren();

    if (tableState.rows.length === 0) {
        tableWrap.hidden = true;
        tablePlaceholder.hidden = false;
        return;
    }

    tableWrap.hidden = false;
    tablePlaceholder.hidden = true;

    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");

    tableState.rows[0].forEach((_, columnIndex) => {
        const headerCell = document.createElement("th");
        headerCell.textContent = `Column ${columnIndex + 1}`;
        headerRow.appendChild(headerCell);
    });

    thead.appendChild(headerRow);

    const tbody = document.createElement("tbody");

    tableState.rows.forEach((rowValues, rowIndex) => {
        const row = document.createElement("tr");

        if (tableState.highlightEvenRows && (rowIndex + 1) % 2 === 0) {
            row.classList.add("even-row");
        }

        rowValues.forEach((cellValue) => {
            const cell = document.createElement("td");
            cell.textContent = cellValue;
            row.appendChild(cell);
        });

        tbody.appendChild(row);
    });

    dynamicTable.append(thead, tbody);
}

function createRow(rowIndex, columnCount) {
    return Array.from({ length: columnCount }, (_, columnIndex) => `R${rowIndex + 1}C${columnIndex + 1}`);
}

function setMessage(text, tone) {
    tableMessage.textContent = text;
    tableMessage.className = tone ? `message ${tone}` : "message";
}
