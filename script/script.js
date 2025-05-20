function timer(timerPlace) {
    let timer = 60; // Tempo total do jogo em segundos
    let frutasPorVez = 1; // Começa exibindo 1 fruta por vez
    let intervaloAumento = 15; // A cada 15 segundos, aumenta a quantidade de frutas simultâneas

    // Inicia o cronômetro que atualiza a cada segundo
    let intervalId = setInterval(() => {
        let minutes = Math.floor(timer / 60); // Converte segundos em minutos
        let seconds = timer % 60; // Pega os segundos restantes

        // Formata os minutos e segundos com dois dígitos
        let minutosStr = minutes < 10 ? "0" + minutes : minutes;
        let segundosStr = seconds < 10 ? "0" + seconds : seconds;

        // Atualiza o elemento HTML com o tempo formatado
        timerPlace.textContent = `${minutosStr}:${segundosStr}`;

        // A cada intervalo definido, aumenta a quantidade de frutas (máximo 5)
        if (timer % intervaloAumento === 0 && frutasPorVez < 5) {
        frutasPorVez++;
        window.frutasPorVez = frutasPorVez;
        }

        // Quando o tempo chegar a 10 segundos, muda a cor para vermelho (alerta)
        if (timer === 10) {
        timerPlace.style.color = "#ff0000";
        }

        // Quando o tempo acabar, para o cronômetro e redireciona para a página final
        if (timer === 0) {
        clearInterval(intervalId);
        location.href = "../index/paginaFinal.html";
        }

        timer--; // Decrementa o tempo a cada segundo
    }, 1000);

    // Define essas variáveis no escopo global para usar em outras funções
    window.frutasPorVez = frutasPorVez;
    window.timerInterval = intervalId;
}

function validarEscolha(value, elementPlace) {
    // Pega a pontuação anterior (ou 0 se não tiver nenhuma)
    let pontuacaoAntiga = localStorage.getItem("pontos") || 0;

    // Se o valor for verdadeiro, adiciona ponto. Se falso, remove ponto.
    if (value === true) {
        localStorage.setItem("pontos", Number(pontuacaoAntiga) + 1);
    } else {
        localStorage.setItem("pontos", Number(pontuacaoAntiga) - 1);
    }

    // Atualiza o texto na tela com a nova pontuação
    elementPlace.textContent = localStorage.getItem("pontos");
}

function criarBolinha() {
    // Verifica quantas bolinhas já estão na tela (máximo 5)
    const existentes = document.querySelectorAll('.bolinha').length;
    if (existentes >= 5) {
        // Se tiver 5 ou mais, espera 500ms e tenta novamente
        setTimeout(criarBolinha, 500);
        return;
    }

    // Cria o elemento da bolinha (fruta)
    const bolinha = document.createElement('div');
    bolinha.classList.add('bolinha');

    // Lista de imagens das frutas
    const frutas = ["apple.png", "banana.png", "basaha.png", "peach.png", "sandia.png"];
    const frutaSorteada = frutas[Math.floor(Math.random() * frutas.length)];

    // Define o tamanho da bolinha de acordo com a fruta sorteada
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

    // Define o caminho da imagem e configura o estilo visual da fruta
    const caminhoImagem = `../image/fruit/${frutaSorteada}`;
    bolinha.style.backgroundImage = `url("${caminhoImagem}")`;
    bolinha.style.backgroundSize = 'cover';
    bolinha.style.backgroundRepeat = 'no-repeat';
    bolinha.style.borderRadius = '0';
    bolinha.style.position = 'fixed';
    bolinha.style.pointerEvents = 'auto';
    bolinha.style.cursor = 'pointer';

    // Define a posição inicial da bolinha (dentro da zona central da tela)
    const larguraTela = window.innerWidth;
    const alturaTela = window.innerHeight;
    const inicioZonaVIP = larguraTela * 0.2;
    const fimZonaVIP = larguraTela * 0.8;
    const posXInicial = Math.random() * (fimZonaVIP - inicioZonaVIP) + inicioZonaVIP;
    const posYInicial = alturaTela;

    // Define variáveis para a simulação da física (movimento da bolinha)
    let t = 0;
    const deltaT = 0.016;
    const vX = (Math.random() * 200 + 100) * (Math.random() < 0.5 ? -1 : 1); // velocidade horizontal aleatória
    const vY = -(Math.random() * 700 + 800); // velocidade inicial pra cima
    const g = 1500; // gravidade

    bolinha.style.left = posXInicial + 'px';
    bolinha.style.top = posYInicial + 'px';

    document.body.appendChild(bolinha);

    // Função para animar a bolinha com física básica
    function animar() {
        t += deltaT;
        const x = posXInicial + vX * t;
        const y = posYInicial + vY * t + 0.5 * g * t * t;

        bolinha.style.left = x + 'px';
        bolinha.style.top = y + 'px';

        // Remove a bolinha se ela sair da tela e gera outra
        if (y > alturaTela + 100) {
        bolinha.remove();
        setTimeout(criarBolinha, 500);
        return;
        }

        requestAnimationFrame(animar);
    }

    // Quando o mouse passa por cima da bolinha, ela é removida e adiciona ponto
    bolinha.addEventListener('mouseenter', () => {
        bolinha.remove();
        validarEscolha(true, document.getElementById("pontos"));
        setTimeout(criarBolinha, 500);
    });

    animar(); // Inicia a animação
}

// Quando a página carregar, zera os pontos, inicia o cronômetro e a primeira bolinha
window.onload = () => {
    localStorage.setItem("pontos", 0);
    document.getElementById("pontos").textContent = localStorage.getItem("pontos");
    timer(document.getElementById("timer"));
    criarBolinha();
};
