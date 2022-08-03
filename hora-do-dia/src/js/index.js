window.onload = function () {
  //elementos pegos do HTML
  let fundo = document.getElementById('fundo');
  let cumprimento = document.getElementById('cumprimento');
  let horario = document.getElementById('hora');
  let img = document.getElementById('imagem');
  //variáveis com a hora e minutos da máquina
  let data = new Date();
  let hora = data.getHours()
  let minuto = data.getMinutes()
  //1 condição pra manha
  if (hora >= 0 && hora < 12) {
    cumprimento.innerText = 'BOM DIA!'
    horario.innerText = `Agora são exatamente ${hora}:${minuto}`
    img.src = 'src/imagens/manha.png'
    fundo.style.backgroundImage = `url(${'src/imagens/fundo-manha.jpg'})`;
  } else if (hora >= 12 && hora < 18){ //segunda condição pra tarde
    cumprimento.innerText = 'BOA TARDE!'
    horario.innerText = `Agora são exatamente ${hora}:${minuto}`
    img.src = 'src/imagens/tarde.png'
    fundo.style.backgroundImage = `url(${'src/imagens/fundo-tarde.jpg'})`;
  } else { // terceira condição pra noite
    cumprimento.innerText = 'BOA NOITE!'
    horario.innerText = `Agora são exatamente ${hora}:${minuto}`
    img.src = 'src/imagens/noite.png'
    fundo.style.backgroundImage = `url(${'src/imagens/fundo-noite.jpg'})`;
  }
  
};
