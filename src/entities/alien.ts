import { AutoMoveable, Positionable } from '../components';
import createEntity from './createEntity';

const createAlien = (/* TODO: params */) => {
    const positionable = new Positionable(0, 0, 10, 10); // TODO: reference world size
    const autoMoveable = new AutoMoveable(positionable, 0.1);

    return createEntity(
        positionable,
        autoMoveable,
    );
};

export default createAlien;
