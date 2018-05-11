import { Positionable } from '@tecs/basics';
import { Component } from '@tecs/core';
import { KeyboardInteractable } from '@tecs/input';

class Moveable extends Component {
    private _positionable: Positionable;
    private _keyboardInteractable: KeyboardInteractable;
    private _xSpeed: number;
    private _ySpeed: number;

    constructor(
        xSpeed: number,
        ySpeed: number,
        positionable: Positionable,
        keyboardInteractable: KeyboardInteractable,
    ) {
        super();
        this._xSpeed = xSpeed;
        this._ySpeed = ySpeed;
        this._positionable = positionable;
        this._keyboardInteractable = keyboardInteractable;
    }

    public get xSpeed(): number {
        return this._xSpeed;
    }

    public get ySpeed(): number {
        return this._ySpeed;
    }

    public get positionable(): Positionable {
        return this._positionable;
    }

    public get keyboardInteractable(): KeyboardInteractable {
        return this._keyboardInteractable;
    }
}

export default Moveable;
