import { Component } from '../components';

abstract class System {
    private components: Component[] = [];

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

    protected abstract next(component: Component, timestamp: number): void;
}

export default System;
