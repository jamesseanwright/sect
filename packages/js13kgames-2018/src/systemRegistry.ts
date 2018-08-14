import { SystemRegistry } from '@sectjs/core';
import { LinearCollidable, createLinearCollisionSystem, hasRectangularCollision } from '@sectjs/collision';
import { ImageRenderable, createImageRenderSystem, ImageLoader } from '@sectjs/image-rendering';

const createSystemRegistry = (context: CanvasRenderingContext2D, imageLoader: ImageLoader) => new SystemRegistry([
    [LinearCollidable, createLinearCollisionSystem(hasRectangularCollision)],
    [ImageRenderable, createImageRenderSystem(context, imageLoader)],
]);

export default createSystemRegistry;
