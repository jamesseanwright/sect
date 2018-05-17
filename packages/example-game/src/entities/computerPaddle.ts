import { RectPositionable, RectRenderable } from '@tecs/basics';
import { LinearCollidable } from '@tecs/collision';
import { Entity, EntityBinder } from '@tecs/core';
import { KeyboardInteractable } from '@tecs/input';
import Moveable from '../movement/Moveable';

const createComputerPaddle = (bindEntity: EntityBinder) => {
    const positionable = new RectPositionable(700, 110, 10, 50); // TODO: world space, real coords
    const linearCollidable = new LinearCollidable('paddle', positionable);
    const rectRenderable = new RectRenderable(positionable, 'black');
    const entity = new Entity(positionable, linearCollidable, rectRenderable);

    return bindEntity(entity);
};

export default createComputerPaddle;
