import { Component } from './Component';
import { Positionable } from './Positionable';

export class AutoMoveable extends Component {
    public positionable: Positionable;
    public speed: number; // TODO: encapsulate

    constructor(positionable: Positionable, speed: number) {
        super();

        this.positionable = positionable;
        this.speed = speed;
    }
}
