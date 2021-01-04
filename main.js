document.addEventListener('DOMContentLoaded', () => {
  /* ----- state variables ----- */
  let shipLeft = 230;
  let shipBottom = 100;
  let isGameOver = false;

  /* ----- cached element references ----- */
  const ship = document.querySelector('.ship');
  const gameContainer = document.querySelector('.game-container');

  /* ----- event listeners ----- */
  document.addEventListener('keydown', control);

  /* ----- functions ----- */
  // start();

  // Initialize ship position.
  function startGame() {
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

    // console.log('S.left: ', shipLeft);
    // console.log('S.bottom: ', shipBottom);
  }

  function generateObstacle() {
    let obstacleBottom = 200;
    // let lateralRandom = Math.random() * 60;
    let obstacleLeft = 225;

    const obstacle = document.createElement('div');

    obstacle.classList.add('obstacle');

    gameContainer.appendChild(obstacle);

    obstacle.style.left = obstacleLeft + 'px';
    obstacle.style.bottom = obstacleBottom + 'px';

    function moveObstacle() {
      // obstacleBottom -= 2;
      obstacle.style.bottom = obstacleBottom + 'px';

      // When the obstacle reaches the bottom of the screen, clear its timer and remove it from game container.

      if (obstacleBottom < 0) {
        clearInterval(obstacleTimer);
        gameContainer.removeChild(obstacle);
      }

      // If the ship comes in contact with the pixel, game over and clear timer(s).

      if (obstacleBottom <= shipBottom + 50 && obstacleBottom >= shipBottom - 25 &&
         obstacleLeft + 26 >= shipLeft && obstacleLeft <= shipLeft + 50 ||
         shipBottom === 0 ||
         shipBottom === 550 ||
         shipLeft === 0 ||
         shipLeft === 410

        )
      {
        console.log('touch');
        //gameOver();
      //  clearInterval(obstacleTimer);
      }

    }

    let obstacleTimer = setInterval(moveObstacle, 20);
  }

  generateObstacle();

  function gameOver() {
    clearInterval(gameTimerId);
    isGameOver = true;
  }

})