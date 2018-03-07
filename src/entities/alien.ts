import { Positionable } from '../components';
import Entity from './Entity';

const createAlien = () => Entity.create(
    new Positionable(0, 0),
);

export default createAlien;
