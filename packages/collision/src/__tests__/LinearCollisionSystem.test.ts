import { expect } from 'chai';
import { Positionable, RectPositionable } from '@sectjs/basics';
import LinearCollidable from '../LinearCollidable';
import createLinearCollisionSystem from '../linearCollisionSystem';

describe('linearCollisionSystem', function () {
    it('should mark colliding components as having a collision with one another', function () {
        const hasCollision = (a: Positionable, b: Positionable) => true;
        const collisionSystem = createLinearCollisionSystem(hasCollision);
        const aCollidable = new LinearCollidable('aCollidable', new RectPositionable(0, 0, 1, 1));
        const bCollidable = new LinearCollidable('bCollidable', new RectPositionable(0, 0, 1, 1));

        collisionSystem.register(aCollidable);
        collisionSystem.register(bCollidable);
        collisionSystem.update(0);

        expect(aCollidable.hasCollisionWith('bCollidable')).to.be.true;
        expect(bCollidable.hasCollisionWith('aCollidable')).to.be.true;
    });

    it('should not mark components that are not colliding', function () {
        const hasCollision = (a: Positionable, b: Positionable) => false;
        const collisionSystem = createLinearCollisionSystem(hasCollision);
        const aCollidable = new LinearCollidable('aCollidable', new RectPositionable(0, 0, 1, 1));
        const bCollidable = new LinearCollidable('bCollidable', new RectPositionable(0, 0, 1, 1));

        collisionSystem.register(aCollidable);
        collisionSystem.register(bCollidable);
        collisionSystem.update(0);

        expect(aCollidable.hasCollisionWith('bCollidable')).to.be.false;
        expect(bCollidable.hasCollisionWith('aCollidable')).to.be.false;
    });
});
