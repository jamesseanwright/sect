import { Component } from '../components';

class Entity {
    private components: Map<string, Component>;

    protected constructor(components: Component[]) {
        this.components = new Map<string, Component>(
            components.map(c => [c.constructor.name, c] as [string, Component])
        );
    }

    getComponent<T extends Component>(ComponentConstructor: Function): T {
        const { name } = ComponentConstructor;

        if (!this.components.has(name)) {
            throw new Error(`Component ${name} is not implemented by this entity`);
        }

        return this.components.get(name) as T;
    }

    static create(...components: Component[]): Entity {
        return new Entity(components);
    }
}

export default Entity;
