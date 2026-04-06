const backgroundColorInput = document.getElementById("backgroundColor");
const textColorInput = document.getElementById("textColor");
const buttonColorInput = document.getElementById("buttonColor");
const resetThemeButton = document.getElementById("resetTheme");
const themeValues = document.getElementById("themeValues");
const themeMessage = document.getElementById("themeMessage");
const previewCard = document.getElementById("previewCard");
const previewButton = document.getElementById("previewButton");

const defaultTheme = {
    background: "#f6f1e8",
    text: "#221f1b",
    button: "#33463d"
};

const currentTheme = { ...defaultTheme };

backgroundColorInput.addEventListener("input", updateThemeFromInputs);
textColorInput.addEventListener("input", updateThemeFromInputs);
buttonColorInput.addEventListener("input", updateThemeFromInputs);
resetThemeButton.addEventListener("click", resetTheme);

syncInputs();
applyTheme();

function updateThemeFromInputs() {
    currentTheme.background = backgroundColorInput.value;
    currentTheme.text = textColorInput.value;
    currentTheme.button = buttonColorInput.value;
    applyTheme();
    setMessage("Theme updated from the current input values.", "success");
}

function resetTheme() {
    currentTheme.background = defaultTheme.background;
    currentTheme.text = defaultTheme.text;
    currentTheme.button = defaultTheme.button;
    syncInputs();
    applyTheme();
    setMessage("Default theme restored.", "success");
}

function syncInputs() {
    backgroundColorInput.value = currentTheme.background;
    textColorInput.value = currentTheme.text;
    buttonColorInput.value = currentTheme.button;
}

function applyTheme() {
    document.documentElement.style.setProperty("--theme-background", currentTheme.background);
    document.documentElement.style.setProperty("--text", currentTheme.text);
    document.documentElement.style.setProperty("--accent", currentTheme.button);

    previewCard.style.backgroundColor = currentTheme.background;
    previewCard.style.color = currentTheme.text;
    previewButton.style.backgroundColor = currentTheme.button;
    previewButton.style.color = "#ffffff";

    renderThemeValues();
}

function renderThemeValues() {
    themeValues.replaceChildren();

    Object.entries(currentTheme).forEach(([key, value]) => {
        const item = document.createElement("li");

        const label = document.createElement("strong");
        label.textContent = capitalize(key);

        const meta = document.createElement("div");
        meta.className = "value-meta";

        const swatch = document.createElement("span");
        swatch.className = "swatch";
        swatch.style.backgroundColor = value;

        const code = document.createElement("span");
        code.textContent = value;

        meta.append(swatch, code);
        item.append(label, meta);
        themeValues.appendChild(item);
    });
}

function capitalize(value) {
    return value.charAt(0).toUpperCase() + value.slice(1);
}

function setMessage(text, tone) {
    themeMessage.textContent = text;
    themeMessage.className = tone ? `message ${tone}` : "message";
}
