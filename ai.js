const obstacle = {
    x: canvas.width,
    y: canvas.height - groundHeight - 30,
    width: 30,
    height: 30,
    color: 'red'
};

// Draw obstacle
function drawObstacle() {
    ctx.fillStyle = obstacle.color;
    ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
}

// Update obstacle position
function updateObstacle() {
    obstacle.x -= 5;
    if (obstacle.x < -obstacle.width) {
        obstacle.x = canvas.width;
    }
}

// Modify game loop to include obstacle and AI
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGround();
    drawDino();
    drawObstacle();
    updateObstacle();

    // AI: simple rule-based
    if (dino.x + dino.width > obstacle.x && dino.x < obstacle.x + obstacle.width && !dino.isJumping) {
        dino.isJumping = true;
        dino.velocityY = dino.jumpSpeed;
    }

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
