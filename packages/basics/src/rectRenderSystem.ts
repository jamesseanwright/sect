import { Component, createSystem, System } from '@sectjs/core';
import RectRenderable from './RectRenderable';
import { RenderMode } from './types';

const render = (context: CanvasRenderingContext2D, component: RectRenderable, mode: RenderMode) => {
    context[`${mode}Style`] = component[mode];

    context[`${mode}Rect`](
        component.positionable.x,
        component.positionable.y,
        component.positionable.width,
        component.positionable.height,
    );
};

const createRectRenderSystem = (context: CanvasRenderingContext2D) => (
    createSystem<RectRenderable>('rectRenderer', (timestamp, component) => {
        if (component.fill) {
            render(context, component, 'fill');
        }

        if (component.stroke) {
            render(context, component, 'stroke');
        }
    })
);

export default createRectRenderSystem;
