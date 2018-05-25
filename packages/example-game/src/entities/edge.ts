import { RectPositionable, RectRenderable } from '@sectjs/basics';
import { LinearCollidable } from '@sectjs/collision';
import { ComponentBinder } from '@sectjs/core';

const createEdge = (bindComponents: ComponentBinder, y: number, width: number, height: number) => {
    const positionable = new RectPositionable(0, y, width, height); // TODO: world space, real coords
    const rectRenderable = new RectRenderable(positionable, 'black');
    const linearCollidable = new LinearCollidable('edge', positionable);

    return bindComponents(positionable, linearCollidable, rectRenderable);
};

export default createEdge;
