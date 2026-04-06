const validationForm = document.getElementById("validationForm");
const nameInput = document.getElementById("nameInput");
const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");
const nameMessage = document.getElementById("nameMessage");
const emailMessage = document.getElementById("emailMessage");
const passwordMessage = document.getElementById("passwordMessage");
const formMessage = document.getElementById("formMessage");

const fieldMap = {
    name: {
        input: nameInput,
        message: nameMessage,
        validate: validateName
    },
    email: {
        input: emailInput,
        message: emailMessage,
        validate: validateEmail
    },
    password: {
        input: passwordInput,
        message: passwordMessage,
        validate: validatePassword
    }
};

Object.values(fieldMap).forEach((field) => {
    field.input.addEventListener("input", () => validateField(field));
});

validationForm.addEventListener("submit", handleSubmit);
validationForm.addEventListener("reset", handleReset);

function handleSubmit(event) {
    event.preventDefault();

    const results = Object.values(fieldMap).map((field) => validateField(field));
    const isValid = results.every((result) => result.valid);

    if (!isValid) {
        setFormMessage("Submission blocked. Fix the highlighted fields first.", "error");
        return;
    }

    setFormMessage("Form submitted successfully.", "success");
}

function handleReset() {
    window.setTimeout(() => {
        Object.values(fieldMap).forEach((field) => {
            field.input.classList.remove("is-valid", "is-invalid");
            field.message.textContent = "";
            field.message.className = "message";
        });
        setFormMessage("Validation runs while you type.", "");
    }, 0);
}

function validateField(field) {
    const result = field.validate(field.input.value);

    field.input.classList.toggle("is-valid", result.valid);
    field.input.classList.toggle("is-invalid", !result.valid);
    field.message.textContent = result.message;
    field.message.className = result.valid ? "message success" : "message error";

    return result;
}

function validateName(value) {
    const trimmed = value.trim();

    if (trimmed.length < 2) {
        return { valid: false, message: "Name must be at least 2 characters long." };
    }

    if (!/^[A-Za-z ]+$/.test(trimmed)) {
        return { valid: false, message: "Name should contain letters and spaces only." };
    }

    return { valid: true, message: "Valid name." };
}

function validateEmail(value) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(value.trim())) {
        return { valid: false, message: "Enter a valid email address." };
    }

    return { valid: true, message: "Valid email address." };
}

function validatePassword(value) {
    if (value.length < 8) {
        return { valid: false, message: "Password must be at least 8 characters long." };
    }

    if (!/[A-Z]/.test(value)) {
        return { valid: false, message: "Password needs at least one uppercase letter." };
    }

    if (!/[a-z]/.test(value)) {
        return { valid: false, message: "Password needs at least one lowercase letter." };
    }

    if (!/\d/.test(value)) {
        return { valid: false, message: "Password needs at least one number." };
    }

    return { valid: true, message: "Strong password." };
}

function setFormMessage(text, tone) {
    formMessage.textContent = text;
    formMessage.className = tone ? `message ${tone}` : "message";
}
