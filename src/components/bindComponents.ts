import { Component } from '../components';
import System from '../systems/System';
import systemRegistry, { SystemRegistry } from '../systems/systemRegistry';

export const bindComponentsWithRegistry = (registry: SystemRegistry) => (...components: Component[]): void => {
    for (const component of components) {
        const system = registry.get(component.constructor);
        system.register(component);
    }
};

export default bindComponentsWithRegistry(systemRegistry);
