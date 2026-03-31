let isJumping = false;

document.addEventListener("keydown", () => {
  if (!isJumping) jump();
});

function jump() {
  let position = 0;
  isJumping = true;

  let upInterval = setInterval(() => {
    if (position >= 100) {
      clearInterval(upInterval);

      let downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        }
        position -= 5;
        player.style.bottom = position + "px";
      }, 20);
    }

    position += 5;
    player.style.bottom = position + "px";
  }, 20);
}

let obstaclePosition = 600;

function moveObstacle() {
  obstaclePosition -= 5;

  if (obstaclePosition < -20) {
    obstaclePosition = 600;
  }

  obstacle.style.left = obstaclePosition + "px";
}

setInterval(() => {
  moveObstacle();
  checkCollision();
}, 20);

function checkCollision() {
  let playerBottom = parseInt(window.getComputedStyle(player).getPropertyValue("bottom"));
  let obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue("left"));

  if (obstacleLeft < 90 && obstacleLeft > 50 && playerBottom < 40) {
    alert("Game Over");
  }
}