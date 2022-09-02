const localStorageKey = 'tasks';
const taskList = document.getElementById('lista-tarefas');
const buttonCreateTask = document.getElementById('criar-tarefa');
const inputTask = document.getElementById('texto-tarefa');
const buttonClear = document.getElementById('apaga-tudo');
const buttonClearCompleted = document.getElementById('remover-finalizados');
const buttonSaveList = document.getElementById('salvar-tarefas');
const buttonMoveUp = document.getElementById('mover-cima');
const buttonMoveDown = document.getElementById('mover-baixo');
const buttonRemove = document.getElementById('remover-selecionado');

function setLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getLocalStorage(key) {
  const value = localStorage.getItem(key);
  if (value) {
    return JSON.parse(value);
  }
}

function onDoubleClickTask() {
  this.classList.toggle('completed');
}

function addTask(text, completed) {
  const li = document.createElement('li');
  li.className = 'tarefas';
  li.innerText = text;
  if (completed) {
    li.classList.add('completed');
  }
  taskList.appendChild(li);
  inputTask.value = '';
  li.tabIndex = 1;

  li.addEventListener('dblclick', onDoubleClickTask);
  li.addEventListener('focusin', (event) => {
    const element = document.querySelector('.tarefas.selected');
    if (element) {
      element.classList.remove('selected');
    }
    event.target.classList.add('selected');
  });
}

function onClickCreateItem() {
  const text = inputTask.value;
  addTask(text, false);
}

function onClickClearTasks() {
  taskList.innerHTML = '';
}

function onClickClearCompleted() {
  const taskCompleted = Array.from(document.getElementsByClassName('completed'));
  taskCompleted.forEach((task) => task.remove());
}

function onClickSaveList() {
  const tasks = [];
  const children = Array.from(taskList.children);
  children.forEach((task) => tasks.push({
    text: task.innerText,
    completed: task.classList.contains('completed'),
  }));
  setLocalStorage(localStorageKey, tasks);
}

function onLoad() {
  const tasks = getLocalStorage(localStorageKey);
  if (!tasks) {
    return;
  }
  tasks.forEach((task) => addTask(task.text, task.completed));
}

function onClickMoveDown() {
  const task = document.querySelector('.tarefas.selected');
  if (!task) {
    return;
  }
  const next = task.nextElementSibling;
  if (!next) {
    return;
  }
  next.after(task);
}

function onClickMoveUp() {
  const task = document.querySelector('.tarefas.selected');
  if (!task) {
    return;
  }
  const previous = task.previousElementSibling;
  if (!previous) {
    return;
  }
  previous.before(task);
}

function onClickRemoveSelectedTask() {
  const task = document.querySelector('.tarefas.selected');
  if (!task) {
    return;
  }

  task.remove();
}

buttonCreateTask.addEventListener('click', onClickCreateItem);
buttonClear.addEventListener('click', onClickClearTasks);
buttonClearCompleted.addEventListener('click', onClickClearCompleted);
buttonSaveList.addEventListener('click', onClickSaveList);
buttonMoveDown.addEventListener('click', onClickMoveDown);
buttonMoveUp.addEventListener('click', onClickMoveUp);
buttonRemove.addEventListener('click', onClickRemoveSelectedTask);

window.onload = onLoad;
