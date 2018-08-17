import { Component, ComponentBinder } from '@sectjs/core';
import { ImageRenderable } from '@sectjs/image-rendering';
import { RectPositionable } from '@sectjs/basics';
import { LinearCollidable } from '@sectjs/collision';
import KeyboardMoveable from '../movement/KeyboardMoveable';
import Moveable from '../movement/Moveable';
import { KeyboardInteractable } from '@sectjs/input';

const createVan = (
    bindComponents: ComponentBinder,
    x: number,
    y: number,
    width: number,
    height: number,
) => {
    const positionable = new RectPositionable(x, y, width, height);
    const imageRenderable = new ImageRenderable(positionable, 'van');
    const collidable = new LinearCollidable('van', positionable);
    const moveable = new Moveable(0.04, 0.04, 0.0004); // TODO: acceleration
    // TODO: consistent component creation (perhaps createPositionable(), createKeyboardInteractable()?)
    const keyboardMoveable = new KeyboardMoveable(positionable, moveable, KeyboardInteractable.create());

    return bindComponents(positionable, imageRenderable, collidable, keyboardMoveable);
};

export default createVan;
