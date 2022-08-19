let jogo = [];
let tabuleiro = [];
let quemJoga = 0; // 0 jogador  -  1 cpu
let verifica;
let jogando = true;
let nivel = 1;
let jogadaCpu = 1;
let quemComeca = 1;
let telaFim;
let venceu;
let jogadas;
let vez;
let vitoriasCpu = 0;
let vitoriasJogador = 0;

let vitoriaJogador = document.getElementById('pontoJogador');
let vitoriaCpu = document.getElementById('pontoCPU');
let aumentaNivel = document.getElementById('aumentaNivel');
let diminuiNivel = document.getElementById('diminuiNivel');
let nivelJogo = document.getElementById('nivelJogo');
let btnInicia = document.getElementById('btnInicia');


function jogar(p) {
  if ((jogando)&&(quemJoga === 0)) {
    switch (p) {
      case 1:
         if (jogo[0][0] == "") {
           jogo[0][0] = "X";
           quemJoga = 1;
         }
        break;
      case 2:
        if (jogo[0][1] == "") {
           jogo[0][1] = "X";
           quemJoga = 1;
         }
        break;
      case 3:
        if (jogo[0][2] == "") {
           jogo[0][2] = "X";
           quemJoga = 1;
         }
        break;
      case 4:
        if (jogo[1][0] == "") {
           jogo[1][0] = "X";
           quemJoga = 1;
         }
        break;
      case 5:
        if (jogo[1][1] == "") {
           jogo[1][1] = "X";
           quemJoga = 1;
         }
        break;
      case 6:
        if (jogo[1][2] == "") {
           jogo[1][2] = "X";
           quemJoga = 1;
         }
        break;
      case 7:
        
        if (jogo[2][0] == "") {
           jogo[2][0] = "X";
           quemJoga = 1;
         }
        break;
      case 8:
        if (jogo[2][1] == "") {
           jogo[2][1] = "X";
           quemJoga = 1;
         }
        break;
      default:
        if (jogo[2][2] == "") {
           jogo[2][2] = "X";
           quemJoga = 1;
         }
    }
    if (quemJoga == 1) {
      verifica = verificaVitoria();
      vitoria();
      jogadas++;
      statusDoJogo();
      atualizaTabuleiro();
      setTimeout(cpuJoga, 500);
    }
  }
  
}

function cpuJoga() {
  if (jogando) {
    let l;
    let c;
    if (nivel == 1) {
      if (jogadas < 7) {
        do {
          l = Math.floor(Math.random()*2);
          c = Math.floor(Math.random()*2);
          console.log('ola');
        } while (jogo[l][c] != "");
        jogo[l][c] = "O";
      } else {
        for( let x = 0; x < 3; x++) {
          for( let y = 0; y < 3; y++) {
            if (jogo[x][y] == "") {
              jogo[x][y] = "O";
            }
          }
        }
      }
      quemJoga = 0;
    } else if (nivel === 2) {
      // nivel 2
    } else {
     // nivel 3
    }
    if (quemJoga == 0) {
      verifica = verificaVitoria();
      vitoria();
      jogadas++;
      statusDoJogo();
      atualizaTabuleiro();
    }
  }
}

function vitoria() {
  if ((verifica != "")&&(verifica == "O")) {
    mostraTelaFim("O Venceu");
    btnInicia.style.display = 'inline-block';
    jogando = false;
    vitoriasCpu++;
    vitoriaCpu.innerHTML = `CPU: ${vitoriasCpu}`;
  } else if ((verifica != "")&&(verifica == "X")) {
    mostraTelaFim("X Venceu");
    btnInicia.style.display = 'inline-block';
    jogando = false;
    vitoriasJogador++;
    vitoriaJogador.innerHTML = `Jogador: ${vitoriasJogador}`;
  }
}

function verificaVitoria() {
  let l;
  let c;
  // LINHAS
  for (l = 0; l < 3; l++) {
    if ((jogo[l][0] === jogo[l][1])&&(jogo[l][1] === jogo[l][2])) {
      return jogo[l][0];
    }
  }
  // COLUNAS
  for (c = 0; c < 3; c++) {
    if ((jogo[0][c] === jogo[1][c])&&(jogo[1][c] === jogo[2][c])) {
      return jogo[0][c];
    }
  }
  // DIAGONAL LEFT
  if ((jogo[0][0] === jogo[1][1])&&(jogo[1][1] === jogo[2][2])) {
      return jogo[0][0];
  }
  // DIAGONAL RIGHT
  if ((jogo[0][2] === jogo[1][1])&&(jogo[1][1] === jogo[2][0])) {
      return jogo[0][2];
    }
}

function atualizaTabuleiro() {
  for (let l = 0; l < 3; l++) {
    for (let c = 0; c < 3; c++) {
      if (jogo[l][c] == "X") {
        tabuleiro[l][c].innerHTML = "X";
        tabuleiro[l][c].style.cursor = "default";
      } else if (jogo[l][c] == "O") {
        tabuleiro[l][c].innerHTML = "O";
        tabuleiro[l][c].style.cursor = "default";
      } else {
        tabuleiro[l][c].innerHTML = "";
        tabuleiro[l][c].style.cursor = "pointer";
      }
    }
  }
}

function statusDoJogo() {
  if (quemJoga === 0) {
    vez.innerHTML = 'Quem joga: Jogador';
  } else {
    vez.innerHTML = 'Quem joga: CPU';
  }
}

function iniciar() {
  jogadas = 0;
  jogando = true;
  jogadaCpu = 1;
  jogo = [
    ["","",""],
    ["","",""],
    ["","",""]
    ];
  tabuleiro = [
    [document.getElementById('p1'),document.getElementById('p2'),document.getElementById('p3')],
    [document.getElementById('p4'),document.getElementById('p5'),document.getElementById('p6')],
    [document.getElementById('p7'),document.getElementById('p8'),document.getElementById('p9')]
    ];
  atualizaTabuleiro()
  telaFim = document.getElementById('blackout');
  venceu = document.getElementById('statusJogo');
  vez = document.getElementById('vez');
  btnInicia.style.display = 'none';
  telaFim.style.display = 'none';
  diminuiNivel.addEventListener('click', mudaNivel);
  aumentaNivel.addEventListener('click', mudaNivel);
}

function mostraTelaFim(vencedor) {
  telaFim.style.display = 'flex';
  venceu.innerText = vencedor;
  btnInicia.style.zIndex = '6';
  btnInicia.style.display = 'inline-block';
}

function mudaNivel(event) {
  let id = event.target.id
  if (id == 'diminuiNivel') {
    if (nivel == 1) {
      nivel = 2
    } else {
      nivel--;
    }
  } else if (id == 'aumentaNivel') {
    if (nivel == 2) {
      nivel = 1
    } else {
      nivel++;
    }
  }
  if (nivel == 1) {
    nivelJogo.innerHTML = `Fácil`;
  } else if (nivel == 2) {
    nivelJogo.innerHTML = `Médio`;
  } /*else {
    nivelJogo.innerHTML = `Difícil`;
  }*/
}

btnInicia.addEventListener('click', iniciar);