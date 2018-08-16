import { Canvas2DRenderer } from '@sectjs/basics';
import { SystemRegistry } from '@sectjs/core';
import { LinearCollidable, createLinearCollisionSystem, hasRectangularCollision } from '@sectjs/collision';
import { ImageRenderable, createImageRenderSystem, ImageLoader } from '@sectjs/image-rendering';
import KeyboardMoveable from './movement/KeyboardMoveable';
import createKeyboardMovementSystem from './movement/keyboardMovementSystem';

const createSystemRegistry = (renderer: Canvas2DRenderer, imageLoader: ImageLoader) => new SystemRegistry([
    [LinearCollidable, createLinearCollisionSystem(hasRectangularCollision)],
    [ImageRenderable, createImageRenderSystem(renderer, imageLoader)],
    [KeyboardMoveable, createKeyboardMovementSystem()],
]);

export default createSystemRegistry;
