import { Component } from '../components';

class Entity {
    public static create(...components: Component[]): Entity {
        return new Entity(components);
    }

    private components: Map<string, Component>;

    protected constructor(components: Component[]) {
        this.components = new Map<string, Component>(
            components.map(c => [c.constructor.name, c] as [string, Component]),
        );
    }

    public getComponent<T extends Component>(ComponentConstructor: typeof Component): T {
        const { name } = ComponentConstructor;

        if (!this.components.has(name)) {
            throw new Error(`Component ${name} is not implemented by this entity`);
        }

        return this.components.get(name) as T;
    }
}

export default Entity;
