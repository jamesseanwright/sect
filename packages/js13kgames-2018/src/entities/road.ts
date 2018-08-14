import { ComponentBinder } from '@sectjs/core';
import { ImageRenderable } from '@sectjs/image-rendering';
import { RectPositionable } from '@sectjs/basics';

export type RoadModifier = 'Main' | 'Corner' | 'Cross' | 'ThreeWay';

const createRoad = (bindComponents: ComponentBinder, x: number, y: number, modifier: RoadModifier = 'Main') => {
    // TODO: WORLD SPACE! Perhaps write separate transformation layer called on render?
    const positionable = new RectPositionable(x, y, 24, 24);
    const imageRenderable = new ImageRenderable(positionable, `road${modifier}`);

    return bindComponents(imageRenderable);
};

export default createRoad;
