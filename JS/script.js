// --- 1. SELEÇÃO DE ELEMENTOS ---
const player = document.getElementById("player");
const obstacle = document.getElementById("obstacle");
const gameOverOverlay = document.getElementById("game-over");
const restartButton = document.getElementById("restart-btn");
const scoreLabel = document.getElementById("score");
const finalScoreLabel = document.getElementById("final-score");
const bestScoreLabel = document.getElementById("best-score");
const pauseMenu = document.getElementById("pause-menu");
const pauseScoreLabel = document.getElementById("pause-score");
const pauseBestScoreLabel = document.getElementById("pause-best");
const pauseRestartButton = document.getElementById("pause-restart-btn");
const pauseResumeButton = document.getElementById("pause-resume-btn");
const pauseCountdown = document.getElementById("pause-countdown");

let isGameOver = false;
let isPaused = false;

// --- 2. ESTADO DO JOGO (VARIÁVEIS DE CONTROLE) ---
let isJumping = false; // Bloqueia o pulo se o player já estiver no ar
let playerY = 0;          // Posição vertical do player (substitui o getComputedStyle)
let jumpVelocity = 0;     // Velocidade atual do pulo
const gravity = 0.6;      // Força que puxa o player para baixo
const jumpForce = -12;    // Força do impulso inicial do pulo
let obstaclePosition = window.innerWidth; // Posição X inicial (canto direito da tela)
const obstacleWidth = 20; // Largura do obstáculo (definida no CSS)

let score = 0; // Pontuação acumulada enquanto o jogador sobrevive e percorre
let bestScore = 0; // Recorde da sessão

// --- 3. LÓGICA DE VELOCIDADE E ACELERAÇÃO ---
let currentSpeed = 2; // Velocidade inicial (pixels por quadro)
const maxSpeed = window.innerWidth / 180; // Alvo: atravessar a tela em 3 segundos (60fps * 3s = 180)
const acceleration = 0.002; // O quanto a velocidade aumenta a cada quadro (renderização)

// --- 4. CONTROLE DE ENTRADA (TECLADO) ---
document.addEventListener("keydown", (e) => {
  if (e.code === "Escape") {
    // Toggle pause (só se não estiver em game over)
    if (!isGameOver) {
      if (isPaused) {
        startResumeCountdown();
      } else {
        pauseGame();
      }
    }
    return;
  }

  // Verifica se a tecla é Espaço ou Seta para Cima e se não está pulando nem em pausa
  if ((e.code === "Space" || e.code === "ArrowUp") && !isJumping && !isGameOver && !isPaused) {
    jump();
  }
});

restartButton.addEventListener("click", () => {
  restartGame();
});

pauseRestartButton.addEventListener("click", () => {
  if (confirm("Tem certeza que deseja reiniciar? O jogo foi pausado, não é Game Over.")) {
    pauseMenu.classList.add("hidden");
    pauseCountdown.classList.add("hidden");
    isPaused = false;
    restartGame();
  }
});

pauseResumeButton.addEventListener("click", () => {
  // Esconde imediatamente o menu de pausa e mostra somente a contagem
  pauseMenu.classList.add("hidden");
  startResumeCountdown();
});

// --- 5. FUNÇÃO DO PULO ---
function jump() {
  if (!isJumping) {
    jumpVelocity = jumpForce; // Dá o impulso inicial
    isJumping = true;
  }
}

