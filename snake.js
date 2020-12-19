const canvas = document.getElementById('game-canvas');
const canvasContext = canvas.getContext('2d');
let snakePositionX = 460;
let snakePositionY = 300;
const snakeBodySize = 10;
let snakeSpeed = 10;
let snakeSpeedPositive = true;
let movingOnX = true;
let movingOnY = false;
let snakeBodyArray = [{ x: snakePositionX, y: snakePositionY }];
let appleCount = 0;
const appleSize = 10;
let applePositionX = 0;
let applePositionY = 0;

window.onload = function () {
  const framesPerSecond = 10;
  setInterval(function () {
    drawGame();
    gameMovement();
    drawApple();
  }, 2000 / framesPerSecond);
}

document.addEventListener('keydown', checkKey);

function gameMovement() {
  if (movingOnX) {
    console.log("snakePositionX: ", snakePositionX);
    console.log("snakePositionY: ", snakePositionY);
    if (snakePositionX >= 0+snakeBodySize && snakePositionX <= canvas.width-snakeBodySize) {
      snakePositionX += snakeSpeed;
      updateSnakeBodyArray();
      drawSnake();
    } else {
      gameOver();
    }
  }
  if (movingOnY) {
    console.log("snakePositionX: ", snakePositionX);
    console.log("snakePositionY: ", snakePositionY);
    if (snakePositionY >= 0 + snakeBodySize && snakePositionY <= canvas.height - snakeBodySize) {
      snakePositionY += snakeSpeed;
      updateSnakeBodyArray();
      drawSnake();
    } else {
      gameOver();
    }
  }
}

function drawGame() {
  colorRectangle(0, 0, canvas.width, canvas.height, "#092b00");
}

function updateSnakeBodyArray() {
  if (movingOnX) { 
    snakeBodyArray.unshift({ x: snakePositionX + snakeSpeed, y: snakePositionY });
  }

  if (movingOnY) {
    snakeBodyArray.unshift({ x: snakePositionX, y: snakePositionY + snakeSpeed });
  }
  snakeBodyArray = snakeBodyArray.slice(0, appleCount+1);
}

function drawSnake() {
  for (i = 0; i < snakeBodyArray.length; i++) {
    snakePositionX = snakeBodyArray[i]["x"];
    snakePositionY = snakeBodyArray[i]["y"];
    colorCircle(snakePositionX, snakePositionY, snakeBodySize, "lightgreen");
  }
}

function getRandomXY() {
  applePositionX = Math.floor(Math.random() * (900 / 10)) * 10;
  applePositionY = Math.floor(Math.random() * (600 / 10)) * 10;
  
}

function drawApple() {
  if (applePositionX === 0 && applePositionY === 0) {
    getRandomXY()
  }
  colorCircle(applePositionX, applePositionY, appleSize, "red");
}

function checkKey(e) {
  console.log(e.key);
  if (e.key === 'ArrowUp') {
    movingOnX = false;
    movingOnY = true;
    if (snakeSpeedPositive) {
      snakeSpeed = -snakeSpeed;
      snakeSpeedPositive = false;
    }
    drawSnake();
  }

  else if (e.key === 'ArrowDown') {
    movingOnX = false;
    movingOnY = true;
    if (!snakeSpeedPositive) {
      snakeSpeed = -snakeSpeed;
      snakeSpeedPositive = true;
    }
    drawSnake();
  }

  else if (e.key === 'ArrowLeft') {
    movingOnX = true;
    movingOnY = false;
    if (snakeSpeedPositive) {
      snakeSpeed = -snakeSpeed;
      snakeSpeedPositive = false;
    }
    drawSnake();
  }

  else if (e.key === 'ArrowRight') {
    movingOnX = true;
    movingOnY = false;
    if (!snakeSpeedPositive) {
      snakeSpeed = -snakeSpeed;
      snakeSpeedPositive = true;
    }
    drawSnake();
  }
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

function gameOver() {
  canvasContext.fillStyle = 'white';
  canvasContext.fillText("Game over", 425, 300);
  return;
}
