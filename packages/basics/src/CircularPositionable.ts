import Positionable from './Positionable';

class CircularPositionable extends Positionable {
    private _radius: number;

    constructor(x: number, y: number, radius: number, rotation?: number) {
        super(x, y, rotation);
        this._radius = radius;
    }

    get radius(): number {
        return this._radius;
    }
}

export default CircularPositionable;
