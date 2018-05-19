import { RectPositionable } from '@tecs/basics';
import { Component } from '@tecs/core';
import Moveable from './Moveable';

class TrackingMoveable extends Component {
    private _moveable: Moveable;
    private _positionable: RectPositionable;
    private _targetPositionable: RectPositionable;

    constructor(moveable: Moveable, positionable: RectPositionable, targetPositionable: RectPositionable) {
        super();
        this._positionable = positionable;
        this._targetPositionable = targetPositionable;
        this._moveable = moveable;
    }

    public get moveable(): Moveable {
        return this._moveable;
    }

    public get positionable(): RectPositionable {
        return this._positionable;
    }

    public get targetPositionable(): RectPositionable {
        return this._targetPositionable;
    }
}

export default TrackingMoveable;
