const gameContainer = document.querySelector('.game-container');
const paddle = document.querySelector('.paddle');
const ball = document.querySelector('.ball');
const blocksContainer = document.querySelector('.blocks');
const scoreDisplay = document.getElementById('score');
let score = 0;

// Constants
const blockWidth = 100;
const blockHeight = 20;
const ballDiameter = 20;
const containerWidth = 800;
const containerHeight = 500;

// Paddle movement
let paddleLeft = 350;
const paddleSpeed = 10;

// Ball movement
let ballLeft = 390;
let ballBottom = 40;
let ballDirectionX = 2;
let ballDirectionY = 2;

// Create blocks
function createBlocks() {
    for (let i = 0; i < 15; i++) {
        const block = document.createElement('div');
        block.classList.add('block');
        block.style.left = `${(i % 8) * (blockWidth + 10) + 15}px`;
        block.style.top = `${Math.floor(i / 8) * (blockHeight + 10) + 20}px`;
        blocksContainer.appendChild(block);
    }
}
createBlocks();

// Move paddle
function movePaddle(e) {
    if (e.key === 'ArrowLeft' && paddleLeft > 0) {
        paddleLeft -= paddleSpeed;
    } else if (e.key === 'ArrowRight' && paddleLeft < (containerWidth - blockWidth)) {
        paddleLeft += paddleSpeed;
    }
    paddle.style.left = `${paddleLeft}px`;
}

document.addEventListener('keydown', movePaddle);

// Move ball
function moveBall() {
    ballLeft += ballDirectionX;
    ballBottom += ballDirectionY;
    ball.style.left = `${ballLeft}px`;
    ball.style.bottom = `${ballBottom}px`;

    // Ball collision with walls
    if (ballLeft <= 0 || ballLeft >= (containerWidth - ballDiameter)) {
        ballDirectionX *= -1;
    }
    if (ballBottom >= (containerHeight - ballDiameter)) {
        ballDirectionY *= -1;
    }

    // Ball collision with paddle
    if (
        ballBottom <= 30 &&
        ballLeft + ballDiameter >= paddleLeft &&
        ballLeft <= paddleLeft + blockWidth
    ) {
        ballDirectionY *= -1;
    }

    // Ball collision with blocks
    document.querySelectorAll('.block').forEach(block => {
        const blockRect = block.getBoundingClientRect();
        const ballRect = ball.getBoundingClientRect();
        if (
            ballRect.left < blockRect.right &&
            ballRect.right > blockRect.left &&
            ballRect.top < blockRect.bottom &&
            ballRect.bottom > blockRect.top
        ) {
            block.remove();
            score++;
            scoreDisplay.textContent = score;
            ballDirectionY *= -1;
        }
    });

    // Game over
    if (ballBottom <= 0) {
        clearInterval(ballInterval);
        alert('Game Over!');
    }
}

const ballInterval = setInterval(moveBall, 20);
