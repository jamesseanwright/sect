// tslint:disable:max-classes-per-file

import { DOMWindow, JSDOM } from 'jsdom';
import createMockRaf from 'mock-raf'; // not using DefinitelyTyped def due to esm conflicts

export type BrowserGlobalScope = NodeJS.Global & {
    window: DOMWindow;
    document: Document;
    Image: typeof StubImage;
    KeyboardEvent: typeof KeyboardEvent;
    MouseEvent: typeof MouseEvent;
    requestAnimationFrame(callback: FrameRequestCallback): number;
};

export class StubImage {
    private _src: string;

    public onload() {}
    public onerror(event: Partial<ErrorEvent>) {}

    public get src(): string {
        return this._src;
    }

    public set src(value: string) {
        const errorEvent = { message: `Couldn't load ${value}` };
        this._src = value;
        value === 'https://error' ? this.onerror(errorEvent) : this.onload();
    }
}

/* copied from the mock-raf DefinitelyTyped def
 * due to import conflicts with esm loader.
 */
export interface RafManipulator {
    now(): number;
    raf(callback: FrameRequestCallback): number;
    cancel(handle: number): void;
    step(options?: { time?: number, count?: number }): void;
}

export interface StubbedDom {
    browserScope: BrowserGlobalScope;
    rafManipulator: RafManipulator;
    destroy(): void;
}

export const createDom = (markup?: string): StubbedDom => {
    const dom = new JSDOM(markup);
    const rafManipulator = createMockRaf();
    const browserScope = global as BrowserGlobalScope;

    browserScope.window = dom.window;
    browserScope.document = dom.window.document;
    browserScope.Image = StubImage;
    browserScope.KeyboardEvent = dom.window.KeyboardEvent;
    browserScope.MouseEvent = dom.window.MouseEvent;
    browserScope.requestAnimationFrame = rafManipulator.raf;

    const destroy = () => {
        delete browserScope.window;
        delete browserScope.document;
        delete browserScope.Image;
        delete browserScope.KeyboardEvent;
        delete browserScope.MouseEvent;
        delete browserScope.requestAnimationFrame;
    };

    return {
        browserScope, // return typed global to avoid casts
        destroy,
        rafManipulator,
    };
};
