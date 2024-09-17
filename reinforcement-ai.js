// Q-Learning parameters
const stateSpace = 10; // Number of states (simplified)
const actionSpace = 2; // Number of actions (jump, do nothing)
const qTable = Array.from({ length: stateSpace }, () => Array(actionSpace).fill(0));
const learningRate = 0.1;
const discountFactor = 0.9;
const explorationRate = 0.1;

function getState() {
    // Simplify state as distance to obstacle
    return Math.floor((obstacle.x - dino.x) / 100); // Simplified state
}

function chooseAction(state) {
    if (Math.random() < explorationRate) {
        return Math.floor(Math.random() * actionSpace); // Exploration
    } else {
        return qTable[state].indexOf(Math.max(...qTable[state])); // Exploitation
    }
}

function updateQTable(state, action, reward, nextState) {
    const bestNextAction = qTable[nextState].indexOf(Math.max(...qTable[nextState]));
    qTable[state][action] += learningRate * (reward + discountFactor * qTable[nextState][bestNextAction] - qTable[state][action]);
}

function getReward() {
    if (dino.x + dino.width > obstacle.x && dino.x < obstacle.x + obstacle.width) {
        return dino.y > obstacle.y ? -1 : 1; // Negative if colliding, positive if jumping over
    }
    return 0; // Neutral reward if no collision
}

// Modify game loop to include Q-Learning
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGround();
    drawDino();
    drawObstacle();
    updateObstacle();

    const state = getState();
    const action = chooseAction(state);

    if (action === 0) { // Jump
        if (!dino.isJumping) {
            dino.isJumping = true;
            dino.velocityY = dino.jumpSpeed;
        }
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

    const nextState = getState();
    const reward = getReward();
    updateQTable(state, action, reward, nextState);

    requestAnimationFrame(gameLoop);
}

gameLoop();
