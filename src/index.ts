import Game from './Game';
import CanvasRenderSystem from './systems/CanvasRenderSystem'; // TODO: aggregated entry point like Components/index.ts

const gameOutput: HTMLCanvasElement = document.body.querySelector('#game-output');
const gameContext = gameOutput.getContext('2d');

const game = new Game(
    new CanvasRenderSystem(gameContext),
);
