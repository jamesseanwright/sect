import { Canvas2DRenderer } from '@sectjs/basics';
import { Component, createSystem, System } from '@sectjs/core';
import ImageLoader from './ImageLoader';
import ImageRenderable from './ImageRenderable';

// TODO: fix tests
const createImageRenderSystem = (renderer: Canvas2DRenderer, imageLoader: ImageLoader) =>
    createSystem<ImageRenderable>('imageRenderer', (timestamp, { imageName, positionable }) => {
        renderer.translate(positionable.x, positionable.y);
        renderer.rotate(positionable.rotation);

        renderer.drawImage(
            imageLoader.getImage(imageName),
            0,
            0,
            positionable.width,
            positionable.height,
        );

        renderer.resetTransform();
    });

export default createImageRenderSystem;
