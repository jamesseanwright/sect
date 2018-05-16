import { System } from '@tecs/core';
import { Positionable } from '@tecs/basics';
import LinearCollidable from './LinearCollidable';

abstract class LinearCollisionSystem extends System<LinearCollidable> {
    private targets = new Map<LinearCollidable, LinearCollidable[]>();

    public register(component: LinearCollidable): void {
        super.register(component);
        this.targets.clear();
    }

    public deregister(component: LinearCollidable): void {
        super.deregister(component);
        this.targets.clear();
    }

    protected abstract hasCollision(a: Positionable, b: Positionable): boolean;
    protected abstract onCollision(a: Positionable, b: Positionable): void;

    protected next(component: LinearCollidable, timestamp: number): void {
        for (const target of this.getTargets(component)) {
            if (this.hasCollision(component.positionable, target.positionable)) {
                this.onCollision(component.positionable, target.positionable);
            }
        }
    }

    private getTargets(collidable: LinearCollidable): LinearCollidable[] {
        if (!this.targets.has(collidable)) {
            const targets = this.components.filter(c => c !== collidable);
            this.targets.set(collidable, targets);
        }

        return this.targets.get(collidable);
    }
}

export default LinearCollisionSystem;
