import { Component } from '@sectjs/core';

abstract class Positionable extends Component {
    private _x: number;
    private _y: number;
    private _rotation: number;

    constructor(x: number, y: number, rotation: number = 0) {
        super();

        this._x = x;
        this._y = y;
        this._rotation = rotation;
    }

    get x() {
        return this._x;
    }

    set x(x: number) {
        this._x = x;
    }

    get y() {
        return this._y;
    }

    set y(y: number) {
        this._y = y;
    }

    get rotation() {
        return this._rotation;
    }

    set rotation(rotation: number) {
        this._rotation = rotation;
    }
}

export default Positionable;
