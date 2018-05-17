import { Positionable } from '@tecs/basics';
import { Component } from '@tecs/core';
import Moveable from './Moveable';

class TrackingMoveable extends Component {
    private _moveable: Moveable;
    private _positionable: Positionable;
    private _targetPositionable: Positionable;

    constructor(moveable: Moveable, positionable: Positionable, targetPositionable: Positionable) {
        super();
        this._positionable = positionable;
        this._targetPositionable = targetPositionable;
        this._moveable = moveable;
    }

    public get moveable(): Moveable {
        return this._moveable;
    }

    public get positionable(): Positionable {
        return this._positionable;
    }

    public get targetPositionable(): Positionable {
        return this._targetPositionable;
    }
}

export default TrackingMoveable;
