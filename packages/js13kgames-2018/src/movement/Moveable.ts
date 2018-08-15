import { Component } from '@sectjs/core';

class Moveable extends Component {
    private _xSpeed: number;
    private _ySpeed: number;
    private _rotationSpeed: number;

    constructor(
        xSpeed: number,
        ySpeed: number,
        rotationSpeed: number,
    ) {
        super();
        this._xSpeed = xSpeed;
        this._ySpeed = ySpeed;
        this._rotationSpeed = rotationSpeed;
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

    public get rotationSpeed(): number {
        return this._rotationSpeed;
    }

    public set rotationSpeed(value: number) {
        this._rotationSpeed = value;
    }
}

export default Moveable;
