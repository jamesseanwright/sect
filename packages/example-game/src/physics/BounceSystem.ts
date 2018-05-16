/* This system is very much a WIP. Because
 * collision logic can differ so greatly between
 * games, I'm currently specifying everything in
 * this one system and a means of determining which
 * parts can be exposed by the collision package */

import { System } from '@tecs/core';
import { hasRectangularCollision, LinearCollidable, LinearCollisionSystem } from '@tecs/collision';
import { Positionable, RectPositionable } from '@tecs/basics';
import Bounceable from './Bounceable';

class BounceSystem extends System<Bounceable> {
    protected next(component: Bounceable, timestamp: number): void {
        throw new Error('Method not implemented.');
    }
}
