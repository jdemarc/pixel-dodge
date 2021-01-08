document.addEventListener('DOMContentLoaded', () => {
  /* ----- state variables ----- */
  let shipLeft = 130;
  let shipBottom = 100;
  let isGameOver = false;
  let score = 0;

  /* ----- cached element references ----- */
  const ship = document.querySelector('.ship');
  const gameContainer = document.querySelector('.game-container');

  /* ----- event listeners ----- */
  document.addEventListener('keydown', control);

  /* ----- functions ----- */
  startGame();

  // Initialize ship position.
  function startGame() {
    isGameOver = false;
    ship.style.bottom = shipBottom + 'px';
    ship.style.left = shipLeft + 'px';
  }

  let gameTimerId = setInterval(startGame, 20);

  function control(e) {
    (e.keyCode === 37) ? move('L')
    : (e.keyCode === 38) ? move ('U')
    : (e.keyCode === 39) ? move ('R')
    : (e.keyCode === 40) ? move('D')
    : null;
  }

  function move(direction) {
    if (direction === 'L') {
      if (shipLeft > 0) shipLeft -= 13;
    } else if (direction === 'U') {
      if (shipBottom < 550) shipBottom += 13;
    } else if (direction === 'R') {
      if (shipLeft < 247) shipLeft += 13;
    } else if (direction === 'D') {
      if (shipBottom > 9) shipBottom -= 13;
    }

    ship.style.left = shipLeft + 'px';
    ship.style.bottom = shipBottom + 'px';

    console.log('S.left: ', shipLeft);
    console.log('S.bottom: ', shipBottom);
  }

  function generateObstacle() {

    // Obstacle 1
    let obstacleBottom = 550;
    let lateralRandom = Math.random() * 275;
    let obstacleLeft = lateralRandom;
    // let obstacleLeft = 117;

    const obstacle = document.createElement('div');

    if (!isGameOver) {
      obstacle.classList.add('obstacle');
    }

    gameContainer.appendChild(obstacle);

    obstacle.style.left = obstacleLeft + 'px';
    obstacle.style.bottom = obstacleBottom + 'px';

    function moveObstacle() {
      obstacleBottom -= 10;
      obstacle.style.bottom = obstacleBottom + 'px';

      // When the obstacle reaches the bottom of the screen, clear its timer and remove it from game container.
      if (obstacleBottom <= 0) {
        clearInterval(obstacleTimer);
        gameContainer.removeChild(obstacle);
        score++;

        // console.log(score);
      }

      // 600 x 300

      // If the ship comes in contact with the obstacle, game over and clear timer(s).
      if (obstacleBottom <= shipBottom + 50 && obstacleBottom >= shipBottom - 25 &&
         obstacleLeft + 24 >= shipLeft && obstacleLeft <= shipLeft + 50
        ) {
        console.log('touch');
        gameOver();

        // Stop obstacle from moving.
        clearInterval(obstacleTimer);
      }
    }

    let obstacleTimer = setInterval(moveObstacle, 20);

    // Continue to generate obstacles if the game is playing.
    if (!isGameOver) setTimeout(generateObstacle, 2000);
  }

  generateObstacle();

  function gameOver() {
    addGameOverElement();
    clearInterval(gameTimerId);
    isGameOver = true;
    document.removeEventListener('keydown', control);
  }

  function addGameOverElement() {
    const gameOverEl = document.createElement('div');
    gameOverEl.classList.add('game-over');
    gameOverEl.innerHTML = 'GAME OVER';
    gameContainer.appendChild(gameOverEl);

    const replayEl = document.createElement('div');
    replayEl.classList.add('replay');
    replayEl.innerHTML = 'AGAIN?';
    gameContainer.appendChild(replayEl);

    // Reload page on click.
    replayEl.addEventListener('click', () => {
      document.location.href = '';
    });
  }

})