import { Component } from './Component';
import { Positionable } from './Positionable';

export class AutoMoveable extends Component {
    public _positionable: Positionable;
    public _speed: number;

    constructor(positionable: Positionable, speed: number) {
        super();

        this._positionable = positionable;
        this._speed = speed;
    }

    get positionable() {
        return this._positionable;
    }

    get speed() {
        return this._speed;
    }
}
