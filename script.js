const taskList = document.getElementById('lista-tarefas');
const buttonCreateTask = document.getElementById('criar-tarefa');
const inputTask = document.getElementById('texto-tarefa');
const buttonClear = document.getElementById('apaga-tudo');

function onDoubleClickTask() {
  this.classList.toggle('completed');
}

function onClickCreateItem() {
  const li = document.createElement('li');
  li.className = 'tarefas';
  li.innerText = inputTask.value;
  taskList.appendChild(li);
  inputTask.value = '';
  li.tabIndex = 1;
  li.addEventListener('dblclick', onDoubleClickTask);
} 

function onClickClearTasks() {
  taskList.innerHTML = '';
}

buttonCreateTask.addEventListener('click', onClickCreateItem);
buttonClear.addEventListener('click', onClickClearTasks);
