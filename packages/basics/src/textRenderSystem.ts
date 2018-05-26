import { Component, createSystem, System } from '@sectjs/core';
import TextRenderable from './TextRenderable';
import { RenderMode } from './types';

const render = (context: CanvasRenderingContext2D, component: TextRenderable, mode: RenderMode) => {
    context[`${mode}Style`] = component[mode];

    context[`${mode}Text`](
        component.text,
        component.positionable.x,
        component.positionable.y,
    );
};

const createTextRenderSystem = (context: CanvasRenderingContext2D) => (
    createSystem<TextRenderable>('textRenderer', (timestamp, component) => {
        context.font = `${component.fontSize}px ${component.fontFamily}`;

        if (component.fill) {
            render(context, component, 'fill');
        }

        if (component.stroke) {
            render(context, component, 'stroke');
        }
    })
);

export default createTextRenderSystem;
