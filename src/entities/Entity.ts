import { Component } from '../components';

class Entity {
    private components: Map<string, Component>;

    protected constructor(components: Component[]) {
        this.components = new Map<string, Component>(
            components.map(c => [c.name, c] as [string, Component])
        );
    }

    static create(...components: Component[]): Entity {
        const entity = new Entity(components);
        return entity;
    }
}

export default Entity;
