import { SystemRegistry } from '@sectjs/core';
import { createRectRenderSystem, createTextRenderSystem, RectRenderable, TextRenderable } from '@sectjs/basics';
import { LinearCollidable, createLinearCollisionSystem, hasRectangularCollision } from '@sectjs/collision';
import KeyboardMoveable from './movement/KeyboardMoveable';
import KeyboardMovementSystem from './movement/KeyboardMovementSystem';
import ConstantMoveable from './movement/ConstantMoveable';
import ConstantMovementSystem from './movement/ConstantMovementSystem';
import TrackingMoveable from './movement/TrackingMoveable';
import TrackingMovementSystem from './movement/TrackingMovementSystem';
import Bounceable from './physics/Bounceable';
import BounceSystem from './physics/BounceSystem';
import ScoreRenderSystem from './state/ScoreRenderSystem';
import ScoreTracking from './state/ScoreTracking';

const createSystemRegistry = (context: CanvasRenderingContext2D) => new SystemRegistry([
    [KeyboardMoveable, new KeyboardMovementSystem()],
    [RectRenderable, createRectRenderSystem(context)],
    [TextRenderable, createTextRenderSystem(context)],
    [ConstantMoveable, new ConstantMovementSystem()],
    [TrackingMoveable, new TrackingMovementSystem()],
    [LinearCollidable, createLinearCollisionSystem(hasRectangularCollision)],
    [Bounceable, new BounceSystem()],
    [ScoreTracking, new ScoreRenderSystem()],
]);

export default createSystemRegistry;
