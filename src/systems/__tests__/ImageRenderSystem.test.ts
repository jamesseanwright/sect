import { expect } from 'chai';
import * as sinon from 'sinon';
import { ImageRenderable, Positionable } from '../../components';
import ImageRenderSystem from '../ImageRenderSystem';

describe('ImageRenderSystem', function () {
    describe('next()', function () {
        it('should render an image using the associated context', function () {
            const context = {
                drawImage: sinon.stub(),
            };

            const image = {} as any;
            const system = new ImageRenderSystem(context as any);
            const positionable = new Positionable(10, 20, 30, 40);
            const imageRenderable = new ImageRenderable(positionable, image);

            system.register(imageRenderable);
            system.update(0);

            expect(context.drawImage.calledOnceWith(image, 10, 20, 30, 40)).to.be.true;
        });
    });
});
