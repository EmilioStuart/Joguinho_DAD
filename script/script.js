function timer(timerPlace) {
  let timer = 90; // 90 segundos
  let frutasPorVez = 1; // começa com 1 fruta
  let intervaloAumento = 15; // a cada 15 segundos aumenta

  let intervalId = setInterval(() => {
    let minutes = Math.floor(timer / 60);
    let seconds = timer % 60;

    let minutosStr = minutes < 10 ? "0" + minutes : minutes;
    let segundosStr = seconds < 10 ? "0" + seconds : seconds;

    timerPlace.textContent = `${minutosStr}:${segundosStr}`;

    if (timer % intervaloAumento === 0 && frutasPorVez < 5) {
      frutasPorVez++;
      window.frutasPorVez = frutasPorVez;
    }

    if (timer === 10) {
      timerPlace.style.color = "#ff0000";
    }

    if (timer === 0) {
      clearInterval(intervalId);
    }

    timer--;
  }, 1000);

  window.frutasPorVez = frutasPorVez;
  window.timerInterval = intervalId;
}

function validarEscolha(value, elementPlace) {
  let pontuacaoAntiga = localStorage.getItem("pontos") || 0;

  if (value === true) {
    localStorage.setItem("pontos", Number(pontuacaoAntiga) + 1);
  } else {
    localStorage.setItem("pontos", Number(pontuacaoAntiga) - 1);
  }

  elementPlace.textContent = localStorage.getItem("pontos");
}

function criarBolinha() {
  // Limita no máximo 5 frutas simultâneas na tela
  const existentes = document.querySelectorAll('.bolinha').length;
  if (existentes >= 5) {
    // Tenta novamente após 500ms
    setTimeout(criarBolinha, 500);
    return;
  }

  const bolinha = document.createElement('div');
  bolinha.classList.add('bolinha');

  const frutas = ["apple.png", "banana.png", "basaha.png", "peach.png", "sandia.png"];
  const frutaSorteada = frutas[Math.floor(Math.random() * frutas.length)];

  // Ajustes de tamanho conforme tipo de fruta
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

  const caminhoImagem = `../image/fruit/${frutaSorteada}`;
  bolinha.style.backgroundImage = `url("${caminhoImagem}")`;
  bolinha.style.backgroundSize = 'cover';
  bolinha.style.backgroundRepeat = 'no-repeat';
  bolinha.style.borderRadius = '0';
  bolinha.style.position = 'fixed';
  bolinha.style.pointerEvents = 'auto';
  bolinha.style.cursor = 'pointer';

  const larguraTela = window.innerWidth;
  const alturaTela = window.innerHeight;
  const inicioZonaVIP = larguraTela * 0.2;
  const fimZonaVIP = larguraTela * 0.8;
  const posXInicial = Math.random() * (fimZonaVIP - inicioZonaVIP) + inicioZonaVIP;
  const posYInicial = alturaTela;

  let t = 0;
  const deltaT = 0.016;
  const vX = (Math.random() * 200 + 100) * (Math.random() < 0.5 ? -1 : 1);
  const vY = -(Math.random() * 700 + 800);
  const g = 1500;

  bolinha.style.left = posXInicial + 'px';
  bolinha.style.top = posYInicial + 'px';

  document.body.appendChild(bolinha);

  function animar() {
    t += deltaT;
    const x = posXInicial + vX * t;
    const y = posYInicial + vY * t + 0.5 * g * t * t;

    bolinha.style.left = x + 'px';
    bolinha.style.top = y + 'px';

    if (y > alturaTela + 100) {
      bolinha.remove();
      setTimeout(criarBolinha, 500);
      return;
    }

    requestAnimationFrame(animar);
  }

  bolinha.addEventListener('mouseenter', () => {
    bolinha.remove();
    validarEscolha(true, document.getElementById("pontos"));
    setTimeout(criarBolinha, 500);
  });

  animar();
}

window.onload = () => {
  localStorage.setItem("pontos", 0);
  document.getElementById("pontos").textContent = localStorage.getItem("pontos");
  timer(document.getElementById("timer"));
  criarBolinha();
};