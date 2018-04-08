// tslint:disable:max-classes-per-file

import { DOMWindow, JSDOM } from 'jsdom';

export type BrowserGlobalScope = NodeJS.Global & {
    window: DOMWindow;
    document: Document;
    Image: typeof StubImage;
};

export class StubImage {
    private _src: string;
    private _willError: boolean;

    public onload() {}
    public onerror() {}

    public get src(): string {
        return this._src;
    }

    public set src(value: string) {
        this._src = value;
        this._willError ? this.onerror() : this.onload();
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

    const destroy = () => {
        delete browserScope.window;
        delete browserScope.document;
        delete browserScope.Image;
    };

    // return typed global to avoid casts
    return { browserScope, destroy };
};
