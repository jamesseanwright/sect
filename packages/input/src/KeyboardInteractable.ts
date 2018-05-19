import { Component } from '@sectjs/core';
import Keyboard from './Keyboard';
import InputInteractable from './InputInteractable';
import createFactory from './createFactory';

class KeyboardInteractable extends InputInteractable<Keyboard> {
    public static create = createFactory<KeyboardInteractable>(
        KeyboardInteractable,
        Keyboard,
    );

    public isPressed = (keyName: string): boolean => this._input.isPressed(keyName);
}

export default KeyboardInteractable;
