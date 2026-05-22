const form = document.getElementById('task-form');
const input = document.getElementById('task-input');
const list = document.getElementById('task-list');
const emptyMsg = document.getElementById('empty-msg');

const STORAGE_KEY = 'tareas';

function loadTasks() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveTasks() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch {
    /* localStorage no disponible */
  }
}

let tasks = loadTasks();
let nextId = tasks.length ? Math.max(...tasks.map(t => t.id)) + 1 : 1;

render();

function addTask(text) {
  tasks.push({ id: nextId++, text, done: false });
  saveTasks();
  render();
}

function toggleTask(id) {
  const task = tasks.find(t => t.id === id);
  if (task) task.done = !task.done;
  saveTasks();
  render();
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  saveTasks();
  render();
}

function render() {
  emptyMsg.hidden = tasks.length > 0;

  list.innerHTML = '';

  for (const task of tasks) {
    const li = document.createElement('li');
    li.className = 'task-item';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'task-checkbox';
    checkbox.checked = task.done;
    checkbox.addEventListener('change', () => toggleTask(task.id));

    const span = document.createElement('span');
    span.className = `task-text${task.done ? ' done' : ''}`;
    span.textContent = task.text;
    span.addEventListener('click', () => toggleTask(task.id));

    const delBtn = document.createElement('button');
    delBtn.className = 'btn btn-delete';
    delBtn.textContent = '✕';
    delBtn.setAttribute('aria-label', `Eliminar ${task.text}`);
    delBtn.addEventListener('click', () => deleteTask(task.id));

    li.append(checkbox, span, delBtn);
    list.appendChild(li);
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  addTask(text);
  input.value = '';
  input.focus();
});
