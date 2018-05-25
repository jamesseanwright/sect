import { createSystem } from '@sectjs/core';
import ConstantMoveable from './ConstantMoveable';

const createConstantMovementSystem = () => (
    createSystem<ConstantMoveable>('constantMover', (timestamp, component) => {
        component.positionable.x += component.moveable.xSpeed;
        component.positionable.y += component.moveable.ySpeed;
    })
);

export default createConstantMovementSystem;
