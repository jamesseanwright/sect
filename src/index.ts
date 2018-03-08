import Game from './Game';
import ImageRenderSystem from './systems/ImageRenderSystem'; // TODO: aggregated entry point like Components/index.ts

const gameOutput: HTMLCanvasElement = document.body.querySelector('#game-output');
const gameContext = gameOutput.getContext('2d');

const game = new Game(
    new ImageRenderSystem(gameContext),
);
