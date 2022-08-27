let diryJ, dirxJ, jog, velJ, pJX, pJY;
let velTiro;
let tamTelaW, tamTelaH;
let musica;
let jogo;
let telaMenu, btnJogar, bombasRestantes;
let frame;
let controls;
let contBombas, painelContBombas, velBombas;
let intervalCriaBomba, tempoCriaBomba;
let bombasTotal, tamBombas;
let vidaPlaneta, barraPlaneta;
let indiceExplosao, indiceSom;
let telaStatus, statusG, btnReiniciar;

function teclaDow() {
  var tecla = event.keyCode;
  if (tecla === 38) { //Cima
    diryJ = -1;
  } else if (tecla === 40) { //Baixo
    diryJ = 1;
  }
  if (tecla === 37) { //Esquerda
    dirxJ = -1;
  } else if (tecla === 39) { //Direita
    dirxJ = 1;
  }
  if (tecla === 32) { // espaço
    somTiro()
    atira(pJX+31,pJY);
  }
}

function teclaUp() {
  var tecla = event.keyCode;
  if ((tecla === 38)||(tecla === 40)) { //libera cima ou baixo
    diryJ = 0;
  }
  if ((tecla === 37)||(tecla === 39)) { //libera esquerda ou direita
    dirxJ = 0;
  }
}

function controlsMobaDown(event) {
  controls = Number(event.target.id);
  if (controls === 38) { //Cima
    diryJ = -1;
  } else if (controls === 40) { //Baixo
    diryJ = 1;
  }
  if (controls === 37) { //Esquerda
    dirxJ = -1;
  } else if (controls === 39) { //Direita
    dirxJ = 1;
  }
  if (controls === 32) { // espaço
    somTiro()
    atira(pJX+31,pJY);
  }
}

function controlsMobaUp(event) {
  controls = Number(event.target.id);
  if ((controls === 38)||(controls === 40)) { //Cima
    diryJ = 0;
  } 
  if ((controls === 37)||(controls === 39)) { //Esquerda
    dirxJ = 0;
  }
}

function atira(x,y) {
  let tiro = document.createElement('div');
  tiro.setAttribute('class','tiroJog');
  tiro.setAttribute('style',`top: ${y}px; left: ${x}px;`);
  document.body.appendChild(tiro);
}

function criaBomba() {
  if (jogo) {
    let y = -2;
    let x = Math.floor(Math.random()*(tamTelaW - 50));
    let bomba = document.createElement('div');
    bomba.setAttribute('class','bomba');
    bomba.setAttribute('style',`top: ${y}px; left: ${x}px;`);
    document.body.appendChild(bomba);
  }
}

function controlaBomba() {
  bombasTotal = document.getElementsByClassName('bomba');
  tamBombas = bombasTotal.length;
  for (let i = 0; i < tamBombas; i++) {
    if (bombasTotal[i]) {
      let posBomba = bombasTotal[i].offsetTop;
      posBomba += velBombas;
      bombasTotal[i].style.top = `${posBomba}px`;
      if (posBomba > tamTelaH-57) {
        vidaPlaneta -= 20;
        contBombas--;
        CriaExplosao(2,null,bombasTotal[i].offsetLeft);
        bombasTotal[i].remove();
        gerenciaGame();
      }
    }
  }
}

function controleTiros() {
  let tiros = document.getElementsByClassName('tiroJog');
  let tamTiro = tiros.length;
  for (let i = 0; i < tamTiro; i++) {
    if (tiros[i]) {
      let posTiro = tiros[i].offsetTop;
      posTiro -= velTiro;
      tiros[i].style.top = `${posTiro}px`;
      colisaoTiroBomba(tiros[i]);
      if (posTiro < 0) {
        tiros[i].remove();
      }
    }
  }
}

