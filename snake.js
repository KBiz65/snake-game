const canvas = document.getElementById('game-canvas');
const canvasContext = canvas.getContext('2d');
let snakePositionX = 450;
let snakePositionY = 300;
const snakeBodySize = 10;
let snakeSpeed = 10;
let snakeSpeedPositive = true;
let movingOnX = true;
let movingOnY = false;
let snakeBodyArray = [{ x: snakePositionX, y: snakePositionY }];
let appleCount = 0;

window.onload = function () {
  const framesPerSecond = 10;
  setInterval(function () {
    drawGame();
    gameMovement();
  }, 1000 / framesPerSecond);
}

window.addEventListener('keydown', checkKey);

function gameMovement() {
  if (movingOnX) {
    if (snakePositionX >= 0+snakeBodySize && snakePositionX <= canvas.width-snakeBodySize) {
      snakePositionX += snakeSpeed;
      updateSnakeBodyArray();
      drawSnake();
    } else {
      canvasContext.fillStyle = 'white';
      canvasContext.fillText("Game over", 425, 300);
      return;
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
      canvasContext.fillStyle = 'white';
      canvasContext.fillText("Game over", 425, 300);
      return
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
  console.log("drawSnake function called");
  for (i = 0; i < snakeBodyArray.length; i++) {
    console.log(snakeBodyArray[i]["x"]);
    snakePositionX = snakeBodyArray[i]["x"];
    snakePositionY = snakeBodyArray[i]["y"];
    colorCircle(snakePositionX, snakePositionY, snakeBodySize, "lightgreen");
  }
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
