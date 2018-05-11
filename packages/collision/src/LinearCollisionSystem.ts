import { System } from '@tecs/core';
import LinearCollidable from './LinearCollidable';

class LinearCollisionSystem extends System<LinearCollidable> {
    protected next(component: LinearCollidable, timestamp: number): void {
        for (const target of component.collisionTargets) {
            const hasXCollision = component.positionable.x >= target.positionable.x
                && component.positionable.x <= target.positionable.x + target.positionable.width;

            const hasYCollision = component.positionable.y >= target.positionable.y
                && component.positionable.y <= target.positionable.y + target.positionable.height;

            if (hasXCollision && hasYCollision) {
                // TODO
            }
        }
    }
}
