import { expect } from 'chai';
import * as sinon from 'sinon';
import { RectPositionable } from '@tecs/basics';
import LinearCollidable from '../LinearCollidable';

describe('LinearCollidable', function () {
    describe('addCollision', function () {
        it('should add a target collidable to the parent instance', function () {
            const targetName = 'bar';
            const collidable = new LinearCollidable('foo', new RectPositionable(0, 0, 1, 1));
            const target = new LinearCollidable(targetName, new RectPositionable(0, 0, 1, 1));

            collidable.addCollision(target);

            expect(collidable.hasCollisionWith(targetName)).to.be.true;
        });
    });

    describe('removeCollisionsWith', function () {
        it('should remove all collisions by name', function () {
            const collidable = new LinearCollidable('foo', new RectPositionable(0, 0, 1, 1));

            const targets = ['bar', 'bar', 'baz', 'baz', 'baz', 'qux'].map(
                name => new LinearCollidable(name, new RectPositionable(0, 0, 1, 1)),
            );

            targets.forEach(target => collidable.addCollision(target));
            collidable.removeCollisionsWith('baz');

            expect(collidable.hasCollisionWith(targetName)).to.be.true;
        });
    });
});
