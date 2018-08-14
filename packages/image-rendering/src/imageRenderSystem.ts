import { Component, createSystem, System } from '@sectjs/core';
import ImageLoader from './ImageLoader';
import ImageRenderable from './ImageRenderable';

const createImageRenderSystem = (context: CanvasRenderingContext2D, imageLoader: ImageLoader) => (
    createSystem<ImageRenderable>('imageRenderer', (timestamp, { imageName, positionable }) => {
        // TODO: test calls to translate/rotate
        context.save();
        context.translate(positionable.x + positionable.width / 2, positionable.y + positionable.height / 2);
        context.rotate(positionable.rotation);

        context.drawImage(
            imageLoader.getImage(imageName),
            0,
            0,
            positionable.width,
            positionable.height,
        );

        context.restore();
    })
);

export default createImageRenderSystem;
