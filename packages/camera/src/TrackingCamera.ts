import { Positionable } from '@sectjs/basics';
import Camera from './Camera';
import { Dimension } from '@sectjs/core';

class TrackingCamera implements Camera {
    private _positionable: Positionable;
    private _viewportSize: Dimension;

    constructor(positionable: Positionable, viewportSize: Dimension) {
        this._positionable = positionable;
        this._viewportSize = viewportSize;
    }

    public get x() {
        return this._positionable.x - this._viewportSize.width / 2;
    }

    public get y() {
        return this._positionable.y - this._viewportSize.height / 2;
    }

    public get width() {
        return this._viewportSize.width;
    }

    public get height() {
        return this._viewportSize.height;
    }
}

export default TrackingCamera;
