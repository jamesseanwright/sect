import { System } from '@tecs/core';
import AutoMoveable from './AutoMoveable';

class AutoMovementSystem extends System<AutoMoveable> {
    protected next(component: AutoMoveable, timestamp: number): void {
        component.positionable.x += component.moveable.xSpeed;
        component.positionable.y += component.moveable.ySpeed;
    }
}

export default AutoMovementSystem;
