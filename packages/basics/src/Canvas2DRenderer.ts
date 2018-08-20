import Camera from './Camera';
import Size from './Size';

class Canvas2DRenderer {
    private _context: CanvasRenderingContext2D;
    private _camera: Camera;
    private _worldSize: Size;
    private _pixelSize: Size;

    constructor(
        context: CanvasRenderingContext2D,
        camera: Camera,
        worldSize: Size,
        pixelSize: Size,
    ) {
        this._context = context;
        this._camera = camera;
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

    private toPixels(unit: number, dimension: 'width' | 'height') {
        return unit * this._pixelSize[dimension] / this._worldSize[dimension];
    }

    private projectPoint(x: number, y: number): [number, number] {
        return [
            this.toPixels(x + this._camera.x, 'width'),
            this.toPixels(y + this._camera.y, 'height') * this.getAspectRatio(),
        ];
    }

    private project(x: number, y: number, width: number, height: number) {
        return [
            ...this.projectPoint(x, y),
            this.toPixels(width, 'width'),
            this.toPixels(height, 'height') * this.getAspectRatio(),
        ] as [number, number, number, number];
    }
}

export default Canvas2DRenderer;
