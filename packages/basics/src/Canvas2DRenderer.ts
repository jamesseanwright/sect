import Camera from './Camera';
import Dimension from './Dimension';

class Canvas2DRenderer {
    private _context: CanvasRenderingContext2D;
    private _camera: Camera;
    private _worldSize: Dimension;
    private _pixelSize: Dimension;

    constructor(
        context: CanvasRenderingContext2D,
        camera: Camera,
        worldSize: Dimension,
        pixelSize: Dimension,
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
        // this._context.translate(
        //     this.toPixels(this._camera.x, 'width'),
        //     this.toPixels(this._camera.y, 'height'),
        // );

        // this._context.scale(this._camera.zoom, this._camera.zoom);

        this._context.drawImage(image, ...this.project(x, y, width, height));
    }

    // TODO: should aspect ratio be computed from world space?
    private getAspectRatio() {
        return this._pixelSize.width / this._pixelSize.height;
    }

    // TODO: dimension is right here, but rename Dimension class?
    private toPixels(unit: number, dimension: 'width' | 'height') {
        return unit * this._pixelSize[dimension] / this._worldSize[dimension];
    }

    private projectPoint(x: number, y: number): [number, number] {
        return [
            this.toPixels(x, 'width'),
            this.toPixels(y, 'height') * this.getAspectRatio(),
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
