import { RectPositionable, RectRenderable } from '@sectjs/basics';
import { LinearCollidable } from '@sectjs/collision';
import { ComponentBinder } from '@sectjs/core';
import { KeyboardInteractable } from '@sectjs/input';
import Moveable from '../movement/Moveable';
import TrackingMoveable from '../movement/TrackingMoveable';

const createComputerPaddle = (bindComponents: ComponentBinder, targetPositionable: RectPositionable) => {
    const positionable = new RectPositionable(770, 200, 10, 50); // TODO: world space, real coords
    const moveable = new Moveable(0, 4.8); // TODO: remove magic numbers, share speed with player
    const linearCollidable = new LinearCollidable('paddle', positionable);
    const trackingMoveable = new TrackingMoveable(moveable, positionable, targetPositionable);
    const rectRenderable = new RectRenderable(positionable, 'black');

    return bindComponents(positionable, linearCollidable, trackingMoveable, rectRenderable);
};

export default createComputerPaddle;
