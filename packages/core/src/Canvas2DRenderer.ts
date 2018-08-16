import Dimension from './Dimension';

class Canvas2DRenderer {
    private _context: CanvasRenderingContext2D;
    private _worldSize: Dimension;
    private _pixelSize: Dimension;

    constructor(context: CanvasRenderingContext2D, worldSize: Dimension, pixelSize: Dimension) {
        this._context = context;
        this._worldSize = worldSize;
        this._pixelSize = pixelSize;
    }

    public translate(x: number, y: number) {
        this._context.translate(...this.projectPoint(x, y));
    }

    public rotate(angle: number) {
        this._context.rotate(angle);
    }

    public resetTransform() {
        // tslint:disable-next-line:no-string-literal
        this._context['resetTransform']();
    }

    public drawImage(image: HTMLImageElement, x: number, y: number, width: number, height: number) {
        this._context.drawImage(image, ...this.project(x, y, width, height));
    }

    // TODO: should aspect ratio be computed from world space?
    private getAspectRatio() {
        return this._pixelSize.width / this._pixelSize.height;
    }

    private projectPoint(x: number, y: number): [number, number] {
        return [
            x * this._pixelSize.width / this._worldSize.width,
            y * (this._pixelSize.height / this._worldSize.height) * this.getAspectRatio(),
        ];
    }

    private project(x: number, y: number, width: number, height: number) {
        return [
            ...this.projectPoint(x, y),
            width * this._pixelSize.width / this._worldSize.width,
            height * (this._pixelSize.height / this._worldSize.height) * this.getAspectRatio(),
        ] as [number, number, number, number];
    }
}

export default Canvas2DRenderer;
