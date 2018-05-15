import { Positionable } from '@tecs/basics';
import hasRectangularCollision from './rectangular';

type CollisionPredicate = (a: Positionable, b: Positionable) => boolean;

export default CollisionPredicate;
