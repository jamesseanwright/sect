import { Component } from './Component';

export class Positionable extends Component {
    x: Number;
    y: Number;

    constructor(x: Number, y: Number) {
        super();

        this.x = x;
        this.y = y;
    }
}
