import Camera from './Camera';
import Positionable from './Positionable';
import RectPositionable from './RectPositionable';
import Size from './Size';

class TrackingCamera implements Camera {
    private _positionable: Positionable = new RectPositionable(0, 0, 0, 0);
    private _worldSize: Size;
    private _zoom: number;

    constructor(zoom: number, worldSize: Size) {
        this._worldSize = worldSize;
        this._zoom = zoom;
    }

    public get x() {
        return this._worldSize.width / 2 - this._positionable.x;
    }

    public get y() {
        return this._worldSize.height / 2 - this._positionable.y;
    }

    public get zoom() {
        return this._zoom;
    }

    public set positionable(value: Positionable) {
        this._positionable = value;
    }
}

export default TrackingCamera;
