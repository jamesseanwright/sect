import { System } from '@tecs/core';
import Moveable from './Moveable';

class MovementSystem extends System<Moveable> {
    protected next(component: Moveable, timestamp: number): void {
        if (component.keyboardInteractable.isPressed('ArrowLeft')) {
            component.positionable.x -= component.xSpeed;
        }

        if (component.keyboardInteractable.isPressed('ArrowRight')) {
            component.positionable.x += component.xSpeed;
        }
    }
}

export default MovementSystem;
