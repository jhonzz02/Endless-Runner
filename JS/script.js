// --- 1. SELEÇÃO DE ELEMENTOS ---
const player = document.getElementById("player");
const obstacle = document.getElementById("obstacle");

// --- 2. ESTADO DO JOGO (VARIÁVEIS DE CONTROLE) ---
let isJumping = false; // Bloqueia o pulo se o player já estiver no ar
let obstaclePosition = window.innerWidth; // Posição X inicial (canto direito da tela)
const obstacleWidth = 20; // Largura do obstáculo (definida no CSS)

// --- 3. LÓGICA DE VELOCIDADE E ACELERAÇÃO ---
let currentSpeed = 2; // Velocidade inicial (pixels por quadro)
const maxSpeed = window.innerWidth / 180; // Alvo: atravessar a tela em 3 segundos (60fps * 3s = 180)
const acceleration = 0.002; // O quanto a velocidade aumenta a cada quadro (renderização)

// --- 4. CONTROLE DE ENTRADA (TECLADO) ---
document.addEventListener("keydown", (e) => {
  // Verifica se a tecla é Espaço ou Seta para Cima e se não está pulando
  if ((e.code === "Space" || e.code === "ArrowUp") && !isJumping) {
    jump();
  }
});

// --- 5. FUNÇÃO DO PULO ---
function jump() {
  let position = 0; // Altura atual do player
  isJumping = true; // Ativa a trava de pulo

  // Sobe o player
  let upInterval = setInterval(() => {
    if (position >= 150) { // Altura máxima do pulo
      clearInterval(upInterval);

      // Desce o player (inicia quando a subida termina)
      let downInterval = setInterval(() => {
        if (position <= 0) { // Chegou no chão
          clearInterval(downInterval);
          isJumping = false; // Libera para pular novamente
        }
        position -= 5;
        player.style.bottom = position + "px";
      }, 20);
    }
    position += 5;
    player.style.bottom = position + "px";
  }, 20);
}

// --- 6. LOOP PRINCIPAL DO JOGO (O CORAÇÃO DO GAME) ---
function gameLoop() {
  // A. ACELERAÇÃO: Aumenta a velocidade até o limite máximo estabelecido
  if (currentSpeed < maxSpeed) {
    currentSpeed += acceleration;
  }

  // B. MOVIMENTAÇÃO: Subtrai a velocidade da posição atual do obstáculo
  obstaclePosition -= currentSpeed;

  // C. RESET: Se o obstáculo sumiu à esquerda, ele volta para a direita
  if (obstaclePosition < -obstacleWidth) {
    obstaclePosition = window.innerWidth;
  }

  // D. RENDERIZAÇÃO: Aplica a nova posição no estilo CSS do elemento
  obstacle.style.left = obstaclePosition + "px";

  // E. COLISÃO: Verifica se o player encostou no obstáculo
  checkCollision();

  // F. PRÓXIMO QUADRO: Pede ao navegador para rodar esta função novamente no próximo frame
  requestAnimationFrame(gameLoop);
}

// --- 7. DETECÇÃO DE COLISÃO ---
function checkCollision() {
  // Pega a altura real do player no momento (convertendo string "0px" para número 0)
  let playerBottom = parseInt(window.getComputedStyle(player).getPropertyValue("bottom"));
  
  // Usamos a variável 'obstaclePosition' que já temos no JS (mais preciso que ler o CSS)
  let obstacleLeft = obstaclePosition;

  /* Lógica da área de colisão:
     - Player está fixo no 'left: 50px' e tem 'width: 40px'. Logo, ele ocupa de 50 a 90.
     - Se o obstáculo entrar nesse intervalo horizontal (90 a 30 aprox.)
     - E se o player estiver abaixo da altura do obstáculo (40px)...
  */
  if (obstacleLeft < 90 && obstacleLeft > 30 && playerBottom < 40) {
    // Ação de Game Over
    console.log("Game Over! Reiniciando...");
    
    // Reset simples para o exemplo:
    obstaclePosition = window.innerWidth; // Manda o obstáculo para o fim
    currentSpeed = 2; // Reseta a velocidade
  }
}

// --- 8. INÍCIO DO JOGO ---
game