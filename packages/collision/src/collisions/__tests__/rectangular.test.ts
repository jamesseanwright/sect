import { expect } from 'chai';
import { RectPositionable } from '@sectjs/basics';
import hasRectangularCollision from '../rectangular';

describe('hasRectangularCollision', function () {
    it('should return true when two RectPositionables are colliding', function () {
        const aPositionable = new RectPositionable(10, 10, 50, 50);
        const bPositionable = new RectPositionable(40, 30, 50, 50);
        const hasCollision = hasRectangularCollision(aPositionable, bPositionable);

        expect(hasCollision).to.be.true;
    });

    it('should return false when two RectPositionables are not colliding', function () {
        const aPositionable = new RectPositionable(10, 10, 50, 50);
        const bPositionable = new RectPositionable(61, 61, 50, 50);
        const hasCollision = hasRectangularCollision(aPositionable, bPositionable);

        expect(hasCollision).to.be.false;
    });
});
