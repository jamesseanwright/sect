import { expect } from 'chai';
import { createDom, StubbedDom } from '@tecs/test-utils';
import Mouse from '../Mouse';

describe('Mouse', function () {
    let mouse: Mouse;
    let stubbedDom: StubbedDom;

    beforeEach(function () {
        stubbedDom = createDom();
        mouse = new Mouse(stubbedDom.browserScope.window);
    });

    afterEach(function () {
        stubbedDom.destroy();
    });

    it('should mark a button as pressed when `mousedown` is dispatched against the target', function () {
        const { window, MouseEvent } = stubbedDom.browserScope;
        const button = 0;

        window.dispatchEvent(new MouseEvent('mousedown', { button }));

        const isPressed = mouse.isPressed(button);

        expect(isPressed).to.be.true;
    });
});
