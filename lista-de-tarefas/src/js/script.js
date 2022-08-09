const container = document.getElementById('container');
const adicionar = document.getElementById('btn-adicionar');
const excluir = document.getElementById('btn-excluir');
const tarefa = document.getElementById('tarefa');
const tarefaMarcada = document.getElementById('texto');
const erro = document.getElementById('erro');

let contador = 0;

let listaTarefas = [];

adicionar.addEventListener('click', function() {
  
  const tarefa = document.getElementById('adicionar-tarefa');
  
  const tarefaAdicionada = tarefa.value;
  
  if (tarefa.value.length == 0) {
    erro.innerHTML = 'O campo está vazio, digite algo para adicionar a lista!..';
    tarefa.focus();
    setTimeout(function() {
      erro.innerHTML = "";
    }, 7000);
  } else {
    
    erro.innerHTML = "";
    listaTarefas.push(tarefaAdicionada);
    
    contador++;
    
    let novoItem = `<section class="tarefa" onclick="marcado(${contador})" id="${contador}">
      <p class="texto">${tarefaAdicionada}</p> 
      <button onclick="excluirTarefa(${contador})" class="btn-excluir" id="btn-excluir" type="submit"><img class="img" src="src/imagens/excluir.png" alt="" /></button>
    </section>`;
    
    container.innerHTML += novoItem;
    tarefa.value = "";
    tarefa.focus();
  }
  
});

function excluirTarefa(id) {
  var excluirTarefa = document.getElementById(id);
  excluirTarefa.remove();
}

function marcado(id) {
  var marcado = document.getElementById(id);
  
  if (marcado.classList.length === 2) {
    marcado.classList.remove("clicado");
  } else {
    marcado.classList.add("clicado");
    marcado.parentNode.appendChild(marcado);
  }
}
