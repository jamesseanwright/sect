import { RectPositionable, RectRenderable } from '@sectjs/basics';
import { LinearCollidable } from '@sectjs/collision';
import { Entity, EntityBinder, Game } from '@sectjs/core';
import Moveable from '../movement/Moveable';
import ConstantMoveable from '../movement/ConstantMoveable';
import Bounceable from '../physics/Bounceable';
import StateQueryable from '../state/StateQueryable';

const createBall = (bindEntity: EntityBinder, game: Game) => {
    const positionable = new RectPositionable(200, 200, 10, 10); // TODO: world space, real coords
    const moveable = new Moveable(5, 5); // TODO: replace magic numbers
    const constantMoveable = new ConstantMoveable(positionable, moveable);
    const linearCollidable = new LinearCollidable('paddle', positionable);
    const bounceable = new Bounceable(constantMoveable, linearCollidable, new StateQueryable(game));
    const rectRenderable = new RectRenderable(positionable, 'black');

    return bindEntity(new Entity(constantMoveable, positionable, bounceable, linearCollidable, rectRenderable));
};

export default createBall;
