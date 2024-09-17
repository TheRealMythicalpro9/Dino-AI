// Basic setup for the Dino game
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);

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
    velocityY: 0
};

// Ground parameters
const groundHeight = 50;

// Draw functions
function drawDino() {
    ctx.fillStyle = dino.color;
    ctx.fillRect(dino.x, dino.y, dino.width, dino.height);
}

function drawGround() {
    ctx.fillStyle = 'gray';
    ctx.fillRect(0, canvas.height - groundHeight, canvas.width, groundHeight);
}

// Game loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGround();
    drawDino();

    if (dino.isJumping) {
        dino.velocityY -= dino.gravity;
        dino.y -= dino.velocityY;

        if (dino.y >= canvas.height - groundHeight - dino.height) {
            dino.y = canvas.height - groundHeight - dino.height;
            dino.isJumping = false;
            dino.velocityY = 0;
        }
    }

    requestAnimationFrame(gameLoop);
}

gameLoop();

// Control Dino
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && !dino.isJumping) {
        dino.isJumping = true;
        dino.velocityY = dino.jumpSpeed;
    }
});
