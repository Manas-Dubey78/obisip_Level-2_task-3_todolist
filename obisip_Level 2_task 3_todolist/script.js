
let tasks = [];
// Adding a new task
function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();

  if (taskText !== "") {
    const task = {
      text: taskText,
      completed: false,
      createdAt: new Date()
    };

    tasks.push(task);
    renderTasks();

    taskInput.value = "";
  }
}

// Rendering the tasks
function renderTasks() {
  const pendingTasksList = document.getElementById("pendingTasks");
  const completedTasksList = document.getElementById("completedTasks");
  const pendingTasksContainer = document.querySelector(".Pending-task");
  const completedTasksContainer = document.querySelector(".Complete-Task");

  // Clear the lists
  pendingTasksList.innerHTML = "";
  completedTasksList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => toggleTaskComplete(index));

    const text = document.createElement("span");
    text.textContent = task.text;
    if (task.completed) {
      text.classList.add("completed");
    }

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => deleteTask(index));

    li.appendChild(checkbox);
    li.appendChild(text);
    li.appendChild(deleteBtn);

    if (task.completed) {
      completedTasksList.appendChild(li);
      completedTasksContainer.classList.remove("hide");
    } else {
      pendingTasksList.appendChild(li);
      pendingTasksContainer.classList.remove("hide");
    }
  });


  if (tasks.length === 0) {
    completedTasksContainer.classList.add("hide");
    pendingTasksContainer.classList.add("hide");
  }
}


function toggleTaskComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

function handleKeyPress(event) {
  if (event.key === "Enter") {
    addTask();
  }
}

renderTasks();