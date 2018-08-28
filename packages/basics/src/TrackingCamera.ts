import Camera from './Camera';
import Positionable from './Positionable';
import RectPositionable from './RectPositionable';
import Size from './Size';

class TrackingCamera implements Camera {
    private _positionable: Positionable = new RectPositionable(0, 0, 0, 0);
    private _worldSize: Size;
    private _pixelSize: Size;
    private _zoom: number;

    constructor(zoom: number, worldSize: Size, pixelSize: Size) {
        this._worldSize = worldSize;
        this._pixelSize = pixelSize;
        this._zoom = zoom;
    }

    public projectPoint(x: number, y: number): [number, number] {
        return [
            this.toPixels((x - this._positionable.x) + this._worldSize.width / (this._zoom * 2), 'width'),
            this.toPixels(
                y - this._positionable.y  + this._worldSize.height / (this._zoom * 2),
                'height',
            ) * this.getAspectRatio(),
        ];
    }

    public project(x: number, y: number, width: number, height: number) {
        return [
            ...this.projectPoint(x, y),
            this.toPixels(width, 'width'),
            this.toPixels(height, 'height') * this.getAspectRatio(),
        ] as [number, number, number, number];
    }

    public getZoom() { // No getters in interfaces :(
        return this._zoom;
    }

    // TODO: inject into constructor instead
    public set positionable(value: Positionable) {
        this._positionable = value;
    }

    private toPixels(unit: number, dimension: 'width' | 'height') {
        return unit * this._pixelSize[dimension] / this._worldSize[dimension];
    }

    private getAspectRatio() {
        return this._pixelSize.width / this._pixelSize.height;
    }
}

export default TrackingCamera;