// --- 6. LOOP PRINCIPAL DO JOGO (O CORAÇÃO DO GAME) ---
function gameLoop() {
  // Se estiver pausado ou final de jogo, não continua processando frames
  if (isGameOver || isPaused) {
    return;
  }

  // --- LÓGICA DO PULO (FÍSICA SIMPLES) ---
  if (isJumping) {
    playerY -= jumpVelocity; // Move o player com base na velocidade
    jumpVelocity += gravity; // A gravidade vai "freando" o pulo e puxando para baixo

    if (playerY <= 0) { // Se tocou o chão
      playerY = 0;
      isJumping = false;
      jumpVelocity = 0;
    }

    player.style.bottom = playerY + "px"; // Renderiza a altura
  }

  // A. ACELERAÇÃO: Aumenta a velocidade até o limite máximo estabelecido
  if (currentSpeed < maxSpeed) {
    currentSpeed += acceleration;
  }

  // B. MOVIMENTAÇÃO: Subtrai a velocidade da posição atual do obstáculo
  obstaclePosition -= currentSpeed;

  // Pontuação (score): acumula pelo deslocamento do obstáculo (progresso do jogo)
  // Usamos `currentSpeed` para que a pontuação aumente mais rápido à medida que a velocidade cresce.
  score += currentSpeed;
  scoreLabel.textContent = "Score: " + Math.floor(score);

  // C. RESET: Se o obstáculo sumiu à esquerda, ele volta para a direita
  if (obstaclePosition < -obstacleWidth) {
    obstaclePosition = window.innerWidth;
  }

  // D. RENDERIZAÇÃO: Aplica a nova posição no estilo CSS do elemento
  obstacle.style.left = obstaclePosition + "px";

  // E. COLISÃO: Verifica se o player encostou no obstáculo
  checkCollision();

  // F. PRÓXIMO QUADRO: Continua apenas se não for Game Over
  if (!isGameOver) {
    requestAnimationFrame(gameLoop);
  }
}

// --- 7. DETECÇÃO DE COLISÃO ---
function checkCollision() {
  // Usa a altura interna playerY em vez de getComputedStyle
  let playerBottom = playerY;

  // Usamos a variável 'obstaclePosition' que já temos no JS (mais preciso que ler o CSS)
  let obstacleLeft = obstaclePosition;

  /* Lógica da área de colisão:
     - Player está fixo no 'left: 50px' e tem 'width: 40px'. Logo, ele ocupa de 50 a 90.
     - Se o obstáculo entrar nesse intervalo horizontal (90 a 30 aprox.)
     - E se o player estiver abaixo da altura do obstáculo (40px)...
  */
  if (obstacleLeft < 90 && obstacleLeft > 30 && playerBottom < 40) {
    endGame();
    return;
  }
}

function endGame() {
  // Marca fim de jogo para bloquear ação contínua de loop e input
  isGameOver = true;
  gameOverOverlay.classList.remove("hidden");

  // Atualiza placar final e recorde na tela de Game Over
  const roundedScore = Math.floor(score);
  finalScoreLabel.textContent = "Game Over - Score: " + roundedScore;

  if (roundedScore > bestScore) {
    bestScore = roundedScore; // atualiza recorde (high score) se necessário
  }
  bestScoreLabel.textContent = "High Score: " + bestScore;
}

function pauseGame() {
  if (isGameOver || isPaused) {
    return;
  }

  isPaused = true;
  pauseMenu.classList.remove("hidden");
  pauseScoreLabel.textContent = "Score: " + Math.floor(score);
  pauseBestScoreLabel.textContent = "High Score: " + bestScore;
  pauseCountdown.classList.add("hidden");
}

function startResumeCountdown() {
  if (!isPaused) {
    return;
  }

  let count = 3;
  pauseCountdown.classList.remove("hidden");
  pauseCountdown.textContent = "Retomando em " + count + "...";

  const countdownInterval = setInterval(() => {
    count -= 1;
    if (count > 0) {
      pauseCountdown.textContent = "Retomando em " + count + "...";
    } else {
      clearInterval(countdownInterval);
      pauseCountdown.classList.add("hidden");
      isPaused = false;
      requestAnimationFrame(gameLoop);
    }
  }, 1000);
}

function restartGame() {
  // Clique em restart: esconde overlay e reinicia o loop
  isGameOver = false;
  isPaused = false;
  gameOverOverlay.classList.add("hidden");
  pauseMenu.classList.add("hidden");

  // Reset completo de estado do jogo para começar do zero
  obstaclePosition = window.innerWidth;
  currentSpeed = 2;
  playerY = 0;
  jumpVelocity = 0;
  isJumping = false;
  score = 0;
  player.style.bottom = "0px";
  scoreLabel.textContent = "Score: 0";

  requestAnimationFrame(gameLoop);
}

// --- 8. INÍCIO DO JOGO ---
gameLoop();