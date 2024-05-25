document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("task-input");
  const addTaskButton = document.getElementById("add-task-button");
  const taskList = document.getElementById("task-list");
  const clearAllButton = document.getElementById("clear-all-button");

  loadTasks();

  new Sortable(taskList, {
    animation: 200,
    onEnd: saveTasks,
  });

  addTaskButton.addEventListener("click", addTask);
  taskList.addEventListener("click", handleTaskClick);
  taskList.addEventListener("dblclick", handleTaskDoubleClick);
  clearAllButton.addEventListener("click", clearAllTasks);

  //add task function
  function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
      const listItem = document.createElement("li");
      listItem.className = "task-item";
      listItem.innerHTML = `
        <span class="task-text">${taskText}</span>
        <div class="task-buttons">
          <button class="task-button delete">Delete</button>
        </div>
      `;
      taskList.appendChild(listItem);
      taskInput.value = "";
      saveTasks();
    }
  }

  //function for the task click events (task complete and delete task)
  function handleTaskClick(e) {
    if (e.target.classList.contains("delete")) {
      const taskItem = e.target.closest(".task-item");
      taskList.removeChild(taskItem);
      saveTasks();
    } else if (e.target.classList.contains("task-text")) {
      const taskItem = e.target.closest(".task-item");
      taskItem.classList.toggle("completed");
      saveTasks();
    }
  }

  //function for editing task
  function handleTaskDoubleClick(e) {
    if (e.target.classList.contains("task-text")) {
      const taskItem = e.target.closest(".task-item");
      const taskText = taskItem.querySelector(".task-text");
      const newText = prompt("Edit your task:", taskText.textContent);
      if (newText !== null && newText.trim() !== "") {
        taskText.textContent = newText.trim();
        saveTasks();
      }
    }
  }

  function clearAllTasks() {
    taskList.innerHTML = "";
    saveTasks();
  }

  function saveTasks() {
    const tasks = [];
    document.querySelectorAll(".task-item").forEach((item) => {
      tasks.push({
        text: item.querySelector(".task-text").textContent,
        completed: item.classList.contains("completed"),
      });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((task) => {
      const listItem = document.createElement("li");
      listItem.className = `task-item ${task.completed ? "completed" : ""}`;
      listItem.innerHTML = `
        <span class="task-text">${task.text}</span>
        <div class="task-buttons">
          <button class="task-button delete">Delete</button>
        </div>
      `;
      taskList.appendChild(listItem);
    });
  }
});
