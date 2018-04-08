import * as sinon from 'sinon';
import { expect } from 'chai';
import { createDom, StubbedDom, StubImage } from '@tecs/test-utils';
import ImageLoader, { ImageDefinition } from '../ImageLoader';

describe('ImageLoader', function () {
    let imageLoader: ImageLoader;
    let stubbedDom: StubbedDom;
    let stubImage: sinon.SinonStubbedInstance<StubImage>;

    beforeEach(function () {
        imageLoader = new ImageLoader();
        stubbedDom = createDom();
        stubImage = sinon.stub(stubbedDom.browserScope.Image.prototype);
    });

    afterEach(function () {
        stubbedDom.destroy();
        stubImage.onload.restore();
        stubImage.onerror.restore();
    });

    it('should load each image and hold them in memory by the specified key', async function () {
        const definitions = [
            ['foo', 'https://images/foo.png'],
            ['bar', 'https://images/bar.png'],
        ] as ImageDefinition[];

        await imageLoader.init(definitions);

        definitions.forEach(([name, expectedSrc]) => {
            const { src } = imageLoader.getImage(name);
            expect(src).to.equal(expectedSrc);
        });
    });
});
