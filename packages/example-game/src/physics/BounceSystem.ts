import { System } from '@tecs/core';
import { hasRectangularCollision, LinearCollidable, LinearCollisionSystem } from '@tecs/collision';
import { Positionable, RectPositionable } from '@tecs/basics';
import Bounceable from './Bounceable';

class BounceSystem extends System<Bounceable> {
    protected next(component: Bounceable, timestamp: number): void {
        if (component.linearCollidable.hasCollisionWith('paddle')) {
            component.autoMoveable.moveable.xSpeed *= -1;
            component.linearCollidable.removeCollisionsWith('paddle');
        }

        if (component.linearCollidable.hasCollisionWith('edge')) {
            component.autoMoveable.moveable.ySpeed *= -1;
            component.linearCollidable.removeCollisionsWith('edge');
        }
    }
}

export default BounceSystem;
