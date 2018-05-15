import Positionable from './Positionable';

class RectPositionable extends Positionable {
    private _width: number;
    private _height: number;

    constructor(x: number, y: number, width: number, height: number) {
        super(x, y);
        this._width = width;
        this._height = height;
    }

    get width(): number {
        return this._width;
    }

    get height(): number {
        return this._height;
    }
}

export default RectPositionable;
