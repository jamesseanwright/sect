import { Positionable } from '@tecs/basics';
import { Component } from '@tecs/core';
import Moveable from './Moveable';

class AutoMoveable extends Component {
    private _moveable: Moveable;
    private _positionable: Positionable;

    constructor(positionable: Positionable, moveable: Moveable) {
        super();
        this._positionable = positionable;
        this._moveable = moveable;
    }

    public get moveable(): Moveable {
        return this._moveable;
    }

    public get positionable(): Positionable {
        return this._positionable;
    }
}

export default AutoMoveable;
