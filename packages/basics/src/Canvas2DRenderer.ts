import Camera from './Camera';

class Canvas2DRenderer {
    private _context: CanvasRenderingContext2D;
    private _camera: Camera;

    constructor(
        context: CanvasRenderingContext2D,
        camera: Camera,
    ) {
        this._context = context;
        this._camera = camera;

        this._context.scale(this._camera.getZoom(), this._camera.getZoom());
    }

    public translate(x: number, y: number) {
        this._context.translate(...this._camera.projectPoint(x, y));
    }

    public rotate(angle: number) {
        this._context.rotate(angle);
    }

    public resetTransform() {
        // tslint:disable-next-line:no-string-literal
        this._context['resetTransform']();
        this._context.scale(this._camera.getZoom(), this._camera.getZoom());
    }

    public drawImage(image: HTMLImageElement, x: number, y: number, width: number, height: number) {
        this._context.drawImage(image, ...this._camera.project(x, y, width, height));
    }
}

export default Canvas2DRenderer;
