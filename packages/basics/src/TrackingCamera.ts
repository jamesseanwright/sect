import Camera from './Camera';
import Positionable from './Positionable';
import RectPositionable from './RectPositionable';

class TrackingCamera implements Camera {
    private _positionable: Positionable = new RectPositionable(0, 0, 0, 0);
    private _worldSize: [number, number];
    private _pixelSize: [number, number];
    private _zoom: number;

    constructor(zoom: number, worldSize: [number, number], pixelSize: [number, number]) {
        this._worldSize = worldSize;
        this._pixelSize = pixelSize;
        this._zoom = zoom;
    }

    // this._worldSize[0] / (this._zoom * 2)
    public projectPoint(x: number, y: number, offsetX = 0, offsetY = 0): [number, number] {
        return [
            this.toPixels(
                (x + offsetX - this._positionable.x),
                0,
            ),
            this.toPixels(
                (y + offsetY - this._positionable.y),
                1,
            ) * this.getAspectRatio(),
        ];
    }

    public project(x: number, y: number, width: number, height: number, offsetX = 0, offsetY = 0) {
        return [
            ...this.projectPoint(x, y, offsetX, offsetY),
            this.toPixels(width, 0),
            this.toPixels(height, 1) * this.getAspectRatio(),
        ] as [number, number, number, number];
    }

    // TODO: inject into constructor instead
    public set positionable(value: Positionable) {
        this._positionable = value;
    }

    private toPixels(unit: number, dimension: 0 | 1) {
        return (unit * this._pixelSize[dimension] / this._worldSize[dimension]) * this._zoom;
    }

    private getAspectRatio() {
        return this._pixelSize[0] / this._pixelSize[1];
    }
}

export default TrackingCamera;
