import { SystemRegistry } from '@sectjs/core';
import { RectRenderSystem, RectRenderable, TextRenderable, TextRenderSystem } from '@sectjs/basics';
import { LinearCollidable, LinearCollisionSystem, hasRectangularCollision } from '@sectjs/collision';
import KeyboardMoveable from './movement/KeyboardMoveable';
import KeyboardMovementSystem from './movement/KeyboardMovementSystem';
import ConstantMoveable from './movement/ConstantMoveable';
import ConstantMovementSystem from './movement/ConstantMovementSystem';
import TrackingMoveable from './movement/TrackingMoveable';
import TrackingMovementSystem from './movement/TrackingMovementSystem';
import Bounceable from './physics/Bounceable';
import BounceSystem from './physics/BounceSystem';
import ScoreSystem from './state/ScoreSystem';
import ScoreTracking from './state/ScoreTracking';

const createSystemRegistry = (context: CanvasRenderingContext2D) => new SystemRegistry([
    [KeyboardMoveable, new KeyboardMovementSystem()],
    [RectRenderable, new RectRenderSystem(context)],
    [TextRenderable, new TextRenderSystem(context)],
    [ConstantMoveable, new ConstantMovementSystem()],
    [TrackingMoveable, new TrackingMovementSystem()],
    [LinearCollidable, new LinearCollisionSystem(hasRectangularCollision)],
    [Bounceable, new BounceSystem()],
    [ScoreTracking, new ScoreSystem()],
]);

export default createSystemRegistry;
