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
      if (shipLeft > 0) shipLeft -= 10;
    } else if (direction === 'U') {
      if (shipBottom < 550) shipBottom += 10;
    } else if (direction === 'R') {
      if (shipLeft < 410) shipLeft += 10;
    } else if (direction === 'D') {
      if (shipBottom > 0) shipBottom -= 10;
    }

    ship.style.left = shipLeft + 'px';
    ship.style.bottom = shipBottom + 'px';

    console.log('S.left: ', shipLeft);
    console.log('S.bottom: ', shipBottom);
  }

  function generateObstacle() {
    let obstacleBottom = 600;
    let lateralRandom = Math.random() * 275;
    let obstacleLeft = lateralRandom;

    const obstacle = document.createElement('div');

    if (!isGameOver) {
      obstacle.classList.add('obstacle');
    }

    gameContainer.appendChild(obstacle);

    obstacle.style.left = obstacleLeft + 'px';
    obstacle.style.bottom = obstacleBottom + 'px';

    function moveObstacle() {
      obstacleBottom -= 15;
      obstacle.style.bottom = obstacleBottom + 'px';

      // When the obstacle reaches the bottom of the screen, clear its timer and remove it from game container.
      if (obstacleBottom <= 0) {
        clearInterval(obstacleTimer);
        gameContainer.removeChild(obstacle);
        score++;

        // console.log(score);
      }

      // If the ship comes in contact with the pixel, game over and clear timer(s).
      if (obstacleBottom <= shipBottom + 50 && obstacleBottom >= shipBottom - 25 &&
         obstacleLeft + 26 >= shipLeft && obstacleLeft <= shipLeft + 50 ||
         shipBottom === 0 ||
         shipBottom === 550 ||
         shipLeft === 0 ||
         shipLeft === 250

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
    addGameOverElements();

    clearInterval(gameTimerId);
    isGameOver = true;
    document.removeEventListener('keydown', control);
  }

  function addGameOverElements() {
    const gameOverEl = document.createElement('div');
    gameOverEl.classList.add('game-over');
    gameOverEl.innerHTML = 'GAME OVER';
    gameContainer.appendChild(gameOverEl);

    const replayEl = document.createElement('button');
    replayEl.classList.add('replay');
    replayEl.textContent = 'Replay';
    gameContainer.appendChild(replayEl);

    replayEl.addEventListener('click', replay);

  }

  function replay() {

  }

})