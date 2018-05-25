import { RectPositionable } from '@sectjs/basics';
import { LinearCollidable } from '@sectjs/collision';
import { ComponentBinder } from '@sectjs/core';

const createGoal = (bindComponents: ComponentBinder, name: string, x: number, height: number) => {
    const positionable = new RectPositionable(0, x, 1, height); // TODO: world space, real coords
    const linearCollidable = new LinearCollidable(name, positionable);

    return bindComponents(positionable, linearCollidable);
};

export default createGoal;
