import { RectPositionable, RectRenderable } from '@tecs/basics';
import { LinearCollidable } from '@tecs/collision';
import { Entity, EntityBinder } from '@tecs/core';
import { KeyboardInteractable } from '@tecs/input';
import Moveable from '../movement/Moveable';
import TrackingMoveable from '../movement/TrackingMoveable';

const createComputerPaddle = (bindEntity: EntityBinder, targetPositionable: RectPositionable) => {
    const positionable = new RectPositionable(770, 200, 10, 50); // TODO: world space, real coords
    const moveable = new Moveable(0, 4.8); // TODO: remove magic numbers, share speed with player
    const linearCollidable = new LinearCollidable('paddle', positionable);
    const trackingMoveable = new TrackingMoveable(moveable, positionable, targetPositionable);
    const rectRenderable = new RectRenderable(positionable, 'black');
    const entity = new Entity(positionable, linearCollidable, trackingMoveable, rectRenderable);

    return bindEntity(entity);
};

export default createComputerPaddle;
