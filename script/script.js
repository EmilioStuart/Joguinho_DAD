function timer(timerPlace) {
  let timer = 90; // tempo total do jogo em segundos
  let frutasPorVez = 1; // quantidade inicial de frutas que vão aparecer por vez
  let intervaloAumento = 15; // a cada 15 segundos a quantidade de frutas aumenta

  // função que atualiza o timer a cada 1 segundo
  let intervalId = setInterval(() => {
    // calcula minutos e segundos restantes
    let minutes = Math.floor(timer / 60);
    let seconds = timer % 60;

    // formata minutos e segundos para sempre ter dois dígitos
    let minutosStr = minutes < 10 ? "0" + minutes : minutes;
    let segundosStr = seconds < 10 ? "0" + segundos : seconds;

    // atualiza o texto do elemento do timer na tela
    timerPlace.textContent = `${minutosStr}:${segundosStr}`;

    // a cada intervalo de 15 segundos, aumenta a quantidade de frutas até o máximo 5
    if (timer % intervaloAumento === 0 && frutasPorVez < 5) {
      frutasPorVez++;
      window.frutasPorVez = frutasPorVez; // salva globalmente para usar em outras partes do código
    }

    // quando faltar 10 segundos, muda a cor do timer para vermelho
    if (timer === 10) {
      timerPlace.style.color = "#ff0000";
    }

    // quando o tempo chegar a 0, para o timer
    if (timer === 0) {
      clearInterval(intervalId);
    }

    timer--; // decrementa o tempo
  }, 1000);

  // armazena o estado global para outras funções usarem
  window.frutasPorVez = frutasPorVez;
  window.timerInterval = intervalId;
}

function validarEscolha(value, elementPlace) {
  // pega a pontuação atual do localStorage ou 0 se não existir
  let pontuacaoAntiga = localStorage.getItem("pontos") || 0;

  // se o valor for true, aumenta um ponto, senão diminui
  if (value === true) {
    localStorage.setItem("pontos", Number(pontuacaoAntiga) + 1);
  } else {
    localStorage.setItem("pontos", Number(pontuacaoAntiga) - 1);
  }

  // atualiza o texto do elemento que mostra os pontos na tela
  elementPlace.textContent = localStorage.getItem("pontos");
}

function criarBolinha() {
  // verifica quantas frutas já estão na tela
  const existentes = document.querySelectorAll('.bolinha').length;
  
  // se já tiver 5 ou mais frutas, tenta criar novamente depois de 500ms (evita excesso)
  if (existentes >= 5) {
    setTimeout(criarBolinha, 500);
    return;
  }

  // cria o elemento div para a fruta
  const bolinha = document.createElement('div');
  bolinha.classList.add('bolinha');

  // lista de frutas disponíveis (nomes dos arquivos)
  const frutas = ["apple.png", "banana.png", "basaha.png", "peach.png", "sandia.png"];
  
  // escolhe uma fruta aleatoriamente
  const frutaSorteada = frutas[Math.floor(Math.random() * frutas.length)];

  // define o tamanho da fruta conforme o tipo escolhido
  if (frutaSorteada === "apple.png") {
    bolinha.style.width = '79.86px';   
    bolinha.style.height = '79.86px';
  } else if (frutaSorteada === "banana.png") {
    bolinha.style.width = '152.46px';  
    bolinha.style.height = '60.5px';   
  } else if (frutaSorteada === "basaha.png") {
    bolinha.style.width = '82.28px';   
    bolinha.style.height = '87.12px';  
  } else if (frutaSorteada === "peach.png") {
    bolinha.style.width = '75.02px';   
    bolinha.style.height = '71.39px';  
  } else if (frutaSorteada === "sandia.png") {
    bolinha.style.width = '118.58px';  
    bolinha.style.height = '102.85px'; 
  }

  // define o caminho da imagem da fruta
  const caminhoImagem = `../image/fruit/${frutaSorteada}`;
  bolinha.style.backgroundImage = `url("${caminhoImagem}")`;
  bolinha.style.backgroundSize = 'cover';
  bolinha.style.backgroundRepeat = 'no-repeat';
  bolinha.style.borderRadius = '0'; // sem bordas arredondadas
  bolinha.style.position = 'fixed'; // posicionamento fixo na tela
  bolinha.style.pointerEvents = 'auto'; // aceita eventos de mouse
  bolinha.style.cursor = 'pointer'; // cursor de mão ao passar em cima

  // define os limites horizontais para a posição inicial da fruta (zona VIP)
  const larguraTela = window.innerWidth;
  const alturaTela = window.innerHeight;
  const inicioZonaVIP = larguraTela * 0.2;
  const fimZonaVIP = larguraTela * 0.8;

  // posição inicial aleatória dentro da zona VIP, na base da tela (parte inferior)
  const posXInicial = Math.random() * (fimZonaVIP - inicioZonaVIP) + inicioZonaVIP;
  const posYInicial = alturaTela;

  // parâmetros para simular física do movimento (parábola)
  let t = 0;              // tempo desde o lançamento
  const deltaT = 0.016;   // intervalo de tempo (~60fps)
  const vX = (Math.random() * 200 + 100) * (Math.random() < 0.5 ? -1 : 1); // velocidade horizontal aleatória, pode ser para esquerda ou direita
  const vY = -(Math.random() * 700 + 800);  // velocidade vertical inicial para cima (negativa)
  const g = 1500;         // aceleração da gravidade simulada em px/s²

  // define a posição inicial da fruta
  bolinha.style.left = posXInicial + 'px';
  bolinha.style.top = posYInicial + 'px';

  // adiciona a fruta na tela
  document.body.appendChild(bolinha);

  // função para animar a fruta em movimento parabólico
  function animar() {
    t += deltaT;

    // calcula a posição horizontal e vertical no tempo t usando fórmulas de física básica
    const x = posXInicial + vX * t;
    const y = posYInicial + vY * t + 0.5 * g * t * t;

    // atualiza a posição da fruta na tela
    bolinha.style.left = x + 'px';
    bolinha.style.top = y + 'px';

    // se a fruta sair da tela (abaixo da janela), remove e cria uma nova depois de 500ms
    if (y > alturaTela + 100) {
      bolinha.remove();
      setTimeout(criarBolinha, 500);
      return;
    }

    // pede para a animação continuar no próximo frame
    requestAnimationFrame(animar);
  }

  // evento que detecta quando o mouse passa em cima da fruta
  bolinha.addEventListener('mouseenter', () => {
    bolinha.remove(); // remove a fruta
    validarEscolha(true, document.getElementById("pontos")); // atualiza a pontuação
    setTimeout(criarBolinha, 500); // cria uma nova fruta após 500ms
  });

  // inicia a animação da fruta
  animar();
}

window.onload = () => {
  // inicializa a pontuação zerada no localStorage
  localStorage.setItem("pontos", 0);

  // atualiza a pontuação mostrada na tela
  document.getElementById("pontos").textContent = localStorage.getItem("pontos");

  // inicia o timer
  timer(document.getElementById("timer"));

  // cria a primeira fruta
  criarBolinha();
};
