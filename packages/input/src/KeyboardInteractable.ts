import { Component } from '@tecs/core';
import Keyboard from './Keyboard';
import InputInteractable from './InputInteractable';

class KeyboardInteractable extends InputInteractable<Keyboard> {
    // TODO: make reuseable for mouse component
    public static create(): KeyboardInteractable {
        if (!KeyboardInteractable._keyboard) {
            KeyboardInteractable._keyboard = new Keyboard();
        }

        return new KeyboardInteractable(KeyboardInteractable._keyboard);
    }

    private static _keyboard: Keyboard;

    constructor(keyboard: Keyboard) {
        super(keyboard);
        this._input = keyboard;
    }

    public isPressed = (keyName: string): boolean => this._input.isPressed(keyName);
}

export default KeyboardInteractable;
