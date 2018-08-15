import { Component, createSystem, System, Camera } from '@sectjs/core';
import ImageLoader from './ImageLoader';
import ImageRenderable from './ImageRenderable';

// TODO: fix tests
const createImageRenderSystem = (camera: Camera, imageLoader: ImageLoader) => (
    createSystem<ImageRenderable>('imageRenderer', (timestamp, { imageName, positionable }) => {
        // TODO: test calls to translate/rotate, support same in RectRenderable
        camera.translate(positionable.x + positionable.width / 2, positionable.y + positionable.height / 2);
        camera.rotate(positionable.rotation);

        camera.drawImage(
            imageLoader.getImage(imageName),
            -(positionable.width / 2),
            -(positionable.height / 2),
            positionable.width,
            positionable.height,
        );

        // tslint:disable-next-line:no-string-literal
        camera.resetTransform();
    })
);

export default createImageRenderSystem;
