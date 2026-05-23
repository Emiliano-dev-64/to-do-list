const form = document.getElementById('task-form');
const input = document.getElementById('task-input');
const list = document.getElementById('task-list');
const emptyMsg = document.getElementById('empty-msg');
const categorySelect = document.getElementById('task-category');
const prioritySelect = document.getElementById('task-priority');
const dateInput = document.getElementById('task-date');
const filterBar = document.getElementById('filter-bar');

const sounds = {
  confirm: new Audio('sfx/ui confirm.wav'),
  back: new Audio('sfx/ui back.wav'),
  apply: new Audio('sfx/ui apply.wav'),
  focus: new Audio('sfx/ui focus.wav'),
  hover: new Audio('sfx/ui hover.wav'),
};

let hoverTimer = null;
function playSound(name) {
  if (name === 'hover') {
    if (hoverTimer) return;
    hoverTimer = setTimeout(() => { hoverTimer = null; }, 80);
  }
  const audio = sounds[name];
  if (audio) {
    audio.currentTime = 0;
    audio.play().catch(() => {});
  }
}

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
let currentFilter = 'all';

render();

function addTask(text) {
  const category = categorySelect.value;
  const priority = prioritySelect.value;
  const dueDate = dateInput.value || null;
  tasks.push({ id: nextId++, text, done: false, category, priority, dueDate });
  saveTasks();
  render();
}

function getDueLabel(dueDate) {
  if (!dueDate) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(dueDate + 'T00:00:00');
  const diffDays = Math.round((due - today) / 86400000);

  if (diffDays < 0) return { text: 'Atrasada', className: 'overdue' };
  if (diffDays === 0) return { text: 'Vence hoy', className: 'tomorrow' };
  if (diffDays === 1) return { text: 'Vence mañana', className: 'tomorrow' };

  const formatted = due.toLocaleDateString('es', { day: 'numeric', month: 'short' });
  return { text: formatted, className: 'future' };
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
  const filtered = tasks.filter(task => {
    if (currentFilter === 'completed') return task.done;
    if (currentFilter === 'pending') return !task.done;
    return true;
  });

  emptyMsg.hidden = filtered.length > 0;

  list.innerHTML = '';

  for (const task of filtered) {
    const li = document.createElement('li');
    li.className = 'task-item';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'task-checkbox';
    checkbox.checked = task.done;
    checkbox.addEventListener('change', () => {
      playSound('apply');
      toggleTask(task.id);
    });

    const body = document.createElement('div');
    body.className = 'task-body';

    const span = document.createElement('span');
    span.className = `task-text${task.done ? ' done' : ''}`;
    span.textContent = task.text;
    span.addEventListener('click', () => toggleTask(task.id));
    body.appendChild(span);

    const hasMeta = task.category || task.priority || task.dueDate;
    if (hasMeta) {
      const meta = document.createElement('div');
      meta.className = 'task-meta';

      const catLabels = { study: 'Estudio', work: 'Trabajo', personal: 'Personal', gaming: 'Gaming' };
      if (task.category) {
        const cat = document.createElement('span');
        cat.className = `task-category ${task.category}`;
        cat.textContent = catLabels[task.category] || task.category;
        meta.appendChild(cat);
      }

      if (task.priority) {
        const pri = document.createElement('span');
        pri.className = `task-priority ${task.priority}`;
        pri.textContent = task.priority.charAt(0).toUpperCase() + task.priority.slice(1);
        meta.appendChild(pri);
      }

      if (task.dueDate) {
        const dueLabel = getDueLabel(task.dueDate);
        if (dueLabel) {
          const due = document.createElement('span');
          due.className = `task-due ${dueLabel.className}`;
          due.textContent = dueLabel.text;
          meta.appendChild(due);
        }
      }

      body.appendChild(meta);
    }

    const delBtn = document.createElement('button');
    delBtn.className = 'btn btn-delete';
    delBtn.textContent = '✕';
    delBtn.setAttribute('aria-label', `Eliminar ${task.text}`);
    delBtn.addEventListener('click', () => deleteTask(task.id));

    li.append(checkbox, body, delBtn);
    list.appendChild(li);
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  playSound('focus');
  addTask(text);
  input.value = '';
  categorySelect.value = '';
  prioritySelect.value = '';
  dateInput.value = '';
  input.focus();
});

filterBar.addEventListener('click', (e) => {
  const btn = e.target.closest('.filter-btn');
  if (!btn) return;

  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  playSound('focus');
  currentFilter = btn.dataset.filter;
  render();
});

[categorySelect, prioritySelect].forEach(sel => {
  sel.addEventListener('focus', () => playSound('confirm'));
  sel.addEventListener('blur', () => playSound('back'));
});

let lastHovered = null;
document.addEventListener('mouseover', (e) => {
  const target = e.target.closest(
    '.btn, .filter-btn, .task-item, .task-select, .task-date, .task-checkbox, .task-text'
  );
  if (target && target !== lastHovered) {
    lastHovered = target;
    playSound('hover');
  }
});
