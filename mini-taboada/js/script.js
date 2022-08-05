const calcular = document.getElementById('calcular');
// definindo a variavel de inicio da função ao clicar
calcular.addEventListener('click', function() {
  //recolhimento e conversão do valor do input do usuario de string pra numero
  const inputUsuario = document.getElementById('numero-taboada');
  const numeroTaboadaUsuario = Number(inputUsuario.value);
  //validação se foi digitado algum valor
  if (inputUsuario.value.length == 0) {
    window.alert('Digite um valor para Taboada');
  } else {
    // definição da variavel e reset dos selects no HTML
    let taboada = document.getElementById('taboada');
    taboada.innerHTML = '';
    for (let contador = 0; contador <= 10; contador += 1) {
      // laço for de acordo com o input do usuario formando a taboada
      let resultado = numeroTaboadaUsuario * contador;
      let option = document.createElement('option');
      option.value = `${contador}`;
      option.innerHTML = `${numeroTaboadaUsuario} x ${contador} = ${resultado}`;// adição ao HTML na forma de taboada input × valor do contador = resultado 
      taboada.appendChild(option)
    }
      
  }
  
});
