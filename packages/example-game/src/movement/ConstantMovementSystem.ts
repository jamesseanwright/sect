import { System } from '@sectjs/core';
import ConstantMoveable from './ConstantMoveable';

class ConstantMovementSystem extends System<ConstantMoveable> {
    protected next(component: ConstantMoveable, timestamp: number): void {
        component.positionable.x += component.moveable.xSpeed;
        component.positionable.y += component.moveable.ySpeed;
    }
}

export default ConstantMovementSystem;
