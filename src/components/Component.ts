import Entity from '../entities/Entity';

export abstract class Component {
    abstract get entity(): Entity; // reference to owning entity for cross-component comms
}
