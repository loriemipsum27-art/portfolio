let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const totalTasks = document.getElementById("totalTasks");
const doneTasks = document.getElementById("doneTasks");
const pendingTasks = document.getElementById("pendingTasks");
const filterButtons = document.querySelectorAll(".filters button");

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";

  let completedCount = 0;
  let pendingCount = 0;

  tasks.forEach((task, index) => {
    if (task.done) completedCount++;
    else pendingCount++;

    if (currentFilter === "done" && !task.done) return;
    if (currentFilter === "pending" && task.done) return;

    const li = document.createElement("li");
    if (task.done) li.classList.add("done");

    li.innerHTML = `
      <span>${task.text}</span>
      <div class="actions">
        <button class="btn-done" onclick="toggleTask(${index})">✔</button>
        <button class="btn-remove" onclick="removeTask(${index})">✖</button>
      </div>
    `;

    taskList.appendChild(li);
  });

  totalTasks.innerText = `Total: ${tasks.length}`;
  doneTasks.innerText = `Concluídas: ${completedCount}`;
  pendingTasks.innerText = `Pendentes: ${pendingCount}`;

  saveTasks();
}

addTaskBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();
  if (!text) return;

  tasks.push({ text, done: false });
  taskInput.value = "";
  renderTasks();
});

function toggleTask(index) {
  tasks[index].done = !tasks[index].done;
  renderTasks();
}

function removeTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;
    renderTasks();
  });
});

renderTasks();
