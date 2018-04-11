// tslint:disable:max-classes-per-file

import { DOMWindow, JSDOM } from 'jsdom';

export type BrowserGlobalScope = NodeJS.Global & {
    window: DOMWindow;
    document: Document;
    Image: typeof StubImage;
    KeyboardEvent: typeof KeyboardEvent;
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

export interface StubbedDom {
    browserScope: BrowserGlobalScope;
    destroy(): void;
}

export const createDom = (markup?: string): StubbedDom => {
    const dom = new JSDOM(markup);
    const browserScope = global as BrowserGlobalScope;

    browserScope.window = dom.window;
    browserScope.document = dom.window.document;
    browserScope.Image = StubImage;
    browserScope.KeyboardEvent = dom.window.KeyboardEvent;

    const destroy = () => {
        delete browserScope.window;
        delete browserScope.document;
        delete browserScope.Image;
    };

    // return typed global to avoid casts
    return { browserScope, destroy };
};
