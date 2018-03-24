import { ImageRenderable } from './components';
import Game from './Game';
import ImageRenderSystem from './systems/ImageRenderSystem';
import SystemRegistry from './systems/SystemRegistry';
import createEntityBinder from './entities/entityBinder';
import EntityPool from './entities/entityPool';
import createAlien from './entities/alien';

const systemRegistry = new SystemRegistry();
const gameOutput: HTMLCanvasElement = document.body.querySelector('#game-output');
const gameContext = gameOutput.getContext('2d');

systemRegistry.set(ImageRenderable, new ImageRenderSystem(gameContext));

const bindEntity = createEntityBinder(systemRegistry);

const entityPool = new EntityPool([
    ['aliens', [
        bindEntity(createAlien(0, 0)),
    ]],
]);

const game = new Game(systemRegistry);

game.start();
