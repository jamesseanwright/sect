import { Component } from './Component';

export class Positionable extends Component {
    public x: number; // TODO: encapsulate
    public y: number;

    constructor(x: number, y: number) {
        super();

        this.x = x;
        this.y = y;
    }
}
