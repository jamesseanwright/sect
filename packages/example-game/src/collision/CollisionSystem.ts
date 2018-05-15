/* This system is very much a WIP. Because
 * collision logic can differ so greatly between
 * games, I'm currently specifying everything in
 * this one system and a means of determining which
 * parts can be exposed by the collision package */

import { System } from '@tecs/core';
import { LinearCollidable } from '@tecs/collision';
import { Positionable } from '@tecs/basics';

class CollisionSystem extends System<LinearCollidable> {
    private static hasCollision(a: Positionable, b: Positionable) {
        const hasXCollision = a.x >= b.x && a.x <= b.x + b.width;
        const hasYCollision = a.y >= b.y && a.y <= b.y + b.height;

        return hasXCollision && hasYCollision;
    }

    private targets = new Map<LinearCollidable, LinearCollidable[]>();

    protected next(component: LinearCollidable, timestamp: number): void {
        for (const target of this.getTargets(component)) {
            if (CollisionSystem.hasCollision(component.positionable, target.positionable)) {

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
