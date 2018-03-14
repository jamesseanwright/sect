import { AutoMoveable, Positionable } from '../components';
import Entity from './Entity';

const createAlien = () => {
    const positionable = new Positionable(0, 0, 10, 10); // TODO: reference world size
    const autoMoveable = new AutoMoveable(positionable, 0.1);

    return Entity.create(
        positionable,
        autoMoveable,
    );
};

export default createAlien;
