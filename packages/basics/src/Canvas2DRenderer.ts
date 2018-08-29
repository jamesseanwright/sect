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
    }

    public translate(x: number, y: number) {
        /* We have to track translation changes ourselves for
         * accurate camera projections. This is not ideal but
         * can at least be refactored at a later date. */
        this._translateX += x;
        this._translateY += y;
    }

    public rotate(angle: number) {
        this._context.rotate(angle);
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
