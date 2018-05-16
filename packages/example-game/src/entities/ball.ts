import { RectPositionable, RectRenderable } from '@tecs/basics';
import { LinearCollidable } from '@tecs/collision';
import { Entity, EntityBinder } from '@tecs/core';
import Moveable from '../movement/Moveable';

const createBall = (bindEntity: EntityBinder) => {
    const positionable = new RectPositionable(200, 200, 10, 10); // TODO: world space, real coords
    const moveable = new Moveable(7, 7);
    const linearCollidable = new LinearCollidable('paddle', positionable);
    const rectRenderable = new RectRenderable(positionable, 'black');
    const entity = new Entity(moveable, positionable, linearCollidable, rectRenderable);

    return bindEntity(entity);
};

export default createBall;
