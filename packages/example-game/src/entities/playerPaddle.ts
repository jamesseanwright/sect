import { RectPositionable, RectRenderable } from '@sectjs/basics';
import { LinearCollidable } from '@sectjs/collision';
import { Entity, EntityBinder } from '@sectjs/core';
import { KeyboardInteractable } from '@sectjs/input';
import KeyboardMoveable from '../movement/KeyboardMoveable';
import Moveable from '../movement/Moveable';

const createPlayerPaddle = (bindEntity: EntityBinder) => {
    const positionable = new RectPositionable(20, 20, 10, 50); // TODO: world space, real coords
    const moveable = new KeyboardMoveable(positionable, new Moveable(0, 4.8), KeyboardInteractable.create());
    const linearCollidable = new LinearCollidable('paddle', positionable);
    const rectRenderable = new RectRenderable(positionable, 'black');
    const entity = new Entity(moveable, positionable, linearCollidable, rectRenderable);

    return bindEntity(entity);
};

export default createPlayerPaddle;
