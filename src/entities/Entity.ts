import { Component } from '../components';

class Entity {
    private _isActive: boolean;
    private _components: Component[];

    constructor(...components: Component[]) {
        this._components = components;
    }

    get isActive() {
        return this._isActive;
    }

    get components() {
        return this._components;
    }
}

export default Entity;
