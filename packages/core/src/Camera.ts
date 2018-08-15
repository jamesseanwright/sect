import Dimension from './Dimension';

// TODO: rename export, make other render systems use this
class Canvas2DCamera {
    private _context: CanvasRenderingContext2D;
    private _worldSize: Dimension;
    private _pixelSize: Dimension;

    constructor(context: CanvasRenderingContext2D, worldSize: Dimension, pixelSize: Dimension) {
        this._context = context;
        this._worldSize = worldSize;
        this._pixelSize = pixelSize;
    }

    public translate(x: number, y: number) {
        this._context.translate(x, y);
    }

    public rotate(angle: number) {
        this._context.rotate(angle);
    }

    public resetTransform() {
        // tslint:disable-next-line:no-string-literal
        this._context['resetTransform']();
    }

    public drawImage(image: HTMLImageElement, x: number, y: number, width: number, height: number) {
        this._context.drawImage(image, x, y, width, height);
    }
}

export default Canvas2DCamera;
