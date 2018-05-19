import { Positionable } from '@sectjs/basics';
import { Component } from '@sectjs/core';
import { KeyboardInteractable } from '@sectjs/input';
import Moveable from './Moveable';

class KeyboardMoveable extends Component {
    private _moveable: Moveable;
    private _positionable: Positionable;
    private _keyboardInteractable: KeyboardInteractable;

    constructor(
        positionable: Positionable,
        moveable: Moveable,
        keyboardInteractable: KeyboardInteractable,
    ) {
        super();
        this._positionable = positionable;
        this._moveable = moveable;
        this._keyboardInteractable = keyboardInteractable;
    }

    public get moveable(): Moveable {
        return this._moveable;
    }

    public get positionable(): Positionable {
        return this._positionable;
    }

    public get keyboardInteractable(): KeyboardInteractable {
        return this._keyboardInteractable;
    }
}

export default KeyboardMoveable;
