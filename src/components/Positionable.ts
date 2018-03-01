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

class Alien extends Entity {
    create(): Entity {
        return Entity.create(
            Positionable, // TODO: parametrise
        );
    }
}

abstract class Component {
    abstract get name(): string;
}

class Positionable extends Component {
    get name(): string {
        return "Positionable";
    }
}
