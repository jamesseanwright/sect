import { expect } from 'chai';
import * as sinon from 'sinon';
import MouseInteractable from '../MouseInteractable';

describe('MouseInteractable', function () {
    const button = 0;
    const mouse = { isPressed: sinon.stub(), x: 200, y: 150 };
    const mouseInteractable = new MouseInteractable(mouse as any);

    mouse.isPressed.withArgs(button).returns(true);

    describe('isPressed', function () {
        it('should proxy the mouse abstraction', function () {
            const isPressed = mouseInteractable.isPressed(button);
            expect(isPressed).to.be.true;
        });
    });

    describe('x', function () {
        it('should proxy the mouse abstraction', function () {
            const { x } = mouseInteractable;
            expect(x).to.equal(200);
        });
    });

    describe('y', function () {
        it('should proxy the mouse abstraction', function () {
            const { y } = mouseInteractable;
            expect(y).to.equal(150);
        });
    });
});
