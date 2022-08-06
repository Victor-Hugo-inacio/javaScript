const adicionar = document.getElementById('adcionar');
const finalizar = document.getElementById('finalizar');
const limpar = document.getElementById('limpar');
const numerosAdicionados = document.getElementById('numeros-adcionados');
const resultado = document.getElementById('resultado');
//busca e declaração das variaveis de acordo com os items do HTML

let numerosUsuario = [];
let total = 0;
// declaração da array dos digitos di usuario e o total de numeros

adicionar.addEventListener('click', function() {
  // declaração do value do elemento digitado pelo usuário e conversão
  const inputUsuario = document.getElementById('numero');
  const adicaoUsuario = Number(inputUsuario.value);
  //reset do resultado pra limpar quando o usuario clicar novamente em adicionar 
  total = 0;
  resultado.innerHTML = '';
  // primeira verificação se há algo digitado
  if (inputUsuario.value.length == 0) {
    window.alert('ERRO! nenhum valor encontrado.');
  } else { // adicionando os numeros(inputs) do usuario na array e criação da option na select do HTML
    numerosUsuario.push(adicaoUsuario);
    const option = document.createElement('option');
    option.innerHTML = `O numero ${adicaoUsuario} foi adicionado`;
    // afiliação da tag pra section declarada 
    numerosAdicionados.appendChild(option);
  }
  
});
// função pra quando o usuario quiser finalizar a adição e ver o resultado 
finalizar.addEventListener('click', function() {
  // verificação se a algo na array 
  if (numerosUsuario.length == 0) {
    window.alert('ERRO! nenhum valor encontrado.');
  } else {
    // percorrendo a array e somando os valores dela
    for (let numero in numerosUsuario) {
      total +=  numerosUsuario[numero];
    }
    // media da array
    media = total / numerosUsuario.length;
    // adição das respostas e informações apos a finalização 
    resultado.innerHTML = `<br/><h3>Ao todo, temos ${numerosUsuario.length} números cadastrados.</h3><br/>`;
    resultado.innerHTML += `<h3>o maior valor informado foi ${Math.max.apply(null, numerosUsuario)}.</h3><br/>`;
    resultado.innerHTML += `<h3>o menor valor informado foi ${Math.min.apply(null, numerosUsuario)}.</h3><br/>`;
    resultado.innerHTML += `<h3>Somando todos os valores, temos ${total}.</h3><br/>`;
    resultado.innerHTML += `<h3>A média do valores digitados é ${media.toFixed(2)}.</h3><br/>`;
    
  }
  
});
// função pra resetar ou limpar todas as alterações e recomeçar
limpar.addEventListener('click', function() {
  
  resultado.innerHTML = '';
  numerosAdicionados.innerHTML = '';
  total = 0;
  numerosUsuario = [];
  
});