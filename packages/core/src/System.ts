import Component from './Component';

abstract class System<T extends Component> {
    private _components: T[] = [];

    protected get components(): T[] {
        return this._components;
    }

    public register(component: T) {
        this._components.push(component);
    }

    public deregister(component: T) {
        // mutating the array for performance
        this._components.splice(this._components.indexOf(component));
    }

    public update(timestamp: number): void {
        for (const component of this._components) {
            this.next(component, timestamp);
        }
    }

    protected abstract next(component: T, timestamp: number): void;
}

export default System;
