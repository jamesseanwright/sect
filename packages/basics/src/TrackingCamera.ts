import Dimension from './Dimension';
import Camera from './Camera';
import Positionable from './Positionable';
import RectPositionable from './RectPositionable';

class TrackingCamera implements Camera {
    private _positionable: Positionable = new RectPositionable(0, 0, 0, 0);
    private _viewport: Dimension;

    constructor(viewport: Dimension) {
        this._viewport = viewport;
    }

    public get x() {
        return this._positionable.x;
    }

    public get y() {
        return this._positionable.y;
    }

    public get viewport() {
        return this._viewport;
    }

    public set positionable(value: Positionable) {
        this._positionable = value;
    }
}

export default TrackingCamera;
