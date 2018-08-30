import Camera from './Camera';

class Canvas2DRenderer {
    private _context: CanvasRenderingContext2D;
    private _camera: Camera;
    private _translateX = 0;
    private _translateY = 0;

    constructor(
        context: CanvasRenderingContext2D,
        camera: Camera,
    ) {
        this._context = context;
        this._camera = camera;

        /* This is a bit of a hack so that
         * subsequent translations can occur
         * around the origin of the camera */
        context.translate(...camera.getOrigin());
    }

    public translate(x: number, y: number) {
        /* We have to track translation changes ourselves for
         * accurate camera projections. This is not ideal but
         * can at least be refactored at a later date.
         * TODO: perhaps camera should hold this offset? */
        // this._translateX += x;
        // this._translateY += y;
        this._context.translate(...this._camera.projectPoint(x, y));
    }

    public rotate(angle: number) {
        this._context.rotate(angle);
    }

    public save() {
        this._context.save();
    }

    public restore() {
        this._context.restore();
    }

    public resetTransform() {
        // tslint:disable-next-line:no-string-literal
        this._context['resetTransform']();
        this._translateX = 0;
        this._translateY = 0;
    }

    public drawImage(image: HTMLImageElement, x: number, y: number, width: number, height: number) {
        const [pX, pY, pWidth, pHeight] = this._camera.project(x, y, width, height, this._translateX, this._translateY);

        this._context.drawImage(image, pX, pY, pWidth, pHeight);
        this._context.font = '7px Arial';
        this._context.fillStyle = 'black';
        this._context.fillText(`${pX.toFixed(0)}, ${pX.toFixed(0)}`, pX, pY);
        this._context.fillText(
            `${(pX + pWidth).toFixed(0)}, ${(pY + pHeight).toFixed(0)}`, pX + pWidth, pY + pHeight,
        );
    }
}

export default Canvas2DRenderer;
