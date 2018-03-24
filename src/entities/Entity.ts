import { Component } from '../components';

class Entity {
    private _isActive: boolean;
    private _components: Component[];

    constructor(...components: Component[]) {
        this._components = components;
    }

    public get isActive() {
        return this._isActive;
    }

    public get components() {
        return this._components;
    }
}

export default Entity;
