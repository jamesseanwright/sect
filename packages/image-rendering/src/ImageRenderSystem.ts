import { Component, System } from '@tecs/core';
import ImageRenderable from './ImageRenderable';

class ImageRenderSystem extends System<ImageRenderable> {
    private context: CanvasRenderingContext2D;

    constructor(context: CanvasRenderingContext2D) {
        super();
        this.context = context;
    }

    protected next(component: ImageRenderable, timestamp: number): void {
        this.context.drawImage(
            component.image,
            component.positionable.x,
            component.positionable.y,
            component.positionable.width,
            component.positionable.height,
        );
    }
}

export default ImageRenderSystem;