function colisaoTiroBomba(tiro) {
  for (let i = 0; i < tamBombas; i++) {
    if (bombasTotal[i]) {
      if (((tiro.offsetTop <= (bombasTotal[i].offsetTop + 40))&&
         ((tiro.offsetTop + 6) >= bombasTotal[i].offsetTop))&&
         ((tiro.offsetLeft <= (bombasTotal[i].offsetLeft + 24))&&
         ((tiro.offsetLeft + 6) >= bombasTotal[i].offsetLeft))) {
        CriaExplosao(1,bombasTotal[i].offsetTop,bombasTotal[i].offsetLeft);
        bombasTotal[i].remove();
        tiro.remove();
        contBombas--;
      }
    }
  }
}

function CriaExplosao(tipo,y,x) {
  let explosao = document.createElement('div');
  let img = new Image();
  let audio = document.createElement('audio');
  explosao.setAttribute('id',`explosao${indiceExplosao}`);
  if (tipo === 1) {
    explosao.setAttribute('class','explosaoAr');
    explosao.setAttribute('style',`top: ${y}px; left: ${x-15}px;`);
    img.src = `src/imagens/explosao.gif`;
  } else if (tipo === 2) {
    explosao.setAttribute('class','explosaoTerra');
    explosao.setAttribute('style',`top: ${tamTelaH-57}px; left: ${x-17}px;`);
    img.src = `src/imagens/explosao.gif?${new Date()}`;
  }
  audio.setAttribute('id',`som${indiceSom}`);
  audio.src = `src/assets/explosao.mp3?${new Date()}`;
  audio.currentTime = 0.3;
  audio.volume = 0.2;
  document.body.appendChild(explosao);
  explosao.appendChild(img);
  explosao.appendChild(audio);
  document.getElementById(`som${indiceSom}`).play();
  setTimeout(function() {
    explosao.remove();
  }, 2000);
  indiceExplosao++;
  indiceSom++;
}

function controlaJogador() {
  pJY += diryJ * velJ;
  pJX += dirxJ * velJ;
  jog.style = `top: ${pJY}px; left:${pJX}px`;
}

function gerenciaGame() {
  barraPlaneta.style.width = `${vidaPlaneta}px`;
  if (contBombas <= 0) {
    jogo = false;
    clearInterval(intervalCriaBomba);
    telaStatus.style.display = `flex`;
    statusGame(`flex`,`You Win`);
    musicaGame(`src/assets/win.mp3`,true)
  }
  if (vidaPlaneta <= 0) {
    jogo = false;
    clearInterval(intervalCriaBomba);
    telaStatus.style.display = `flex`;
    statusGame(`flex`,`You Lose`);
    musicaGame(`src/assets/gameOver.mp3`,true)
  }
}

function statusGame(display,textStatus) {
  telaStatus.style.display = display;
  statusG.innerHTML = textStatus;
}

function gameLoop() {
  if (jogo) {
    //funções de controle
    if (tamTelaW <= 620) {
    document.addEventListener('touchstart', controlsMobaDown);
    document.addEventListener('touchend', controlsMobaUp);
    }
    controlaJogador();
    controleTiros();
    controlaBomba();
    quantiaBombas()
    gerenciaGame();
  }
  frame = requestAnimationFrame(gameLoop);
}

function musicaGame(srcM,deleted=false) {
    let musica = document.createElement('audio');
    musica.setAttribute('id','music')
    musica.setAttribute('autoplay','play')
    let musicTempo = setTimeout(musicaGame, 131000);
    if (deleted) {
      let musicaAtual = document.getElementById('music');
      clearTimeout(musicTempo);
      musicaAtual.remove();
    }
    musica.src = srcM;
    musica.volume = 0.3;
    document.body.appendChild(musica);
}

