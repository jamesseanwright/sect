import { Canvas2DRenderer } from '@sectjs/basics';
import { Component, createSystem, System } from '@sectjs/core';
import ImageLoader from './ImageLoader';
import ImageRenderable from './ImageRenderable';

// TODO: fix tests
const createImageRenderSystem = (renderer: Canvas2DRenderer, imageLoader: ImageLoader) => (
    createSystem<ImageRenderable>('imageRenderer', (timestamp, { imageName, positionable }) => {
        // TODO: test calls to translate/rotate, support same in RectRenderable
        // renderer.translate(positionable.x + positionable.width / 2, positionable.y + positionable.height / 2);
        // renderer.rotate(positionable.rotation);

        renderer.drawImage(
            imageLoader.getImage(imageName),
            positionable.x,
            positionable.y,
            positionable.width,
            positionable.height,
        );

        renderer.resetTransform();
    })
);

export default createImageRenderSystem;
