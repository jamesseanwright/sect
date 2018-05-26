import { Component, createSystem, System } from '@sectjs/core';
import ImageLoader from './ImageLoader';
import ImageRenderable from './ImageRenderable';

const createImageRenderSystem = (context: CanvasRenderingContext2D, imageLoader: ImageLoader) => (
    createSystem<ImageRenderable>('imageRenderer', (timestamp, component) => {
        context.drawImage(
            imageLoader.getImage(component.imageName),
            component.positionable.x,
            component.positionable.y,
            component.positionable.width,
            component.positionable.height,
        );
    })
);

export default createImageRenderSystem;
