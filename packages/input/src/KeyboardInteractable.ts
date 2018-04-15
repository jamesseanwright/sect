import { Component } from '@tecs/core';
import Keyboard from './Keyboard';

class KeyboardInteractable extends Component {
    private static _keyboard: Keyboard;

    private static get keyboard(): Keyboard {
        if (!KeyboardInteractable._keyboard) {
            KeyboardInteractable._keyboard = new Keyboard();
        }

        return KeyboardInteractable.keyboard;
    }

    private _keyboard: Keyboard;

    constructor(keyboard: Keyboard = KeyboardInteractable.keyboard) {
        super();
        this._keyboard = keyboard;
    }

    public isPressed = (keyName: string): boolean => this._keyboard.isPressed(keyName);
}

export default KeyboardInteractable;
