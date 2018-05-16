import { RectPositionable, RectRenderable } from '@tecs/basics';
import { Entity, EntityBinder } from '@tecs/core';
import { KeyboardInteractable } from '@tecs/input';
import KeyboardMoveable from '../movement/KeyboardMoveable';
import Moveable from '../movement/Moveable';

const createPlayerPaddle = (bindEntity: EntityBinder) => {
    const positionable = new RectPositionable(20, 20, 10, 50); // TODO: world space, real coords
    const moveable = new KeyboardMoveable(positionable, new Moveable(0, 5), KeyboardInteractable.create());
    const rectRenderable = new RectRenderable(positionable, 'black');
    const entity = new Entity(moveable, positionable, rectRenderable);

    return bindEntity(entity);
};

export default createPlayerPaddle;
