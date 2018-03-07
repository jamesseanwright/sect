import { Component } from '../components';

abstract class System {
    private componentType: typeof Component;
    private components: Component[] = [];

    constructor(componentType: typeof Component) {
        this.componentType = componentType;
    }

    public register(component: Component) {
        this.components.push(component);
    }

    public deregister(component: Component) {
        // mutating the array for performance
        this.components.splice(this.components.indexOf(component));
    }

    public update(timestamp: number): void {
        for (const component of this.components) {
            this.next(component, timestamp);
        }
    }

    public getComponentType(): typeof Component {
        return this.componentType;
    }

    protected abstract next(component: Component, timestamp: number): void;
}

export default System;
