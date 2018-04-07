import { expect } from 'chai';
import { BrowserGlobalScope, createDom } from '@tecs/test-utils';
import ImageLoader from '../ImageLoader';

describe('ImageLoader', function () {
    let imageLoader: ImageLoader;
    let destroyDom: () => void;

    beforeEach(function () {
        imageLoader = new ImageLoader();
        destroyDom = createDom();
    });

    afterEach(function () {
        destroyDom();
    });

    it('should load each image and hold them in memory by the specified key', async function () {
        await imageLoader.init([
            ['foo', 'https://images/foo.png'],
            ['bar', 'https://images/bar.png'],
        ]);
    });
});
