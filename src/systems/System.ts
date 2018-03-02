import { Component } from '../components';

abstract class System {
    private components: Component[] = [];

    protected abstract next(component: Component, timestamp: number): void;

    register(component: Component) {
        this.components.push(component);
    }

    deregister(component: Component) {
        this.components.splice(this.components.indexOf(component)) // mutating the array for performance
    }

    update(timestamp: number): void {
        for (let component of this.components) {
            this.next(component, timestamp);
        }
    }
}

export default System;
