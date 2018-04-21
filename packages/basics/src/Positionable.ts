import { Component } from '@tecs/core';

class Positionable extends Component {
    private _x: number;
    private _y: number;
    private _width: number;
    private _height: number;

    constructor(x: number, y: number, width: number, height: number) {
        super();

        this._x = x;
        this._y = y;
        this._width = width;
        this._height = height;
    }

     get x() {
         return this._x;
     }

     get y() {
         return this._y;
     }

     get width() {
         return this._width;
     }

     get height() {
         return this._height;
     }
}

export default Positionable;
