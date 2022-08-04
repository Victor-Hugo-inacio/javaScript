const informacoesRecebidas = document.getElementById('enviar');
// validação da chamada da função conforme o click no elemento do botão
informacoesRecebidas.addEventListener('click', function() {
  // criação das variaveis buscando os elementos HTML
  const validacao = document.getElementById('informacoes');
  const usuarioNascimento = document.getElementById('txtano');
  const nascimentoUsuario = Number(usuarioNascimento.value);
  // declaração da variavel pra ano atual
  let data = new Date();
  let anoAtual = data.getFullYear();
  //validação de escolha do usuário
  if (usuarioNascimento.value.length < 4 || nascimentoUsuario > anoAtual) {
    window.alert('ERRO! VERIFIQUE AS INFORMAÇÕES E TENTE NOVAMENTE.');
  } else { //calculo da idade e criação da tag da imagem dinamicamente
    const idadeUsuario = anoAtual - nascimentoUsuario;
    const sexoUsuario = document.getElementsByName('radio-sexo');
    let generoUsuario = '';
    const img = document.createElement('img');
    img.setAttribute('id', 'foto');
    // validação de genero pela tag de input radio
    if (sexoUsuario[0].checked) {
      generoUsuario = 'Homem';
      //validação da imagem conforme a idade do usuário
      if (idadeUsuario < 10) {
        img.setAttribute('src', 'src/imagens/crianca-m.png');
      } else if (idadeUsuario < 18) {
        img.setAttribute('src', 'src/imagens/jovem-m.png');
      } else if (idadeUsuario < 45) {
        img.setAttribute('src', 'src/imagens/homem-m.png');
      } else {
        img.setAttribute('src', 'src/imagens/senhor-m.png');
      };
      
    } else if (sexoUsuario[1].checked) {
      generoUsuario = 'Mulher';

      if (idadeUsuario < 10) {
        img.setAttribute('src', 'src/imagens/crianca-f.png');
      } else if (idadeUsuario < 18) {
        img.setAttribute('src', 'src/imagens/jovem-f.png');
      } else if (idadeUsuario < 45) {
        img.setAttribute('src', 'src/imagens/mulher-f.png');
      } else {
        img.setAttribute('src', 'src/imagens/senhora-f.png');
      };
      
    } else { //validação se o usuario selecionou um genero
      window.alert('Selecione seu gênero para prosseguir');
    };
    // impressão do genero e idade do usuário junto da imagem
    validacao.innerHTML = `O usuario é <strong>${generoUsuario}</strong> e tem <strong>${idadeUsuario}</strong> anos`;
    validacao.appendChild(img);
    }
});