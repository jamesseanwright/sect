import { SystemRegistry } from '@sectjs/core';
import { LinearCollidable, createLinearCollisionSystem, hasRectangularCollision } from '@sectjs/collision';
import { ImageRenderable, createImageRenderSystem, ImageLoader } from '@sectjs/image-rendering';

const createSystemRegistry = (context: CanvasRenderingContext2D) => new SystemRegistry([
    [LinearCollidable, createLinearCollisionSystem(hasRectangularCollision)],
    [ImageRenderable, createImageRenderSystem(context, new ImageLoader())],
]);

export default createSystemRegistry;