function somTiro() {
  let sonsTiro = document.getElementsByClassName('music');
    for (let i = 0; i < sonsTiro.length; i++) {
      if(sonsTiro[i]) {
        sonsTiro[i].remove();
      }
    }
  let somTiro = document.createElement('audio');
    somTiro.setAttribute('class','music')
    somTiro.setAttribute('autoplay','play')
    somTiro.src = `src/assets/disparo.mp3`;
    somTiro.volume = 0.9999;
    document.body.appendChild(somTiro);
}

function quantiaBombas() {
  bombasRestantes.innerHTML = `Bombas restante: ${contBombas}`;
}

function reinicia() {
  jogo = true
  if (tamBombas > 0) {
    bombasTotal = document.getElementsByClassName('bomba');
    tamBombas = bombasTotal.length;
    for (let i = 0; i < tamBombas; i++) {
      if (bombasTotal[i]) {
        bombasTotal[i].remove();
      }
    }
    let tiros = document.getElementsByClassName('tiroJog');
    let tamTiro = tiros.length;
    for (let i = 0; i < tamTiro; i++) {
      if (tiros[i]) {
        tiros[i].remove();
      }
    }
  }
  telaMenu.style.display = `none`;
  clearInterval(intervalCriaBomba);
  intervalCriaBomba = setInterval(criaBomba, tempoCriaBomba)
  cancelAnimationFrame(frame);
  contBombas = 2;
  
  vidaPlaneta = 20;
  pJX = (tamTelaW / 2) - 20;
  pJY = (tamTelaH / 2) - 40;
  jog.style = `top: ${pJY}px; left:${pJX}px`;
  barraPlaneta.style.width = `${vidaPlaneta}px`;
  musicaGame(`src/assets/fundo.mp3`,true);
  statusGame(`none`);
  gameLoop();
}

function btnIniciar() {
  let sonsButton = document.getElementsByClassName('sonBtn');
    for (let i = 0; i < sonsButton.length; i++) {
      if(sonsButton[i]) {
        sonsButton[i].remove();
      }
    }
  let somButton = document.createElement('audio');
  somButton.setAttribute('class','sonBtn')
  somButton.setAttribute('autoplay','play')
  somButton.src = `src/assets/buttonSom.mp3`;
  somButton.currentTime = 0.4;
  somButton.volume = 0.3;
  document.body.appendChild(somButton);
  setTimeout(reinicia, 1500);
}

function inicia() {
  jogo = false;
  //MUSICA JOGO
  musicaGame(`src/assets/tela-start.mp3`);
  // inicializar jogador
  dirxJ = diryJ = 0;
  // inicialisar tela
  tamTelaH = window.innerHeight;
  tamTelaW = window.innerWidth;
  // JOGADOR INICIAL
  pJX = (tamTelaW / 2) - 20;
  pJY = (tamTelaH / 2) - 40;
  velJ = 4;
  velTiro = 7;
  velBombas = 4;
  jog = document.getElementById('navJog');
  jog.style = `top: ${pJY}px; left:${pJX}px`;
  //CONTROLE DAS BOMBAS
  contBombas = 60;
  tempoCriaBomba = 2000;
  //VIDA PLANETA
  vidaPlaneta = 200;
  barraPlaneta = document.getElementById('barraPlaneta');
  barraPlaneta.style.width = `${vidaPlaneta}px`;
  // CONTROLE EXPLOSAO
  indiceExplosao = 0; 
  indiceSom = 0;
  //TELA STATUS JOGO
  telaMenu = document.getElementById('telaMsg');
  telaMenu.style.display = `flex`;
  btnJogar = document.getElementById('btnJogar');
  btnJogar.addEventListener('click', btnIniciar);
  telaStatus = document.getElementById('telaFim');
  statusG = document.getElementById('statusGame');
  bombasRestantes = document.getElementById('contBombas');
  btnReiniciar = document.getElementById('btnReiniciar');
  btnReiniciar.addEventListener('click', btnIniciar);
  statusGame(`none`);
}

window.addEventListener('load', inicia);
document.addEventListener('keydown', teclaDow);
document.addEventListener('keyup', teclaDow);