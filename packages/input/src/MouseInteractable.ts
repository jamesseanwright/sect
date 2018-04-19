import { Component } from '@tecs/core';
import Mouse from './Mouse';
import InputInteractable from './InputInteractable';
import Input from './Input';
import createFactory from './createFactory';

class MouseInteractable extends InputInteractable<Mouse> {
    public static create = createFactory<MouseInteractable>(
        MouseInteractable,
        Mouse,
    );

    public isPressed = (button: number): boolean => this._input.isPressed(button);

    public get x() {
        return this._input.x;
    }

    public get y() {
        return this._input.y;
    }
}

export default MouseInteractable;
