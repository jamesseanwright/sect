import { System } from '@sectjs/core';
import { hasRectangularCollision, LinearCollidable, LinearCollisionSystem } from '@sectjs/collision';
import { Positionable, RectPositionable } from '@sectjs/basics';
import Bounceable from './Bounceable';

class BounceSystem extends System<Bounceable> {
    protected next(component: Bounceable, timestamp: number): void {
        if (component.linearCollidable.hasCollisionWith('paddle')) {
            component.constantMoveable.moveable.xSpeed *= -1;
            component.linearCollidable.removeCollisionsWith('paddle');
        }

        if (component.linearCollidable.hasCollisionWith('edge')) {
            component.constantMoveable.moveable.ySpeed *= -1;
            component.linearCollidable.removeCollisionsWith('edge');
        }
    }
}

export default BounceSystem;
