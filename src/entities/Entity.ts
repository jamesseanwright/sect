import { Component } from '../components';

class Entity {
    public static create(...components: Component[]): Entity {
        return new Entity(components);
    }

    private components: Map<string, Component>;

    // TODO: test
    protected constructor(components: Component[]) {
        this.components = new Map<string, Component>(
            components.map(c => [c.constructor.name, c] as [string, Component]),
        );
    }
}

export default Entity;
