const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const filterButtons = Array.from(document.querySelectorAll("[data-filter]"));
const clearCompletedButton = document.getElementById("clearCompleted");
const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");
const taskMessage = document.getElementById("taskMessage");

const todoState = {
    tasks: [],
    filter: "all",
    nextId: 1
};

taskForm.addEventListener("submit", addTask);
clearCompletedButton.addEventListener("click", clearCompleted);
filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        todoState.filter = button.dataset.filter;
        updateFilterButtons();
        renderTasks();
    });
});

renderTasks();

function addTask(event) {
    event.preventDefault();

    const title = taskInput.value.trim();

    if (!title) {
        setMessage("Task title cannot be empty.", "error");
        return;
    }

    todoState.tasks.unshift({
        id: todoState.nextId++,
        title,
        completed: false
    });

    taskForm.reset();
    taskInput.focus();
    setMessage("Task added to the list.", "success");
    renderTasks();
}

function clearCompleted() {
    const beforeCount = todoState.tasks.length;
    todoState.tasks = todoState.tasks.filter((task) => !task.completed);

    if (beforeCount === todoState.tasks.length) {
        setMessage("There are no completed tasks to clear.", "error");
        return;
    }

    setMessage("Completed tasks removed.", "success");
    renderTasks();
}

function renderTasks() {
    taskList.replaceChildren();

    const visibleTasks = todoState.tasks.filter((task) => {
        if (todoState.filter === "completed") {
            return task.completed;
        }

        if (todoState.filter === "pending") {
            return !task.completed;
        }

        return true;
    });

    if (visibleTasks.length === 0) {
        const emptyItem = document.createElement("li");
        emptyItem.className = "empty-state";
        emptyItem.textContent = "No tasks match the current filter.";
        taskList.appendChild(emptyItem);
    } else {
        visibleTasks.forEach((task) => {
            const item = document.createElement("li");
            item.className = "item-card task-row";

            const taskMain = document.createElement("div");
            taskMain.className = "task-main";

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = task.completed;
            checkbox.addEventListener("change", () => toggleTask(task.id));

            const copy = document.createElement("div");
            copy.className = `task-copy${task.completed ? " done" : ""}`;

            const title = document.createElement("strong");
            title.textContent = task.title;

            const label = document.createElement("span");
            label.textContent = task.completed ? "Completed" : "Pending";

            const removeButton = document.createElement("button");
            removeButton.type = "button";
            removeButton.className = "secondary";
            removeButton.textContent = "Delete";
            removeButton.addEventListener("click", () => deleteTask(task.id));

            copy.append(title, label);
            taskMain.append(checkbox, copy);
            item.append(taskMain, removeButton);
            taskList.appendChild(item);
        });
    }

    const completedCount = todoState.tasks.filter((task) => task.completed).length;
    totalTasks.textContent = todoState.tasks.length;
    completedTasks.textContent = completedCount;
    pendingTasks.textContent = todoState.tasks.length - completedCount;
}

function toggleTask(taskId) {
    const task = todoState.tasks.find((currentTask) => currentTask.id === taskId);
    task.completed = !task.completed;
    setMessage(task.completed ? "Task marked as completed." : "Task moved back to pending.", "success");
    renderTasks();
}

function deleteTask(taskId) {
    todoState.tasks = todoState.tasks.filter((task) => task.id !== taskId);
    setMessage("Task deleted.", "success");
    renderTasks();
}

function updateFilterButtons() {
    filterButtons.forEach((button) => {
        button.classList.toggle("active", button.dataset.filter === todoState.filter);
    });
}

function setMessage(text, tone) {
    taskMessage.textContent = text;
    taskMessage.className = tone ? `message ${tone}` : "message";
}
