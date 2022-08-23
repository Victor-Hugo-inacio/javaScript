//ELEMENTOS
let btnIniciar;
let bola;
let cpu;
let jogador;
let PainelItemPontos;

//CONTROLE DE ANIMAÇÃO
let game,frame;

//POSIÇÕES
let posBolaX,posBolaY;
let posJogadorX,posJogadorY;
let posCpuX,posCpuY;

//DIREÇÃO DE ACORDO COM A TECLA
let dirJy;

// POSIÇÃO INICIAL
let posJogIniY = 90;
let posCpuIniY = 90;
let posBolaIniX = 190;
let posBolaIniY = 115;
let posJogIniX = 10;
let posCpuIniX = 370;

// DIMENSÕES
let campoX = 0,campoY = 0,campoW = 400,campoH = 250;
let barraW = 20,barraH = 70;
let bolaW = 20,bolaH = 20;

//DIREÇÕES
let bolaX,bolaY;
let cpuY = 0;

//VELOCIDADES
let velBola;
let velCpu;
let velJogador;

let pontos = 0;
let tecla;
let jogo = false;

function controlaCpu() {
  if (jogo) {
    if ((posBolaX > (campoW / 2)) && (bolaX > 0)) {
      if (((posBolaY + (bolaH/2)) > (posCpuY + (barraH/2))) + velCpu) {
        if ((posCpuY + barraH) <= campoH) {
          posCpuY += velCpu;
        } 
      } 
      if (((posBolaY + (bolaH/2))) < (posCpuY + (barraH/2)) - velCpu) {
        if (posCpuY >= 0) {
          posCpuY -= velCpu;
        }
      }
    } else{
      if ((posCpuY + (barraH/2)) < (campoH/2)) {
        posCpuY += velCpu;
      } else if ((posCpuY + (barraH/2)) > (campoH/2)) {
        posCpuY -= velCpu;
      }
    }
  cpu.style.top =`${posCpuY}px`;
  }
}

function controlaJogador() { // move player
  if (jogo) {
    posJogadorY += velJogador * dirJy;
    if ((posJogadorY + barraH >= campoH) || (posJogadorY <= 0)) {
      posJogadorY += velJogador * dirJy * (-1);
    }
    jogador.style.top = `${posJogadorY}px`;
  }
}

function controlaBola() { //Move bola
  posBolaX += velBola * bolaX;
  posBolaY += velBola * bolaY;
  
  // colisão jogador
  if ((posBolaX <= posJogadorX + barraW) &&
     ((posBolaY + bolaH >= posJogadorY) && (posBolaY <= posJogadorY + barraH)))  {
    bolaY = (((posBolaY + (bolaH / 2)) - (posJogadorY + (barraH /2))) / 16);
    bolaX *= -1;
  }
  // colisão cpu
  if ((posBolaX >= posCpuX - barraW) &&
      ((posBolaY + bolaH >= posCpuY) && (posBolaY <= posCpuY + barraH)))  {
    bolaY = (((posBolaY + (bolaH / 2)) - (posJogadorY + (barraH /2))) / 16);
    bolaX *= -1;
  }
  
  // Limite superior e inferior 
  if ((posBolaY >= 230) || (posBolaY <= 0)) {
    bolaY *= -1;
  }
  
  // Saiu da tela(ppont direita e esquerda)
  if (posBolaX >= (campoW - bolaW)) {
    velBola = 0;
    posBolaX = posBolaIniX;
    posBolaY = posBolaIniY;
    posJogadorY = posJogIniY;
    posCpuY = posCpuIniY;
    pontos++;
    pontuacao.value = pontos;
    jogo = false;
  } else if (posBolaX <= 0 ) {
    velBola = 0;
    posBolaX = posBolaIniX;
    posBolaY = posBolaIniY;
    posJogadorY = posJogIniY;
    posCpuY = posCpuIniY;
    pontos--;
    pontuacao.value = pontos;
    jogo = false;
  }
  
  bola.style.top = `${posBolaY}px`;
  bola.style.left = `${posBolaX}px`;
}

function teclaUp() {
  tecla = event.keyCode;
  if (tecla == 38) { //Cima
    dirJy = -1;
  } else if (tecla == 40) { // Baixo
    dirJy = +1;
  }
}

function teclaDown() {
  tecla = event.keyCode;
  if (tecla == 38) { //Cima
    dirJy = 0;
  } else if (tecla == 40) { // Baixo
    dirJy = 0;
  }
}

function games() {
  if (jogo) {
    controlaJogador();
    controlaCpu();
    controlaBola();
  }
    frame = requestAnimationFrame(games);
}


function iniciaJogo() {
  if (!jogo) {
    jogo = true;
    cancelAnimationFrame(frame);
    velBola = velJogador = velCpu = 5;
    dirJy = 0;
    posBolaY = posBolaIniY;
    posBolaX = posBolaIniX;
    posJogadorY = posJogIniY;
    posJogadorX = posJogIniX;
    posCpuX = posCpuIniX;
    posCpuY = posCpuIniY;
    bolaY = 0;
    if ((Math.random() * 10) < 5) {
      bolaX = -1;
    } else {
      bolaX = 1;
    }
    games();
  }
}

function inicializar() {
  btnIniciar = document.getElementById('btnIniciar');
  btnIniciar.addEventListener('click', iniciaJogo);
  jogador = document.getElementById('jogador');
  bola = document.getElementById('bola');
  cpu = document.getElementById('cpu');
  pontuacao = document.getElementById('pontuacao');
  document.addEventListener('keydown', teclaDown);
  document.addEventListener('keyup', teclaUp);
}


window.addEventListener('load', inicializar);