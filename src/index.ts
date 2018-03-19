import { ImageRenderable } from './components';
import Game from './Game';
import ImageRenderSystem from './systems/ImageRenderSystem'; // TODO: aggregated entry point like Components/index.ts
import systemRegistry from './systems/systemRegistry';

const gameOutput: HTMLCanvasElement = document.body.querySelector('#game-output');
const gameContext = gameOutput.getContext('2d');

systemRegistry.set(ImageRenderable, new ImageRenderSystem(gameContext));

const game = new Game(systemRegistry);

game.start();
