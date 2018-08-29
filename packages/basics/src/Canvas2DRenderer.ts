import Camera from './Camera';

class Canvas2DRenderer {
    private _context: CanvasRenderingContext2D;
    private _camera: Camera;
    private _translateX: number;
    private _translateY: number;

    constructor(
        context: CanvasRenderingContext2D,
        camera: Camera,
    ) {
        this._context = context;
        this._camera = camera;

        this._context.scale(this._camera.getZoom(), this._camera.getZoom());
    }

    public translate(x: number, y: number) {
        /* We have to track translation changes ourselves for
         * accurate camera projections. This is not ideal but
         * can at least be refactored at a later date. */
        this._translateX = x;
        this._translateY = y;
        this._context.translate(...this._camera.projectPoint(x, y));
    }

    public rotate(angle: number) {
        this._context.rotate(angle);
    }

    public resetTransform() {
        // tslint:disable-next-line:no-string-literal
        this._context['resetTransform']();
        this._translateX = 0;
        this._translateY = 0;
        this._context.scale(this._camera.getZoom(), this._camera.getZoom());
    }

    public drawImage(image: HTMLImageElement, x: number, y: number, width: number, height: number) {
        this._context.fillRect(...this._camera.project(x, y, width, height, this._translateX, this._translateY));
    }
}

export default Canvas2DRenderer;
