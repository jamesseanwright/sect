import { createSystem } from '@sectjs/core';
import KeyboardMoveable from './KeyboardMoveable';

const createKeyboardMovementSystem = () => (
    createSystem<KeyboardMoveable>('keyboardMover', (timestamp, component) => {
        if (component.keyboardInteractable.isPressed('ArrowUp')) {
            component.positionable.y -= component.moveable.ySpeed;
        }

        if (component.keyboardInteractable.isPressed('ArrowDown')) {
            component.positionable.y += component.moveable.ySpeed;
        }
    })
);

export default createKeyboardMovementSystem;
