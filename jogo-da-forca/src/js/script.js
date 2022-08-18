
let inputs;
let imagens;
let tamanhoPalavras;
let indicePalavra;
let palavra;
let palavraArray = [];
let inputChute;
let chute;
let btnChute;
let ocorrencia;
let erros;
let tentativas;
let statusJogo;
let acerto;
let novoJogo;

// fique avontade caso queira adicionar mais palavras !
let palavras = ["javascript","developer","estudos","brasil","darpa","matriz","praia","futebool"];

window.addEventListener('load', inicia);

function esconderInput() {
  inputs = document.querySelectorAll('.letra');
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].style.display = 'none';
    inputs[i].value = '';
  }
}

function esconderImage() {
  imagens = document.querySelectorAll('.imgForca');
  for (let i = 0; i < imagens.length; i++) {
    imagens[i].style.display = 'none';
  }
}

function escolhePalavra() {
  indicePalavra = Math.floor(Math.random()*tamanhoPalavras);
  palavra = palavras[indicePalavra].toUpperCase();
  console.log(palavra);
  for (let i = 0; i < palavra.length; i++) {
    palavraArray[i] = palavra[i];
  }
}

function mostrarInputPalavra() {
  for (let i = 0; i < palavra.length; i++) {
    inputs[i].style.display = 'inline';
  }
}

function inicia() {
  tamanhoPalavras = palavras.length - 1;
  esconderInput();
  esconderImage();
  escolhePalavra();
  mostrarInputPalavra();
  btnChute = document.getElementById('btnChute');
  btnChute.addEventListener('click', receberChuteUsuario);
  erros = document.getElementById('erros');
  statusJogo = document.getElementById('status');
  novoJogo = document.getElementById('novoJogo');
  novoJogo.addEventListener('click', novoGame);
  novoJogo.style.display = 'none';
  tentativas = 0;
  acerto = 0;
}

function receberChuteUsuario() {
  inputChute = document.getElementById('chute');
  chute = inputChute.value.toUpperCase();
  console.log(chute);
  inputChute.value = '';
  inputChute.focus();
  desenvolvimento();
}

function desenvolvimento() {
  
  if (palavraArray.includes(chute) == false) {
      erros.innerText += ` ${chute}`;
      tentativas++;
      if (tentativas > 7) {
        inputChute.setAttribute('disabled','disabled');
        btnChute.setAttribute('disabled','disabled');
        statusJogoAtual(statusJogo,`Você Perdeu!`,'red');
        novoJogo.style.display = 'inline';
      } else {
        mostraCorpo();
      }
  }
  
  for (let i = 0; i < palavra.length; i ++) {
    ocorrencia = palavraArray.indexOf(`${chute}`);
    if (ocorrencia != -1) {
        inputs[ocorrencia].value = palavraArray[ocorrencia];
        palavraArray[ocorrencia] = 0;
        ++acerto;
    } 
  }
  
  if (acerto == palavraArray.length) {
    inputChute.setAttribute('disabled','disabled');
    btnChute.setAttribute('disabled','disabled');
    statusJogoAtual(statusJogo,`Você Venceu!`,'green');
    novoJogo.style.display = 'inline';
  }
  
}

function mostraCorpo() {
  if (tentativas <= imagens.length) {
    imagens[tentativas - 1].style.display = 'inline';
  } else if (tentativas > imagens.length) {
    imagens[0].src = 'src/imagens/final.jpg';
  }
}

function statusJogoAtual(tag, text='',cor='') {
  tag.innerText = text;
  tag.style.color = cor;
}

function novoGame() {
  inicia();
  statusJogoAtual(statusJogo);
  erros.innerText = 'Letras erradas: ';
  inputChute.removeAttribute('disabled');
  btnChute.removeAttribute('disabled');
  imagens[0].src = 'src/imagens/cabeca.jpg';
}