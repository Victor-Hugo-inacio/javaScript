var tamanho = document.getElementById('tamanho');
var quantidade = document.getElementById('quantidade');
var tipoSenha = document.getElementsByName('tipo-Senha');
var gerarSenha = document.getElementById('gerarSenha');
var senhaCriada = document.getElementById('senhaCriada');
var copy = document.getElementById('copy');

let senha = '';
var tamAnterior = 0;

let letras = "abcdefghijklmnopqrstuvwxyz";
let numeros = '123456789';


window.addEventListener('load', mostraTamanho);

gerarSenha.addEventListener('click',tiposenha);

copy.addEventListener('click', execCopy);




function mostraTamanho() {
  tam = Number(tamanho.value);
  requestAnimationFrame(mostraTamanho);
  if (tam != tamAnterior) {
    tamAnterior = tam;
    quantidade.innerText = `Quantidade de caracteres: ${tamAnterior}`;
  }
}

function tiposenha() {
  innerHTML(senhaCriada);
  senha = '';
  if (tipoSenha[0].checked === true) {
    gerasenha()
    
	  innerHTML(senhaCriada,`${senha}`);
	  copy.removeAttribute('class');
  } else if (tipoSenha[1].checked) {
    gerasenha(2)
    for (let i = 1; i <= tamAnterior/2; i++) {
      senha += String(numeros[Math.floor(Math.random()*numeros.length)]);
    }
    if (senha.length < tamAnterior) {
      senha += letras[Math.floor(Math.random()*numeros.length)];
    }
    
    innerHTML(senhaCriada,`${senha}`);
    copy.removeAttribute('class');
  } else {
    innerHTML(senhaCriada,`ERRO! selecione o tipo de senha.`,'red');
  }
}

function innerHTML(tag,texto=``,cor=``) {
  tag.value = texto;
  tag.style.color = cor;
}

function execCopy() {
  document.querySelector("#senhaCriada").select();
  document.execCommand("copy");
}

function gerasenha(n=1) {
  for (let i = 1; i <= tamAnterior/n; i++) {
      senha += letras[Math.floor(Math.random()*letras.length)];
    }
}