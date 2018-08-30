import { createSystem, createComponentBinder } from '@sectjs/core';
import KeyboardMoveable from './KeyboardMoveable';

// TODO: rename PlayerMovementSystem
const createKeyboardMovementSystem = () => (
    createSystem<KeyboardMoveable>('keyboardMover', (timestamp, { moveable, positionable, keyboardInteractable }) => {
        if (keyboardInteractable.isPressed('a') && moveable.ySpeed < 0.08) { // TODO: store as maxSpeed
            moveable.ySpeed += 0.006; // TODO: store in component as increment
        }

        if (keyboardInteractable.isPressed('ArrowLeft')) {
            positionable.rotation -= moveable.rotationSpeed;
        }

        if (keyboardInteractable.isPressed('ArrowRight')) {
            positionable.rotation += moveable.rotationSpeed;
        }

        if (moveable.ySpeed > 0) {
            moveable.ySpeed -= 0.002;
        }

        positionable.x += moveable.ySpeed * Math.sin(positionable.rotation); // TODO: kill xSpeed!
        positionable.y -= moveable.ySpeed * Math.cos(positionable.rotation);
    })
);

export default createKeyboardMovementSystem;
