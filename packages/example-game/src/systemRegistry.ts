import { SystemRegistry } from '@sectjs/core';
import { createRectRenderSystem, createTextRenderSystem, RectRenderable, TextRenderable } from '@sectjs/basics';
import { LinearCollidable, createLinearCollisionSystem, hasRectangularCollision } from '@sectjs/collision';
import KeyboardMoveable from './movement/KeyboardMoveable';
import createKeyboardMovementSystem from './movement/keyboardMovementSystem';
import ConstantMoveable from './movement/ConstantMoveable';
import createConstantMovementSystem from './movement/constantMovementSystem';
import TrackingMoveable from './movement/TrackingMoveable';
import createTrackingMovementSystem from './movement/trackingMovementSystem';
import Bounceable from './physics/Bounceable';
import createBounceSystem from './physics/bounceSystem';
import ScoreTracking from './state/ScoreTracking';
import createScoreRenderSystem from './state/scoreRenderSystem';

const createSystemRegistry = (context: CanvasRenderingContext2D) => new SystemRegistry([
    [KeyboardMoveable, createKeyboardMovementSystem()],
    [RectRenderable, createRectRenderSystem(context)],
    [TextRenderable, createTextRenderSystem(context)],
    [ConstantMoveable, createConstantMovementSystem()],
    [TrackingMoveable, createTrackingMovementSystem()],
    [LinearCollidable, createLinearCollisionSystem(hasRectangularCollision)],
    [Bounceable, createBounceSystem()],
    [ScoreTracking, createScoreRenderSystem()],
]);

export default createSystemRegistry;
