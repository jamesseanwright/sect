import Entity from '../entities/Entity';
import System from '../systems/System';

export abstract class Component {
    public static setSystem(system: System): void {
        this.system = system;
    }

    private static system: System;

    constructor() {
        Component.system.register(this);
    }
}
