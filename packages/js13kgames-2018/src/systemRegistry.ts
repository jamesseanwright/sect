import { Camera, SystemRegistry } from '@sectjs/core';
import { LinearCollidable, createLinearCollisionSystem, hasRectangularCollision } from '@sectjs/collision';
import { ImageRenderable, createImageRenderSystem, ImageLoader } from '@sectjs/image-rendering';

const createSystemRegistry = (camera: Camera, imageLoader: ImageLoader) => new SystemRegistry([
    [LinearCollidable, createLinearCollisionSystem(hasRectangularCollision)],
    [ImageRenderable, createImageRenderSystem(camera, imageLoader)],
]);

export default createSystemRegistry;
