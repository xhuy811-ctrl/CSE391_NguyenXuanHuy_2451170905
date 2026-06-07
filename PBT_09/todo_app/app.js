// Todo App - using Event Delegation and createElement
const TODO_KEY = 'todos_v1';
let todos = [];
let filter = 'all';

const $form = document.getElementById('todoForm');
const $input = document.getElementById('todoInput');
const $list = document.getElementById('todoList');
const $count = document.getElementById('count');
const $filters = document.querySelectorAll('.filter-btn');
const $clearCompleted = document.getElementById('clearCompleted');

// Load from localStorage
function load() {
  try {
    const raw = localStorage.getItem(TODO_KEY);
    todos = raw ? JSON.parse(raw) : [];
  } catch (e) {
    todos = [];
  }
}

function save() {
  localStorage.setItem(TODO_KEY, JSON.stringify(todos));
}

function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2,7); }

function createTodoElement(todo){
  const li = document.createElement('li');
  li.className = 'todo-item';
  li.dataset.id = todo.id;

  const left = document.createElement('div');
  left.className = 'left';

  const text = document.createElement('span');
  text.className = 'text';
  text.textContent = todo.text;
  if (todo.completed) text.classList.add('completed');

  const btns = document.createElement('div');
  btns.className = 'btns';

  const editHint = document.createElement('button');
  editHint.className = 'icon-btn';
  editHint.type = 'button';
  editHint.title = 'Edit (double-click text to edit)';
  editHint.textContent = '✎';

  const del = document.createElement('button');
  del.className = 'icon-btn delete';
  del.type = 'button';
  del.title = 'Delete';
  del.textContent = '❌';

  left.appendChild(text);
  li.appendChild(left);
  btns.appendChild(editHint);
  btns.appendChild(del);
  li.appendChild(btns);

  return li;
}

function render(){
  $list.innerHTML = '';
  const visible = todos.filter(t => {
    if (filter === 'active') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  visible.forEach(t => $list.appendChild(createTodoElement(t)));
  updateCount();
  save();
}

function updateCount(){
  const left = todos.filter(t => !t.completed).length;
  $count.textContent = `${left} item${left===1?'':'s'} left`;
}

function addTodo(text){
  if (!text || !text.trim()) return;
  todos.unshift({ id: uid(), text: text.trim(), completed: false });
  render();
}

function deleteTodo(id){
  todos = todos.filter(t => t.id !== id);
  render();
}

function toggleTodo(id){
  todos = todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
  render();
}

function startEdit(id, li){
  const todo = todos.find(t => t.id === id);
  if (!todo) return;
  const input = document.createElement('input');
  input.className = 'edit-input';
  input.value = todo.text;

  const left = li.querySelector('.left');
  left.innerHTML = '';
  left.appendChild(input);
  input.focus();
  input.select();

  function finish(){
    const v = input.value.trim();
    if (v) todo.text = v;
    save();
    render();
  }

  input.addEventListener('keydown', (e) => { if (e.key === 'Enter') finish(); });
  input.addEventListener('blur', finish);
}

function clearCompleted(){
  todos = todos.filter(t => !t.completed);
  render();
}

// Event listeners
$form.addEventListener('submit', (e) => {
  e.preventDefault();
  addTodo($input.value);
  $input.value = '';
});

$input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    addTodo($input.value);
    $input.value = '';
  }
});

// Event Delegation on the list
$list.addEventListener('click', (e) => {
  const li = e.target.closest('li.todo-item');
  if (!li) return;
  const id = li.dataset.id;

  if (e.target.classList.contains('delete')) {
    deleteTodo(id);
    return;
  }

  // click on text toggles completed
  if (e.target.classList.contains('text')){
    toggleTodo(id);
    return;
  }

  // edit button
  if (e.target.textContent === '✎'){
    startEdit(id, li);
    return;
  }
});

// double-click text to edit
$list.addEventListener('dblclick', (e) => {
  const textEl = e.target.closest('.text');
  if (!textEl) return;
  const li = textEl.closest('li.todo-item');
  const id = li.dataset.id;
  startEdit(id, li);
});

// filters
$filters.forEach(btn => btn.addEventListener('click', () => {
  $filters.forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  filter = btn.dataset.filter;
  render();
}));

$clearCompleted.addEventListener('click', () => clearCompleted());

// init
load();
render();
