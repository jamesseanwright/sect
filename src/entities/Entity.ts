import { Component } from '../components';
import System from '../systems/System';

// WIP code to prototype component registration
const systemsRegistry = new Map<string, System<Component>>();

const createEntity = (...components: Component[]) => {
    for (const component of components) {
        const system = systemsRegistry.get(component.constructor.name);
        system.register(component);
    }
};

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
