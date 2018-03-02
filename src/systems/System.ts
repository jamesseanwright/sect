import { Component } from '../components';

abstract class System {
    private components: Component[];
    protected abstract next(component: Component, timestamp: number): void;

    update(timestamp: number): void {
        for (let component of this.components) {
            this.next(component, timestamp);
        }
    }
}

export default System;
