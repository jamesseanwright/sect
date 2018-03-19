import { Component } from '../components';
import System from '../systems/System';

class Entity {
    public static create(...components: Component[]): Entity {
        return new Entity(components);
    }

    private components: Map<string, Component>;

    private constructor(components: Component[]) {
        this.components = new Map<string, Component>(
            components.map(c => [c.constructor.name, c] as [string, Component]),
        );
    }
}

export default Entity;
