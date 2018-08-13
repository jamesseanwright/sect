import { expect } from 'chai';
import * as sinon from 'sinon';
import { System } from '@sectjs/core';
import RectPositionable from '../RectPositionable';
import TextRenderable from '../TextRenderable';
import createTextRenderSystem from '../textRenderSystem';

describe('textRenderSystem', function () {
    const context = {
        font: '',
        fillText: sinon.stub(),
        strokeText: sinon.stub(),
    };

    const x = 10;
    const y = 20;
    const width = 200;
    const height = 100;
    const fill = 'red';
    const stroke = 'yellow';
    const positionable = new RectPositionable(x, y, width, height);
    let textRenderSystem: System<TextRenderable>;

    beforeEach(function () {
        textRenderSystem = createTextRenderSystem(context as any);
    });

    afterEach(function () {
        context.font = '';
        context.fillText.reset();
        context.strokeText.reset();
    });

    it('should compute a valid font property from the specified font family and size', function () {
        const textRenderable = new TextRenderable('Foo', 'Arial', 10, positionable, fill);

        textRenderSystem.register(textRenderable);
        textRenderSystem.update(0);

        expect(context.font).to.equal('10px Arial');
    });

    it('should render filled text if the component has a fill', function () {
        const textRenderable = new TextRenderable('Foo', 'Arial', 10, positionable, fill);

        textRenderSystem.register(textRenderable);
        textRenderSystem.update(0);

        expect(context.fillText.calledOnce).to.be.true;
        expect(context.strokeText.calledOnce).to.be.false;
    });

    it('should render stroked stroked text if the component has a stroke', function () {
        const textRenderable = new TextRenderable('Foo', 'Arial', 10, positionable, null, stroke);

        textRenderSystem.register(textRenderable);
        textRenderSystem.update(0);

        expect(context.fillText.calledOnce).to.be.false;
        expect(context.strokeText.calledOnce).to.be.true;
    });

    it('should render stroked and filled text if the component has a stroke and a fill', function () {
        const textRenderable = new TextRenderable('Foo', 'Arial', 10, positionable, fill, stroke);

        textRenderSystem.register(textRenderable);
        textRenderSystem.update(0);

        expect(context.fillText.calledOnce).to.be.true;
        expect(context.strokeText.calledOnce).to.be.true;
    });
});
