const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// Пташка
let birdX = 50;
let birdY = 200;
let gravity = 0.4;
let velocity = 0;
let jump = -7;

// Труби
let pipes = [];
let pipeGap = 120;
let pipeWidth = 50;

// Очки
let score = 0;

// Створити першу трубу
function newPipe() {
    let topHeight = Math.random() * (canvas.height - pipeGap - 50) + 20;
    pipes.push({
        x: canvas.width,
        top: topHeight,
        bottom: topHeight + pipeGap
    });
}
newPipe();

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Рух пташки
    velocity += gravity;
    birdY += velocity;

    ctx.fillStyle = "yellow";
    ctx.beginPath();
    ctx.arc(birdX, birdY, 12, 0, Math.PI * 2);
    ctx.fill();

    // Труби
    for (let i = 0; i < pipes.length; i++) {
        pipes[i].x -= 2;

        ctx.fillStyle = "green";
        ctx.fillRect(pipes[i].x, 0, pipeWidth, pipes[i].top);
        ctx.fillRect(pipes[i].x, pipes[i].bottom, pipeWidth, canvas.height);

        // Столкуння
        if (
            birdX + 10 > pipes[i].x &&
            birdX - 10 < pipes[i].x + pipeWidth &&
            (birdY - 10 < pipes[i].top || birdY + 10 > pipes[i].bottom)
        ) {
            location.reload();
        }

        // Видаляємо стару трубу + додаємо нову
        if (pipes[i].x + pipeWidth < 0) {
            pipes.splice(i, 1);
            score++;
            newPipe();
        }
    }

    // Вихід за межі
    if (birdY > canvas.height || birdY < 0) {
        location.reload();
    }

    // Очки
    ctx.fillStyle = "white";
    ctx.font = "24px Arial";
    ctx.fillText("Бал: " + score, 10, 30);

    requestAnimationFrame(update);
}

update();

// Управління
document.addEventListener("keydown", () => velocity = jump);
document.addEventListener("click", () => velocity = jump);
