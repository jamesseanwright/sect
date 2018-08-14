import { Component, ComponentBinder } from '@sectjs/core';
import { ImageRenderable } from '@sectjs/image-rendering';
import { RectPositionable } from '@sectjs/basics';
import { LinearCollidable } from '@sectjs/collision';

const createSolidTile = (bindComponents: ComponentBinder, x: number, y: number, imageName: string) => {
    // TODO: WORLD SPACE! Perhaps write separate transformation layer called on render?
    const positionable = new RectPositionable(x, y, 24, 24);
    const imageRenderable = new ImageRenderable(positionable, imageName);
    // TODO: swap params for consitency with image renderable?
    const collidable = new LinearCollidable('solidTile', positionable);

    return bindComponents(imageRenderable, collidable);
};

export default createSolidTile;
