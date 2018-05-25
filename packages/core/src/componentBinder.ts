import Component from './Component';
import { System } from './createSystem';
import SystemRegistry from './SystemRegistry';

export type ComponentBinder = (...components: Component[]) => Component[];

const createComponentBinder = (registry: SystemRegistry): ComponentBinder => (...components: Component[]) => (
    components.map(component => {
        const system = registry.get(component.constructor);

        if (system) {
            system.register(component);
        }

        return component;
    })
);

export default createComponentBinder;
