import { Component } from '../components';
import System from '../systems/System';
import systemRegistry, { SystemRegistry } from '../systems/systemRegistry';

const createEntity = (...components: Component[]): void => createEntityWithRegistry(systemRegistry, ...components);

// TODO: find better way to inject single system registry
export const createEntityWithRegistry = (registry: SystemRegistry, ...components: Component[]): void => {
    for (const component of components) {
        const system = registry.get(component.constructor);
        system.register(component);
    }
};

export default createEntity;
