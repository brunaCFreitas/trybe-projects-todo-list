const taskList = document.getElementById('lista-tarefas');
const buttonCreateTask = document.getElementById('criar-tarefa');
const inputTask = document.getElementById('texto-tarefa');
const buttonClear = document.getElementById('apaga-tudo');
const buttonClearCompleted = document.getElementById('remover-finalizados');
const buttonSaveList = document.getElementById('salvar-tarefas');
const localStorageKey = 'tasks';

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
  if(!tasks) {
    return;
  }
  tasks.forEach((task) => addTask(task.text, task.completed));
}

buttonCreateTask.addEventListener('click', onClickCreateItem);
buttonClear.addEventListener('click', onClickClearTasks);
buttonClearCompleted.addEventListener('click', onClickClearCompleted);
buttonSaveList.addEventListener('click', onClickSaveList);

window.onload = onLoad;
