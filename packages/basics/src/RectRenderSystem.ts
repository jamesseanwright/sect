import { Component, System } from '@tecs/core';
import RectRenderable, { RectStyle } from './RectRenderable';

export type RenderMode = 'fill' | 'stroke';

class RectRenderSystem extends System<RectRenderable> {
    private context: CanvasRenderingContext2D;

    constructor(context: CanvasRenderingContext2D) {
        super();
        this.context = context;
    }

    protected next(component: RectRenderable, timestamp: number): void {
        if (component.fill) {
            this.render(component, 'fill');
        }

        if (component.stroke) {
            this.render(component, 'stroke');
        }
    }

    private render(component: RectRenderable, mode: RenderMode) {
        this.context[`${mode}Style`] = component.fill;

        this.context[`${mode}Rect`](
            component.positionable.x,
            component.positionable.y,
            component.positionable.width,
            component.positionable.height,
        );
    }
}

export default RectRenderSystem;
