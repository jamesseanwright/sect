import { Component } from '@tecs/core';
import Keyboard from './Keyboard';

class KeyboardInteractable extends Component {
    private static _keyboard: Keyboard;

    // TODO: replace with Component factory method?
    private static get keyboard(): Keyboard {
        if (!KeyboardInteractable._keyboard) {
            KeyboardInteractable._keyboard = new Keyboard();
        }

        return KeyboardInteractable._keyboard;
    }

    private _keyboard: Keyboard;

    /* `keyboard` param is solely for testing. Consumers will never
     * have to create a Keyboard instance, thus it is not exported.
     */
    constructor(keyboard: Keyboard = KeyboardInteractable.keyboard) {
        super();
        this._keyboard = keyboard;
    }

    public isPressed = (keyName: string): boolean => this._keyboard.isPressed(keyName);
}

export default KeyboardInteractable;
