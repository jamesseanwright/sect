import Camera from './Camera';
import Positionable from './Positionable';
import RectPositionable from './RectPositionable';

class TrackingCamera implements Camera {
    private _positionable: Positionable = new RectPositionable(0, 0, 0, 0);
    private _zoom: number;

    constructor(zoom: number) {
        this._zoom = zoom;
    }

    public get x() {
        return this._positionable.x;
    }

    public get y() {
        return this._positionable.y;
    }

    public get zoom() {
        return this._zoom;
    }

    public set positionable(value: Positionable) {
        this._positionable = value;
    }
}

export default TrackingCamera;
