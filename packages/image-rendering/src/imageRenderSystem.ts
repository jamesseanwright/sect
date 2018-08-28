import { Canvas2DRenderer } from '@sectjs/basics';
import { Component, createSystem, System } from '@sectjs/core';
import ImageLoader from './ImageLoader';
import ImageRenderable from './ImageRenderable';

// TODO: fix tests
const createImageRenderSystem = (renderer: Canvas2DRenderer, imageLoader: ImageLoader) =>
    createSystem<ImageRenderable>('imageRenderer', (timestamp, { imageName, positionable }) => {
        renderer.drawImage(
            imageLoader.getImage(imageName),
            positionable.x,
            positionable.y,
            positionable.width,
            positionable.height,
        );
    });

export default createImageRenderSystem;
