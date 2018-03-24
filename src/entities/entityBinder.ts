import Entity from './Entity';
import { Component } from '../components';
import System from '../systems/System';
import SystemRegistry from '../systems/SystemRegistry';

const createEntityBinder = (registry: SystemRegistry) => (entity: Entity): Entity => {
    for (const component of entity.components) {
        const system = registry.get(component.constructor);
        system.register(component);
    }

    return entity;
};

export default createEntityBinder;
