import { expect } from 'chai';
import { createDom, StubbedDom } from '@sectjs/test-utils';
import ImageLoader, { ImageDefinition } from '../ImageLoader';

describe('ImageLoader', function () {
    let imageLoader: ImageLoader;
    let stubbedDom: StubbedDom;

    beforeEach(function () {
        imageLoader = new ImageLoader();
        stubbedDom = createDom();
    });

    afterEach(function () {
        stubbedDom.destroy();
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

    it('should reject initialisation with an error if an image fails to load', async function () {
        const expectedMessage = `Couldn't load https://error`;

        await imageLoader.init([
            ['foo', 'https://error'],
        ]).catch(({ message }) => {
            expect(message).to.equal(expectedMessage);
        });
    });

    it('should throw an error if the requested image does`nt exist', async function () {
        const name = 'foo';
        const expectedError = `Image ${name} not found in ImageLoader`;

        await imageLoader.init([]);

        expect(() => imageLoader.getImage(name)).to.throw(expectedError);
    });
});
