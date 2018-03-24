import Entity from './Entity';
import { Component } from '../components';
import System from '../systems/System';
import systemRegistry, { SystemRegistry } from '../systems/systemRegistry';

export const bindEntityWithRegistry = (registry: SystemRegistry) => (entity: Entity): void => {
    for (const component of entity.components) {
        const system = registry.get(component.constructor);
        system.register(component);
    }
};

export default bindEntityWithRegistry(systemRegistry);
