import { Component, System } from '@tecs/core';
import ImageLoader from './ImageLoader';
import ImageRenderable from './ImageRenderable';

class ImageRenderSystem extends System<ImageRenderable> {
    private context: CanvasRenderingContext2D;
    private imageLoader: ImageLoader;

    constructor(context: CanvasRenderingContext2D, imageLoader: ImageLoader) {
        super();
        this.context = context;
        this.imageLoader = imageLoader;
    }

    protected next(component: ImageRenderable, timestamp: number): void {
        this.context.drawImage(
            this.imageLoader.getImage(component.imageName),
            component.positionable.x,
            component.positionable.y,
            component.positionable.width,
            component.positionable.height,
        );
    }
}

export default ImageRenderSystem;
