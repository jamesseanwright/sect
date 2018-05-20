import { System } from '@sectjs/core';
import KeyboardMoveable from './KeyboardMoveable';

class MovementSystem extends System<KeyboardMoveable> { // TODO: rename to KeyboardMovementSystem
    protected next(component: KeyboardMoveable, timestamp: number): void {
        if (component.keyboardInteractable.isPressed('ArrowUp')) {
            component.positionable.y -= component.moveable.ySpeed;
        }

        if (component.keyboardInteractable.isPressed('ArrowDown')) {
            component.positionable.y += component.moveable.ySpeed;
        }
    }
}

export default MovementSystem;
