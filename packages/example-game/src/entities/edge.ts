import { RectPositionable, RectRenderable } from '@tecs/basics';
import { LinearCollidable } from '@tecs/collision';
import { Entity, EntityBinder } from '@tecs/core';

const createEdge = (bindEntity: EntityBinder, y: number, width: number, height: number) => {
    const positionable = new RectPositionable(0, y, width, height); // TODO: world space, real coords
    const rectRenderable = new RectRenderable(positionable, 'black');
    const linearCollidable = new LinearCollidable('edge', positionable);
    const entity = new Entity(positionable, linearCollidable, rectRenderable);

    return bindEntity(entity);
};

export default createEdge;
