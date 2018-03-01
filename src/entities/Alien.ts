import Entity from './Entity';
import { Positionable } from '../components';

class Alien extends Entity {
    create(): Entity {
        return Entity.create(
            new Positionable(), // TODO: parametrise
        );
    }
}

export default Alien;
