import { ImageRenderable } from '../components';
import System from './System';

class ImageRenderSystem extends System<ImageRenderable> {
    private context: CanvasRenderingContext2D;

    constructor(context: CanvasRenderingContext2D) {
        super();
        this.context = context;
    }

    protected next(component: ImageRenderable, timestamp: number): void {
        throw new Error('Method not implemented.');
    }
}

export default ImageRenderSystem;
