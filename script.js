function createElement(element, text, att, value) {
  const newElement = document.createElement(element);
  newElement.innerText = text;
  newElement.setAttribute(att, value);
  return newElement;
}

const body = document.getElementsByTagName('body');
body[0].appendChild(createElement('header', 'Minha Lista de Tarefas', 'id', 'cabecalho'));
const header = document.getElementById('cabecalho');
const textP = 'Clique duas vezes em um item para marcá-lo como completo';
header.appendChild(createElement('p', textP, 'id', 'funcionamento'));
header.appendChild(createElement('input', '', 'id', 'texto-tarefa'));
header.appendChild(createElement('button', 'Criar', 'id', 'criar-tarefa'));
body[0].appendChild(createElement('ol', '', 'id', 'lista-tarefas'));
const lista = document.getElementById('lista-tarefas');
const textoInput = document.getElementById('texto-tarefa');
const clickBotao = document.getElementById('criar-tarefa');
clickBotao.addEventListener('click', () => {
  lista.appendChild(createElement('li', textoInput.value, 'class', 'item'));
  textoInput.value = '';
});
