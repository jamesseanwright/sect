import { createComponentBinder, Game, Canvas2DRenderer, Component, Dimension } from '@sectjs/core';
import createSystemRegistry from './systemRegistry';
import createImages from './images';
import buildMap from './map/builder';
import map from './map/map';
import createVan from './entities/van';

(async () => {
    const canvas = document.body.querySelector<HTMLCanvasElement>('#game-output');
    const context = canvas.getContext('2d');
    const worldSize = new Dimension(1, 1);
    const pixelSize = new Dimension(canvas.width, canvas.height);
    const renderer = new Canvas2DRenderer(context, worldSize, pixelSize);

    const clearContext = () => {
        context.clearRect(0, 0, canvas.width, canvas.height);
    };

    const imageLoader = await createImages();
    const systemRegistry = createSystemRegistry(renderer, imageLoader);
    const game = new Game(systemRegistry);

    game.setState<number>('playerScore', () => 0);

    const bindComponents = createComponentBinder(systemRegistry);

    // TODO: group by scenes
    buildMap(bindComponents, map);
    createVan(bindComponents, 0.07, 0.3, 0.013, 0.019);

    context.imageSmoothingEnabled = false;
    context.mozImageSmoothingEnabled = false;

    game.start();
})();
