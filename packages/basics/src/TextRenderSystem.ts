import { Component, System } from '@tecs/core';
import TextRenderable from './TextRenderable';
import { RenderMode } from './types';

class TextRenderSystem extends System<TextRenderable> {
    private context: CanvasRenderingContext2D;

    constructor(context: CanvasRenderingContext2D) {
        super();
        this.context = context;
    }

    protected next(component: TextRenderable, timestamp: number): void {
        this.context.font = component.font;

        if (component.fill) {
            this.render(component, 'fill');
        }

        if (component.stroke) {
            this.render(component, 'stroke');
        }
    }

    private render(component: TextRenderable, mode: RenderMode) {
        this.context[`${mode}Style`] = component[mode];

        this.context[`${mode}Text`](
            component.text,
            component.positionable.x,
            component.positionable.y,
        );
    }
}

export default TextRenderSystem;
