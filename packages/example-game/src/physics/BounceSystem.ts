import { createSystem } from '@sectjs/core';
import { hasRectangularCollision, LinearCollidable } from '@sectjs/collision';
import { Positionable, RectPositionable } from '@sectjs/basics';
import Bounceable from './Bounceable';

const collisions = new Map([
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

const createBounceSystem = () => (
    createSystem<Bounceable>('bouncer', (timestamp, component) => {
        for (const [name, delegate] of collisions) {
            if (component.linearCollidable.hasCollisionWith(name)) {
                delegate(component);
            }
        }
    })
);

export default createBounceSystem;
