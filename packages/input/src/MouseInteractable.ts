import { Component } from '@tecs/core';
import Mouse from './Mouse';
import InputInteractable from './InputInteractable';

class MouseInteractable extends InputInteractable<Mouse> {
    // TODO: make reuseable for mouse component
    public static create(): MouseInteractable {
        if (!MouseInteractable._mouse) {
            MouseInteractable._mouse = new Mouse(window.document.body); // TODO
        }

        return new MouseInteractable(MouseInteractable._mouse);
    }

    private static _mouse: Mouse;

    public isPressed = (keyName: string): boolean => this._input.isPressed(keyName);

    public get x() {
        return this._input.x;
    }

    public get y() {
        return this._input.y;
    }
}

export default MouseInteractable;
