import { Component, ComponentBinder } from '@sectjs/core';
import { ImageRenderable } from '@sectjs/image-rendering';
import { RectPositionable } from '@sectjs/basics';

export type RoadModifier = 'Main' | 'Corner' | 'Cross' | 'ThreeWay';

const createRoad = (
    bindComponents: ComponentBinder,
    x: number,
    y: number,
    size: number,
    rotation: string = '',
    modifier: RoadModifier = 'Main',
) => {
    const positionable = new RectPositionable(x, y, size, size);
    const imageRenderable = new ImageRenderable(positionable, `road${modifier}${rotation}`);

    return bindComponents(imageRenderable);
};

export default createRoad;
