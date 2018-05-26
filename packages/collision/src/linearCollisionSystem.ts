import { createSystem, System } from '@sectjs/core';
import { Positionable } from '@sectjs/basics';
import LinearCollidable from './LinearCollidable';
import { CollisionPredicate } from '.';

const createLinearCollisionSystem = (hasCollision: CollisionPredicate) => (
    createSystem<LinearCollidable>('linearCollider', (timestamp, component, ...targets) => {
        for (const target of targets) {
            if (hasCollision(component.positionable, target.positionable)) {
                component.addCollision(target);
                target.addCollision(component);
            }
        }
    })
);

export default createLinearCollisionSystem;
