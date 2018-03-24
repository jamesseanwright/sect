import { AutoMoveable, Component, Positionable } from '../components';

const SIZE = 10;
const SPEED = 0.5;

const createAlien = (x: number, y: number): Component[] => {
    const positionable = new Positionable(x, y, SIZE, SIZE); // TODO: reference world size
    const autoMoveable = new AutoMoveable(positionable, 0.1);

    return [
        positionable,
        autoMoveable,
    ];
};

export default createAlien;
