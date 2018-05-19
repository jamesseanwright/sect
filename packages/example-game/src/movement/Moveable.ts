import { Positionable } from '@sectjs/basics';
import { Component } from '@sectjs/core';

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

    public set xSpeed(value: number) {
        this._xSpeed = value;
    }

    public get ySpeed(): number {
        return this._ySpeed;
    }

    public set ySpeed(value: number) {
        this._ySpeed = value;
    }
}

export default Moveable;
