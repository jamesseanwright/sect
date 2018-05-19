import { RectPositionable } from '@sectjs/basics';

const isWithinBounds = (a: RectPositionable, b: RectPositionable) => (
    a.x >= b.x && a.x <= b.x + b.width && a.y >= b.y && a.y <= b.y + b.height
);

const hasRectangularCollision = (a: RectPositionable, b: RectPositionable) => (
    isWithinBounds(a, b) || isWithinBounds(b, a)
);

export default hasRectangularCollision;
