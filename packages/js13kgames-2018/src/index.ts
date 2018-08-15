import { createComponentBinder, Game, Camera, Component, Dimension } from '@sectjs/core';
import createSystemRegistry from './systemRegistry';
import createImages from './images';
import buildMap from './map/builder';
import map from './map/map';

(async () => {
    const canvas = document.body.querySelector<HTMLCanvasElement>('#game-output');
    const context = canvas.getContext('2d');
    const worldSize = new Dimension(1, 1);
    const pixelSize = new Dimension(canvas.width, canvas.height);
    const camera = new Camera(context, worldSize, pixelSize);

    const clearContext = () => {
        context.clearRect(0, 0, canvas.width, canvas.height);
    };

    const imageLoader = await createImages();
    const systemRegistry = createSystemRegistry(camera, imageLoader);
    const game = new Game(systemRegistry);

    game.setState<number>('playerScore', () => 0);

    const bindComponents = createComponentBinder(systemRegistry);

    buildMap(bindComponents, map);

    context.imageSmoothingEnabled = false;
    context.mozImageSmoothingEnabled = false;

    game.start();
})();
