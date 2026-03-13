// Simple Student Task Manager logic (no CSS required)

const taskForm = document.getElementById("task-form");
const taskNameInput = document.getElementById("task-name");
const prioritySelect = document.getElementById("priority");
const taskList = document.getElementById("task-list");
const filterButtons = document.querySelectorAll(".filter-btn");

let currentFilter = "all";

function createTaskElement(name, priority) {
  const li = document.createElement("li");
  li.dataset.completed = "false";
  li.dataset.priority = priority;

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  const textSpan = document.createElement("span");
  textSpan.textContent = " " + name + " (" + priority + ")";

  const completeButton = document.createElement("button");
  completeButton.type = "button";
  completeButton.textContent = "Complete";

  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.textContent = "Delete";

  li.appendChild(checkbox);
  li.appendChild(textSpan);
  li.appendChild(completeButton);
  li.appendChild(deleteButton);

  function setCompleted(isCompleted) {
    li.dataset.completed = isCompleted ? "true" : "false";
    if (isCompleted) {
      completeButton.textContent = "Undo";
    } else {
      completeButton.textContent = "Complete";
    }
    applyFilter();
  }

  checkbox.addEventListener("change", function () {
    setCompleted(checkbox.checked);
  });

  completeButton.addEventListener("click", function () {
    const isCompleted = li.dataset.completed === "true";
    setCompleted(!isCompleted);
    checkbox.checked = !isCompleted;
  });

  deleteButton.addEventListener("click", function () {
    taskList.removeChild(li);
  });

  return li;
}

function applyFilter() {
  const items = taskList.querySelectorAll("li");
  items.forEach(function (item) {
    const isCompleted = item.dataset.completed === "true";
    let show = true;

    if (currentFilter === "completed") {
      show = isCompleted;
    } else if (currentFilter === "active") {
      show = !isCompleted;
    }

    item.style.display = show ? "" : "none";
  });
}

taskForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = (taskNameInput.value || "").trim();
  const priority = prioritySelect.value;

  if (name === "") {
    taskNameInput.focus();
    return;
  }

  const li = createTaskElement(name, priority);
  taskList.appendChild(li);

  taskForm.reset();
  prioritySelect.value = "medium";
  taskNameInput.focus();

  applyFilter();
});

filterButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    currentFilter = button.getAttribute("data-filter");
    applyFilter();
  });
});

