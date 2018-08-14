import { Component, createSystem, System } from '@sectjs/core';
import ImageLoader from './ImageLoader';
import ImageRenderable from './ImageRenderable';

const createImageRenderSystem = (context: CanvasRenderingContext2D, imageLoader: ImageLoader) => (
    createSystem<ImageRenderable>('imageRenderer', (timestamp, { imageName, positionable }) => {
        // TODO: test calls to translate/rotate, support same in RectRenderable
        context.translate(positionable.x + positionable.width / 2, positionable.y + positionable.height / 2);
        context.rotate(positionable.rotation);

        context.drawImage(
            imageLoader.getImage(imageName),
            -(positionable.width / 2),
            -(positionable.height / 2),
            positionable.width,
            positionable.height,
        );

        // tslint:disable-next-line:no-string-literal
        context['resetTransform']();
    })
);

export default createImageRenderSystem;
