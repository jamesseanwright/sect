import { expect } from 'chai';
import { createDom, StubbedDom } from '@tecs/test-utils';
import Mouse from '../Mouse';

describe('Mouse', function () {
    let mouse: Mouse;
    let stubbedDom: StubbedDom;
    let eventTarget: HTMLElement;

    beforeEach(function () {
        stubbedDom = createDom();
        eventTarget = stubbedDom.browserScope.window.document.body;
        mouse = new Mouse(eventTarget);
    });

    afterEach(function () {
        stubbedDom.destroy();
    });

    it('should mark a button as pressed when `mousedown` is dispatched against the target', function () {
        const { MouseEvent } = stubbedDom.browserScope;
        const button = 0;

        eventTarget.dispatchEvent(new MouseEvent('mousedown', { button }));

        const isPressed = mouse.isPressed(button);

        expect(isPressed).to.be.true;
    });

    it('should not mark a button as pressed when `mouseup` is dispatched against the target', function () {
        const { MouseEvent } = stubbedDom.browserScope;
        const button = 0;

        eventTarget.dispatchEvent(new MouseEvent('mousedown', { button }));
        eventTarget.dispatchEvent(new MouseEvent('mouseup', { button }));

        const isPressed = mouse.isPressed(button);

        expect(isPressed).to.be.false;
    });

    it('should not mark a button as pressed when it has not yet been pressed', function () {
        const { MouseEvent } = stubbedDom.browserScope;
        const button = 0;
        const isPressed = mouse.isPressed(button);

        expect(isPressed).to.be.false;
    });

    it('should track the mouse position relative to the event target', function () {
        const { MouseEvent } = stubbedDom.browserScope;
        const clientX = 200;
        const clientY = 150;

        eventTarget.dispatchEvent(new MouseEvent('mousemove', { clientX, clientY }));

        expect(mouse.x).to.equal(clientX);
        expect(mouse.y).to.equal(clientY);
    });
});
