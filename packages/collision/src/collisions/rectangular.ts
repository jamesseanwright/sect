import { Positionable } from '@tecs/basics';

const hasRectangularCollision = (a: Positionable, b: Positionable) => (
    a.x >= b.x && a.x <= b.x + b.width && a.y >= b.y && a.y <= b.y + b.height
);

export default hasRectangularCollision;
