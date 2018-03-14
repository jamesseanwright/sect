import { Component } from './Component';

export class Positionable extends Component {
    public x: number; // TODO: encapsulate
    public y: number;
    public width: number;
    public height: number;

    constructor(x: number, y: number, width: number, height: number) {
        super();

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}
