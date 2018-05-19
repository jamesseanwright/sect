import { Positionable } from '@sectjs/basics';

export type CollisionPredicate = (a: Positionable, b: Positionable) => boolean;

export { default as hasRectangularCollision } from './rectangular';
