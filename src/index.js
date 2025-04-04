document.addEventListener("DOMContentLoaded", () => {
  const taskForm = document.getElementById("create-task-form");
  const taskList = document.getElementById("tasks");
  const sortButton = document.getElementById("sort-tasks");
  let tasks = [];
  let editingTaskIndex = null; // Track the index of the task being edited

  // Handle form submission
  taskForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const description = document.getElementById("new-task-description").value;
    const priority = document.getElementById("priority").value;
    const user = document.getElementById("user").value;
    const dueDate = document.getElementById("due-date").value;

    const task = { description, priority, user, dueDate };

    if (editingTaskIndex !== null) {
      // Update the existing task if editing
      tasks[editingTaskIndex] = task;
      editingTaskIndex = null; // Reset the editing index
    } else {
      // Add a new task if not editing
      tasks.push(task);
    }

    renderTasks();
    taskForm.reset();
  });

  // Render tasks to the DOM
  function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
      const li = document.createElement("li");
      li.innerHTML = `<strong>${task.description}</strong> - ${task.user} (Due: ${task.dueDate}) `;
      li.style.color = getPriorityColor(task.priority);

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.addEventListener("click", () => {
        tasks.splice(index, 1);
        renderTasks();
      });

      const editBtn = document.createElement("button");
      editBtn.textContent = "Edit";
      editBtn.addEventListener("click", () => editTask(index));

      li.appendChild(editBtn);
      li.appendChild(deleteBtn);
      taskList.appendChild(li);
    });
  }

  // Function to edit a task
  function editTask(index) {
    const task = tasks[index];
    document.getElementById("new-task-description").value = task.description;
    document.getElementById("priority").value = task.priority;
    document.getElementById("user").value = task.user;
    document.getElementById("due-date").value = task.dueDate;

    editingTaskIndex = index; // Store the index of the task being edited
  }

  // Function to get the color of the task based on its priority
  function getPriorityColor(priority) {
    switch (priority) {
      case "high":
        return "red";
      case "medium":
        return "orange";
      case "low":
        return "green";
      default:
        return "black";
    }
  }

  // Sort tasks by priority
  sortButton.addEventListener("click", () => {
    tasks.sort((a, b) => {
      const priorityOrder = { high: 1, medium: 2, low: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
    renderTasks();
  });
});