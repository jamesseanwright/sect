import Component from './Component';

class Entity {
    private _isActive: boolean;
    private _components: Component[];

    constructor(...components: Component[]) {
        this._components = components;
    }

    get isActive() {
        return this._isActive;
    }

    set isActive(value: boolean) {
        this._isActive = value;
    }

    get components() {
        return this._components;
    }

    // TODO: test!
    public getComponentByType<T extends Component>(ComponentType: new (...args) => T): T {
        return this._components.find(c => c.constructor === ComponentType) as T;
    }
}

export default Entity;
