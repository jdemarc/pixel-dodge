document.addEventListener('DOMContentLoaded', () => {
  /* ----- state variables ----- */
  let shipLeft = 220;
  let shipBottom = 100;
  let isGameOver = false;

  /* ----- cached element references ----- */
  const ship = document.querySelector('.ship');

  /* ----- event listeners ----- */
  document.addEventListener('keydown', control);

  /* ----- functions ----- */
  // function start() {
  //   ship.style.bottom = shipBottom + 'px';
  //   ship.style.left = shipLeft + 'px';
  // }

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
      if (shipLeft < 450) shipLeft += 10;
    } else if (direction === 'D') {
      if (shipBottom > 0) shipBottom -= 10;
    }

    ship.style.left = shipLeft + 'px';
    ship.style.bottom = shipBottom + 'px';

    console.log('S.left: ', shipLeft);
    console.log('S.bottom: ', shipBottom);
  }

})