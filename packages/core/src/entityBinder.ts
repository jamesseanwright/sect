import Entity from './Entity';
import Component from './Component';
import System from './System';
import SystemRegistry from './SystemRegistry';

const createEntityBinder = (registry: SystemRegistry) => (entity: Entity): Entity => {
    for (const component of entity.components) {
        const system = registry.get(component.constructor);
        system.register(component);
    }

    return entity;
};

export default createEntityBinder;
