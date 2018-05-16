import { Positionable } from '@tecs/basics';
import { Component } from '@tecs/core';

class Moveable extends Component {
    private _xSpeed: number;
    private _ySpeed: number;

    constructor(
        xSpeed: number,
        ySpeed: number,
    ) {
        super();
        this._xSpeed = xSpeed;
        this._ySpeed = ySpeed;
    }

    public get xSpeed(): number {
        return this._xSpeed;
    }

    public get ySpeed(): number {
        return this._ySpeed;
    }
}

export default Moveable;
