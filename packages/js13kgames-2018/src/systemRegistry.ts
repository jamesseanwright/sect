import { SystemRegistry } from '@sectjs/core';

const createSystemRegistry = (context: CanvasRenderingContext2D) => new SystemRegistry([
    // [KeyboardMoveable, createKeyboardMovementSystem()],
    // [RectRenderable, createRectRenderSystem(context)],
    // [TextRenderable, createTextRenderSystem(context)],
    // [ConstantMoveable, createConstantMovementSystem()],
    // [TrackingMoveable, createTrackingMovementSystem()],
    // [LinearCollidable, createLinearCollisionSystem(hasRectangularCollision)],
    // [Bounceable, createBounceSystem()],
    // [ScoreTracking, createScoreRenderSystem()],
]);

export default createSystemRegistry;
