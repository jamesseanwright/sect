import Entity from './Entity';
import { Positionable } from '../components';

const createAlien = () => Entity.create(
    new Positionable(0, 0),
);

export default createAlien;
