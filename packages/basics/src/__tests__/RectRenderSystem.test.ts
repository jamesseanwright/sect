import { expect } from 'chai';
import * as sinon from 'sinon';
import RectPositionable from '../RectPositionable';
import RectRenderable from '../RectRenderable';
import RectRenderSystem from '../RectRenderSystem';

describe('RectRenderSystem', function () {
    const context = {
        fillRect: sinon.stub(),
        strokeRect: sinon.stub(),
    };

    const x = 10;
    const y = 20;
    const width = 200;
    const height = 100;
    const fill = 'red';
    const stroke = 'yellow';
    const positionable = new RectPositionable(x, y, width, height);
    let rectRenderSystem;

    beforeEach(function () {
        rectRenderSystem = new RectRenderSystem(context as any);
    });

    afterEach(function () {
        context.fillRect.reset();
        context.strokeRect.reset();
    });

    it('should render a filled rectangle if the component has a fill', function () {
        const rectRenderable = new RectRenderable(positionable, fill);

        rectRenderSystem.register(rectRenderable);
        rectRenderSystem.update(0);

        expect(context.fillRect.calledOnce).to.be.true;
        expect(context.strokeRect.calledOnce).to.be.false;
    });

    it('should render a stroked rectangle if the component has a stroke', function () {
        const rectRenderable = new RectRenderable(positionable, null, stroke);

        rectRenderSystem.register(rectRenderable);
        rectRenderSystem.update(0);

        expect(context.fillRect.calledOnce).to.be.false;
        expect(context.strokeRect.calledOnce).to.be.true;
    });

    it('should render a stroked and filled rectangle if the component has a stroke and a fill', function () {
        const rectRenderable = new RectRenderable(positionable, fill, stroke);

        rectRenderSystem.register(rectRenderable);
        rectRenderSystem.update(0);

        expect(context.fillRect.calledOnce).to.be.true;
        expect(context.strokeRect.calledOnce).to.be.true;
    });
});
