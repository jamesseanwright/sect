import { JSDOM } from 'jsdom';

export type BrowserGlobalScope = NodeJS.Global & {
    window: Window;
    document: Document;
};

export const createDom = (markup?: string): (() => void) => {
    const dom = new JSDOM(markup);
    const browserScope = global as BrowserGlobalScope;

    browserScope.window = dom.window;
    browserScope.document = dom.window.document;

    const destroyDom = () => {
        delete browserScope.window;
        delete browserScope.document;
    };

    return destroyDom;
};
