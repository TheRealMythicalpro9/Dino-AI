// Get the canvas element and set up the drawing context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Dino parameters
const dino = {
    x: 50,
    y: canvas.height - 100,
    width: 50,
    height: 50,
    color: 'green',
    jumpSpeed: 10,
    gravity: 0.5,
    isJumping: false,
    velocityY: 0,
    moveSpeed: 5
};

// Ground parameters
const groundHeight = 50;

// Obstacle parameters
const obstacle = {
    x: canvas.width,
    y: canvas.height - groundHeight - 30,
    width: 30,
    height: 30,
    color: 'red',
    speed: 5
};

// Game state
let gameOver = false;

// Key states
const keys = {};

// Draw functions
function drawDino() {
    ctx.fillStyle = dino.color;
    ctx.fillRect(dino.x, dino.y, dino.width, dino.height);
}

function drawGround() {
    ctx.fillStyle = 'gray';
    ctx.fillRect(0, canvas.height - groundHeight, canvas.width, groundHeight);
}

function drawObstacle() {
    ctx.fillStyle = obstacle.color;
    ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
}

// Update functions
function updateObstacle() {
    obstacle.x -= obstacle.speed;
    if (obstacle.x < -obstacle.width) {
        obstacle.x = canvas.width;
        obstacle.y = canvas.height - groundHeight - 30;
    }
}

function updateDino() {
    if (dino.isJumping) {
        dino.velocityY -= dino.gravity;
        dino.y -= dino.velocityY;

        if (dino.y >= canvas.height - groundHeight - dino.height) {
            dino.y = canvas.height - groundHeight - dino.height;
            dino.isJumping = false;
            dino.velocityY = 0;
        }
    }

    // Move Dino left/right
    if (keys['ArrowLeft']) {
        dino.x -= dino.moveSpeed;
    }
    if (keys['ArrowRight']) {
        dino.x += dino.moveSpeed;
    }

    // Prevent Dino from going out of bounds
    if (dino.x < 0) {
        dino.x = 0;
    }
    if (dino.x + dino.width > canvas.width) {
        dino.x = canvas.width - dino.width;
    }
}

// Check for collisions
function checkCollision() {
    if (
        dino.x + dino.width > obstacle.x &&
        dino.x < obstacle.x + obstacle.width &&
        dino.y + dino.height > obstacle.y
    ) {
        gameOver = true;
    }
}

// Game loop
function gameLoop() {
    if (gameOver) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'black';
        ctx.font = '48px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Game Over', canvas.width / 2, canvas.height / 2);
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawGround();
    drawDino();
    drawObstacle();

    updateObstacle();
    updateDino();
    checkCollision();

    requestAnimationFrame(gameLoop);
}

// Control Dino
document.addEventListener('keydown', (e) => {
    keys[e.code] = true;
    if (e.code === 'Space' && !dino.isJumping && !gameOver) {
        dino.isJumping = true;
        dino.velocityY = dino.jumpSpeed;
    }
});

document.addEventListener('keyup', (e) => {
    keys[e.code] = false;
});

// Start the game
gameLoop();
