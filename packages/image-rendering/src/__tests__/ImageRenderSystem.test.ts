import { expect } from 'chai';
import * as sinon from 'sinon';
import { RectPositionable } from '@sectjs/basics';
import ImageRenderable from '../ImageRenderable';
import createImageRenderSystem from '../imageRenderSystem';

describe('imageRenderSystem', function () {
    describe('next', function () {
        it('should render an image using the associated context', function () {
            const context = {
                drawImage: sinon.stub(),
            };

            const imageLoader = {
                getImage: sinon.stub(),
            };

            const image = {} as any;
            const system = createImageRenderSystem(context as any, imageLoader as any); // TODO: typings
            const positionable = new RectPositionable(10, 20, 30, 40);
            const imageRenderable = new ImageRenderable(positionable, image);

            imageLoader.getImage.returns(image);

            system.register(imageRenderable);
            system.update(0);

            expect(context.drawImage.calledOnceWith(image, 10, 20, 30, 40)).to.be.true;
        });
    });
});
