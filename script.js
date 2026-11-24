const canvas = document.getElementById('meuCanvas');
const ctx = canvas.getContext('2d');

const objetos = [
    { tipo: 'circulo', x: 120, y: 100, raio: 30, dx: 3.5, dy: 2.5, matiz: 0 },
    { tipo: 'circulo', x: 450, y: 250, raio: 45, dx: -2.8, dy: 3.2, matiz: 120 },
    { tipo: 'retangulo', x: 300, y: 150, largura: 65, altura: 65, dx: 2.2, dy: -3.0, matiz: 240 }
];

function desenharObjetos() {
    objetos.forEach(obj => {
        // Crases (template literal) para a cor mudar conforme obj.matiz
        ctx.fillStyle = `hsl(${obj.matiz}, 80%, 55%)`;

        if (obj.tipo === 'circulo') {
            ctx.beginPath();
            ctx.arc(obj.x, obj.y, obj.raio, 0, Math.PI * 2);
            ctx.fill();
            ctx.closePath();
        } else if (obj.tipo === 'retangulo') {
            ctx.fillRect(obj.x, obj.y, obj.largura, obj.altura);
        }
    });
}

function atualizarPropriedades() {
    objetos.forEach(obj => {
        obj.x += obj.dx;
        obj.y += obj.dy;

        // Incrementa a matiz para mudar de cor continuamente
        obj.matiz = (obj.matiz + 1.5) % 360;

        if (obj.tipo === 'circulo') {
            if (obj.x + obj.raio > canvas.width || obj.x - obj.raio < 0) obj.dx = -obj.dx;
            if (obj.y + obj.raio > canvas.height || obj.y - obj.raio < 0) obj.dy = -obj.dy;
        } else if (obj.tipo === 'retangulo') {
            if (obj.x + obj.largura > canvas.width || obj.x < 0) obj.dx = -obj.dx;
            if (obj.y + obj.altura > canvas.height || obj.y < 0) obj.dy = -obj.dy;
        }
    });
}

function animar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    desenharObjetos();
    atualizarPropriedades();
    requestAnimationFrame(animar);
}

canvas.addEventListener('click', () => {
    objetos.forEach(obj => {
        obj.matiz = Math.floor(Math.random() * 360);
        obj.dx = -obj.dx;
    });
});

animar();