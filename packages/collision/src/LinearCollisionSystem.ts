import { System } from '@sectjs/core';
import { Positionable } from '@sectjs/basics';
import LinearCollidable from './LinearCollidable';
import { CollisionPredicate } from '.';

class LinearCollisionSystem extends System<LinearCollidable> {
    private targets = new Map<LinearCollidable, LinearCollidable[]>();

    private hasCollision: CollisionPredicate;

    constructor(hasCollision: CollisionPredicate) {
        super();
        this.hasCollision = hasCollision;
    }

    public register(component: LinearCollidable): void {
        super.register(component);
        this.targets.clear(); // invalidate memoisation to include new targets in collision checks
    }

    public deregister(component: LinearCollidable): void {
        super.deregister(component);
        this.targets.clear(); // invalidate memoisation to include new targets in collision checks
    }

    protected next(component: LinearCollidable, timestamp: number): void {
        for (const target of this.getTargets(component)) {
            if (this.hasCollision(component.positionable, target.positionable)) {
                component.addCollision(target);
                target.addCollision(component);
            }
        }
    }

    // Memoising target access for each registered component to boost performance
    private getTargets(collidable: LinearCollidable): LinearCollidable[] {
        if (!this.targets.has(collidable)) {
            const targets = this.components.filter(c => c !== collidable);
            this.targets.set(collidable, targets);
        }

        return this.targets.get(collidable);
    }
}

export default LinearCollisionSystem;
