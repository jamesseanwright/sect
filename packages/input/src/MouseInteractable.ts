import { Component } from '@tecs/core';
import Mouse from './Mouse';
import InputInteractable from './InputInteractable';
import Input from './Input';
import createFactory from './createFactory';

class MouseInteractable extends InputInteractable<Mouse> {
    // TODO: make reuseable for mouse component
    public static create = createFactory<MouseInteractable>(
        MouseInteractable,
        new Mouse(window.document.body), // TODO: inject event target
    );

    public isPressed = (keyName: string): boolean => this._input.isPressed(keyName);

    public get x() {
        return this._input.x;
    }

    public get y() {
        return this._input.y;
    }
}

export default MouseInteractable;
