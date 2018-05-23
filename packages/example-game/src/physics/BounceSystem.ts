import { System } from '@sectjs/core';
import { hasRectangularCollision, LinearCollidable, LinearCollisionSystem } from '@sectjs/collision';
import { Positionable, RectPositionable } from '@sectjs/basics';
import Bounceable from './Bounceable';

class BounceSystem extends System<Bounceable> {
    private static collisions = new Map([
        ['paddle', (component: Bounceable) => {
            component.constantMoveable.moveable.xSpeed *= -1;
            component.linearCollidable.removeCollisionsWith('paddle');
        }],

        ['edge', (component: Bounceable) => {
            component.constantMoveable.moveable.ySpeed *= -1;
            component.linearCollidable.removeCollisionsWith('edge');
        }],

        ['playerGoal', (component: Bounceable) => {
            component.stateQueryable.setState<number>('computerScore', score => score + 1);

            /* TODO: perhaps this name suggests future collisions won't
             * be acknowledged. Rename to removeEnqueuedCollisions? */
            component.linearCollidable.removeCollisionsWith('playerGoal');
        }],

        ['computerGoal', (component: Bounceable) => {
            component.stateQueryable.setState<number>('playerScore', score => score + 1);
            component.linearCollidable.removeCollisionsWith('computerGoal');
        }],
    ]);

    private static testForCollisions(bounceable: Bounceable) {
        for (const [name, delegate] of BounceSystem.collisions) {
            if (bounceable.linearCollidable.hasCollisionWith(name)) {
                delegate(bounceable);
            }
        }
    }

    protected next(component: Bounceable, timestamp: number): void {
        BounceSystem.testForCollisions(component);
    }
}

export default BounceSystem;
