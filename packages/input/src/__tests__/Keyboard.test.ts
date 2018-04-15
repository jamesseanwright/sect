import { expect } from 'chai';
import { createDom, StubbedDom } from '@tecs/test-utils';
import Keyboard from '../Keyboard';

describe('Keyboard', function () {
    let keyboard: Keyboard;
    let stubbedDom: StubbedDom;

    beforeEach(function () {
        stubbedDom = createDom();
        keyboard = new Keyboard();
    });

    afterEach(function () {
        stubbedDom.destroy();
    });

    it('should mark a key as pressed when `keydown` is dispatched against the window', function () {
        const { window, KeyboardEvent } = stubbedDom.browserScope;
        const key = 'a';

        window.dispatchEvent(new KeyboardEvent('keydown', { key }));

        const isPressed = keyboard.isPressed(key);

        expect(isPressed).to.be.true;
    });

    it('should not mark a key as pressed if it hasn`t been fired by a keydown event', function () {
        const { window, KeyboardEvent } = stubbedDom.browserScope;
        const key = 'a';

        const isPressed = keyboard.isPressed(key);

        expect(isPressed).to.be.false;
    });

    it('should not mark a key as pressed when `keyup` is dispatched against the window', function () {
        const { window, KeyboardEvent } = stubbedDom.browserScope;
        const key = 'a';

        window.dispatchEvent(new KeyboardEvent('keydown', { key }));
        window.dispatchEvent(new KeyboardEvent('keyup', { key }));

        const isPressed = keyboard.isPressed(key);

        expect(isPressed).to.be.false;
    });

    it('should treat single-letter keys as case-insensitive', function () {
        const { window, KeyboardEvent } = stubbedDom.browserScope;
        const key = 'A';

        window.dispatchEvent(new KeyboardEvent('keydown', { key }));

        const isPressed = keyboard.isPressed(key);

        expect(isPressed).to.be.true;
    });

    it('should treat special key names as case-sensitive', function () {
        const { window, KeyboardEvent } = stubbedDom.browserScope;
        const key = 'ArrowLeft';

        window.dispatchEvent(new KeyboardEvent('keydown', { key }));

        const isPressed = keyboard.isPressed(key);

        expect(isPressed).to.be.true;
    });
});
