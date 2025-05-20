// Pega o canvas da tela e o contexto 2D para desenhar
const canvas = document.getElementById('rastro');
const ctx = canvas.getContext('2d');

// Define a largura e altura do canvas para ocupar toda a tela
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Atualiza o tamanho do canvas se a tela for redimensionada
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Lista que armazena os pontos do rastro
let pontos = [];

// Captura o movimento do mouse e adiciona a posição atual à lista
document.addEventListener('mousemove', e => {
    const pos = {
        x: e.clientX,
        y: e.clientY,
        time: Date.now() // salva o tempo para controlar a duração do ponto
    };
    pontos.push(pos);

    // Mantém apenas os pontos com menos de 300ms (para o rastro sumir com o tempo)
    pontos = pontos.filter(p => Date.now() - p.time < 300);
});

// Função responsável por desenhar o rastro no canvas
function desenharRastro() {
    // Limpa o canvas a cada frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Desenha uma linha entre os pontos, com transparência baseada no tempo
    for (let i = 0; i < pontos.length - 1; i++) {
        const p1 = pontos[i];
        const p2 = pontos[i + 1];

        // Calcula a transparência do ponto com base no tempo de vida
        const alpha = 1 - (Date.now() - p1.time) / 300;

        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`; // cor branca com alpha
        ctx.lineWidth = 8;
        ctx.lineCap = 'round';

        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
    }

    // Continua desenhando no próximo frame
    requestAnimationFrame(desenharRastro);
}

// Inicia a renderização do rastro
desenharRastro();