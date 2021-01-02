document.addEventListener('DOMContentLoaded', () => {
  /* ----- state variables ----- */
  let shipLeft = 200;
  let shipBottom = 50;
  let gravity = 2;
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

  // function control(e) {
  //   if (e.keyCode === 37) {
  //     // go left
  //     // move('L');
  //   } else if (e.keyCode === 38) {
  //     // go up
  //     // move('U');
  //   } else if (e.keyCode === 39) {
  //     // go right
  //     // move('R');
  //   } else if (e.keyCode === 40) {
  //     // go down
  //     move('D');
  //   }
  // }

  function control(e) {
    (e.keyCode === 37) ? move('L')
    : (e.keyCode === 38) ? move ('U')
    : (e.keyCode === 39) ? move ('R')
    : (e.keyCode === 40) ? move('D')
    : null;
  }

  function move(direction) {
    if (direction === 'D') {
      shipBottom -= 10;
      ship.style.bottom = shipBottom + 'px';
      console.log(shipBottom);
    }
  }

})