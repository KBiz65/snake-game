const canvas = document.getElementById('game-canvas');
const canvasContext = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score-number');
let snakeX = 400;
let snakeY = 400;
const snakeBodySize = 10;
let snakeSpeed = 20;
let snakeSpeedPositive = true;
let movingOnX = true;
let movingOnY = false;
let snakeBody = [{ x: snakeX, y: snakeY }];
let appleCount = 0;
const appleSize = 10;
let appleX = getRandomX();
let appleY = getRandomY();
let isGameOver = false;

startGame();

function startGame() {
  const framesPerSecond = 10;
  setInterval(function () {
    if (!isGameOver) {
      drawGame();
      gameMovement();
      drawApple();
    }
  }, 1000 / framesPerSecond);
}

document.addEventListener('keydown', getKeypress);

function getKeypress(e) {
  console.log(e.keyCode);
  if (e.key === 'ArrowUp') {
    movingOnX = false;
    movingOnY = true;
    if (snakeSpeedPositive) {
      snakeSpeed = -snakeSpeed;
      snakeSpeedPositive = false;
    }
  }
  
  else if (e.key === 'ArrowDown') {
    movingOnX = false;
    movingOnY = true;
    if (!snakeSpeedPositive) {
      snakeSpeed = -snakeSpeed;
      snakeSpeedPositive = true;
    }
  }
  
  else if (e.key === 'ArrowLeft') {
    movingOnX = true;
    movingOnY = false;
    if (snakeSpeedPositive) {
      snakeSpeed = -snakeSpeed;
      snakeSpeedPositive = false;
    }
  }
  
  else if (e.key === 'ArrowRight') {
    console.log("recognized code for arrow right");
    movingOnX = true;
    movingOnY = false;
    if (!snakeSpeedPositive) {
      snakeSpeed = -snakeSpeed;
      snakeSpeedPositive = true;
    }
  }

  else if (e.key == " ") {
    console.log("recognized code 32 - running code");
    location.reload();
  }
}

function drawGame() {
  colorRectangle(0, 0, canvas.width, canvas.height, "#092b00");
}

function gameMovement() {
  if (!isGameOver) {
    moveSnake();
    drawSnake();
  } else {
    gameOver();
    }
  }

function moveSnake() {
  for (let i = 1; i < snakeBody.length; i++) {
    if (snakeBody[0]["x"] === snakeBody[i]["x"] && snakeBody[0]["y"] === snakeBody[i]["y"]) {
      gameOver();
    }
  }

  if (movingOnX) {
    if (snakeX >= 0 + snakeBodySize && snakeX <= canvas.width - snakeBodySize) {
      snakeBody.unshift({ x: snakeX + snakeSpeed, y: snakeY });
      snakeX += snakeSpeed;
    }
  }

  if (movingOnY) {
    if (snakeY >= 0 + snakeBodySize && snakeY <= canvas.height - snakeBodySize) {
      snakeBody.unshift({ x: snakeX, y: snakeY + snakeSpeed });
      snakeY += snakeSpeed;
    }
  }

  snakeBody = snakeBody.slice(0, appleCount+1);
    
  if (snakeBody[0]["x"] === appleX && snakeBody[0]["y"] === appleY) {
    updateScore();
  }

  if (snakeX <= 0 || snakeY <= 0 || snakeX >= canvas.width - snakeBodySize || snakeY >= canvas.height - snakeBodySize) {
    gameOver();
  }
}

function drawSnake() {
  for (i = 0; i < snakeBody.length; i++) {
    colorCircle(snakeBody[i]["x"], snakeBody[i]["y"], snakeBodySize, "lightgreen");
  }
}

function getRandomX() {
  randomX = Math.floor(Math.random() * (900 / 10)) * 10;
  if ((randomX / 10) % 2 !== 0 || randomX === 0) {
    getRandomX();
  }
  return randomX;
}

function getRandomY() {
  randomY = Math.floor(Math.random() * (600 / 10)) * 10;
  if ((randomY / 10) % 2 !== 0 || randomY === 0) {
    getRandomY();
  }
  return randomY;
}

function drawApple() {
  colorCircle(appleX, appleY, appleSize, "red");
}

function newAppleXY() {
  appleX = getRandomX();
  appleY = getRandomY();
  colorCircle(appleX, appleY, appleSize, "red");
}

function updateScore() {
    appleCount++;
    scoreDisplay.textContent = "0".repeat([10 - (appleCount.toString).length]) + appleCount.toString();
    newAppleXY();
}

function gameOver() {
  canvasContext.fillStyle = 'white';
  canvasContext.fillText("Game over", 425, 300);
  canvasContext.fillText("Press spacebar to try again", 390, 320);
  isGameOver = true;
}

function colorRectangle(leftX, topY, width, height, drawColor) {
  canvasContext.fillStyle = drawColor;
  canvasContext.fillRect(leftX, topY, width, height);
}

function colorCircle(centerX, centerY, radius, drawColor) {
  canvasContext.fillStyle = drawColor;
  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
  canvasContext.fill();
}