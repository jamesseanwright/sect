import { Component, ComponentBinder } from '@sectjs/core';
import { ImageRenderable } from '@sectjs/image-rendering';
import { RectPositionable } from '@sectjs/basics';
import { LinearCollidable } from '@sectjs/collision';

const createSolidTile = (
    bindComponents: ComponentBinder,
    x: number,
    y: number,
    size: number,
    imageName: string,
) => {
    const positionable = new RectPositionable(x, y, size, size);
    const imageRenderable = new ImageRenderable(positionable, imageName);
    // TODO: swap params for consitency with image renderable?
    const collidable = new LinearCollidable('solidTile', positionable);

    return bindComponents(imageRenderable, collidable);
};

export default createSolidTile;
