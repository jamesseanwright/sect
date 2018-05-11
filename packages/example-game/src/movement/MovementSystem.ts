import { System } from '@tecs/core';
import Moveable from './Moveable';

class MovementSystem extends System<Moveable> {
    protected next(component: Moveable, timestamp: number): void {
        if (component.keyboardInteractable.isPressed('ArrowUp')) {
            component.positionable.y -= component.ySpeed;
        }

        if (component.keyboardInteractable.isPressed('ArrowDown')) {
            component.positionable.y += component.ySpeed;
        }
    }
}

export default MovementSystem;
