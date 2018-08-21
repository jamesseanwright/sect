import { createSystem } from '@sectjs/core';
import KeyboardMoveable from './KeyboardMoveable';

const createKeyboardMovementSystem = () => (
    createSystem<KeyboardMoveable>('keyboardMover', (timestamp, component) => {
        if (component.keyboardInteractable.isPressed('a')) {
            component.positionable.y -= component.moveable.ySpeed;
        }

        if (component.keyboardInteractable.isPressed('ArrowLeft')) {
            component.positionable.rotation -= component.moveable.rotationSpeed;
        }

        if (component.keyboardInteractable.isPressed('ArrowRight')) {
            component.positionable.rotation += component.moveable.rotationSpeed;
        }
    })
);

export default createKeyboardMovementSystem;
