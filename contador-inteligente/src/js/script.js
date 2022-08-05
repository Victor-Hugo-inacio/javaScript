const start = document.getElementById('start');
//recolhimento do elemento do botão de inicio e acionando evento

start.addEventListener('click', function() {
  //busca dos elementos de input 
  const comeco = document.getElementById('inicio');
  const final = document.getElementById('fim');
  const passos = document.getElementById('passo');
  const resp = document.getElementById('resposta');
  const infoAtual = document.getElementById('informacao');
  //conversão dos inputs do usuário pra números
  const inicio = Number(comeco.value);
  const fim = Number(final.value);
  const passo = Number(passos.value);
  //condição de inicio da contagem onde o fim tem q ser maior q inicio e o passo menor que o fim
   if (fim > inicio && passo < fim) {
    // laço for pra contagem como foi definido o início e fim 
    for (let contador = inicio; contador  <= fim; contador += passo){ //criação do elemento pra contagem 
      const strong = document.createElement('strong');
      infoAtual.innerHTML = `<h4 id="informacao">Contando...</h4>`;
      if (contador < fim) {
        strong.innerHTML = ` ${contador}.... ⏭️`;
      } else {
        strong.innerHTML = ` ${contador} 🏁`;
      } //adicionando elemento criado ao HTML de forma dinâmica
      resp.appendChild(strong);
    }
    // condição se o fim for menor que o início pra ter uma contagem regressiva
  } else if (fim < inicio) {
    
    for (let contador = inicio; contador >= fim; contador -= passo){
      const strong = document.createElement('strong');
      infoAtual.innerHTML = `<h4 id="informacao">Contando...</h4>`;
      if (contador > fim) {
        strong.innerHTML = ` ${contador}.... ⏭️`;
      } else {
        strong.innerHTML = ` ${contador} 🏁`;
      }
      resp.appendChild(strong);
    }
  
  }
  
});