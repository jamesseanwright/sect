import {
    Canvas2DRenderer,
    TrackingCamera,
    createDebuggableCamera,
    Positionable,
    RectPositionable,
} from '@sectjs/basics';
import { createComponentBinder, Game, Component } from '@sectjs/core';
import createSystemRegistry from './systemRegistry';
import createImages from './images';
import buildMap from './map/builder';
import map from './map/map';
import createVan from './entities/van';

// TODO: move into core
const findComponent = <T extends Component>(components: Component[], TargetConstructor: new (...args) => T) => (
    components.find(c => c.constructor === TargetConstructor) as T
);

(async () => {
    const canvas = document.body.querySelector<HTMLCanvasElement>('#game-output');
    const context = canvas.getContext('2d');
    const worldSize = [100, 100];
    const pixelSize = [canvas.width, canvas.height];
    const imageLoader = await createImages();
    const camera = createDebuggableCamera(new TrackingCamera(4, worldSize, pixelSize));
    const renderer = new Canvas2DRenderer(context, camera);
    const systemRegistry = createSystemRegistry(renderer, imageLoader);
    const bindComponents = createComponentBinder(systemRegistry);

    buildMap(bindComponents, map);

    const van = createVan(bindComponents, 50, 50, 1.3, 1.9);

    camera.positionable = findComponent<Positionable>(van, RectPositionable);

    const clearContext = () => {
        context.clearRect(0, 0, canvas.width, canvas.height);
    };

    const game = new Game(systemRegistry);

    game.setState<number>('playerScore', () => 0);

    context.imageSmoothingEnabled = false;
    context.mozImageSmoothingEnabled = false;

    game.start();
    game.onLoopStart(clearContext);
})();
