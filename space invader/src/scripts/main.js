import Game from './game';

const init = () => {
  const canvas = document.getElementById("stars");
  const game = new Game(canvas);

  document.getElementById("nouvelleSoucoupe").addEventListener("click", () => {
    game.addSaucer();
    document.activeElement.blur();
  });
  document.getElementById("flotteSoucoupes").addEventListener("click", () => {
    setInterval(() => game.addSaucer(), 1000);
    document.activeElement.blur();
  });

  window.addEventListener('keydown', (event) => {
    game.handleKeyDown(event);
  });
  window.addEventListener('keyup', (event) => {
    game.handleKeyUp(event);
  });

  game.animate();
}

window.addEventListener("load", init);