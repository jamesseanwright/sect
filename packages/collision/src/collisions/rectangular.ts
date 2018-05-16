import { RectPositionable } from '@tecs/basics';

const hasRectangularCollision = (a: RectPositionable, b: RectPositionable) => (
    a.x >= b.x && a.x <= b.x + b.width && a.y >= b.y && a.y <= b.y + b.height
);

export default hasRectangularCollision;
