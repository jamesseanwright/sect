import { expect } from 'chai';
import * as sinon from 'sinon';
import KeyboardInteractable from '../KeyboardInteractable';

describe('KeyboardInteractable', function () {
    it('should proxy the keyboard abstraction', function () {
        const key = 'a';
        const keyboard = { isPressed: sinon.stub() };
        const keyboardInteractable = new KeyboardInteractable(keyboard as any);

        keyboard.isPressed.withArgs(key).returns(true);
        const isPressed = keyboardInteractable.isPressed(key);

        expect(isPressed).to.be.true;
    });
});
