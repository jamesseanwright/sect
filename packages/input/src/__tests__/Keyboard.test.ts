import { expect } from 'chai';
import { createDom, StubbedDom } from '@tecs/test-utils';
import Keyboard from '../Keyboard';

describe('Keyboard', function () {
    let stubbedDom: StubbedDom;

    beforeEach(function () {
        stubbedDom = createDom();
    });

    afterEach(function () {
        stubbedDom.destroy();
    });

    it('should mark a key as pressed when `keydown` is dispatched against the window', function () {
        const { window, KeyboardEvent } = stubbedDom.browserScope;
        const key = 'a';
        const keyboard = new Keyboard();

        window.dispatchEvent(new KeyboardEvent('keydown', { key }));

        const isPressed = keyboard.isPressed(key);

        expect(isPressed).to.be.true;
    });

    it('should mark a key as not pressed when `keyup` is dispatched against the window', function () {
        const { window, KeyboardEvent } = stubbedDom.browserScope;
        const key = 'a';
        const keyboard = new Keyboard();

        window.dispatchEvent(new KeyboardEvent('keydown', { key }));
        window.dispatchEvent(new KeyboardEvent('keyup', { key }));

        const isPressed = keyboard.isPressed(key);

        expect(isPressed).to.be.false;
    });

    it('should ignore keys for which it isn`t configured to listen', function () {
        const { window, KeyboardEvent } = stubbedDom.browserScope;
        const key = 'x';
        const keyboard = new Keyboard();

        window.dispatchEvent(new KeyboardEvent('keydown', { key }));

        const isPressed = keyboard.isPressed(key);

        expect(isPressed).to.be.false;
    });

    it('should treat single-letter keys as case-insensitive', function () {
        const { window, KeyboardEvent } = stubbedDom.browserScope;
        const key = 'A';
        const keyboard = new Keyboard();

        window.dispatchEvent(new KeyboardEvent('keydown', { key }));

        const isPressed = keyboard.isPressed(key);

        expect(isPressed).to.be.true;
    });

    it('should treat special key names as case-sensitive', function () {
        const { window, KeyboardEvent } = stubbedDom.browserScope;
        const key = 'ArrowLeft';
        const keyboard = new Keyboard();

        window.dispatchEvent(new KeyboardEvent('keydown', { key }));

        const isPressed = keyboard.isPressed(key);

        expect(isPressed).to.be.true;
    });

    it('should support an optional array of custom supported keys', function () {
        const { window, KeyboardEvent } = stubbedDom.browserScope;
        const key = 'p';
        const keyboard = new Keyboard([key]);

        window.dispatchEvent(new KeyboardEvent('keydown', { key }));

        const isPressed = keyboard.isPressed(key);

        expect(isPressed).to.be.true;
    });
});
