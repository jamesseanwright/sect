import Entity from './Entity';
import Component from './Component';
import System from './System';
import SystemRegistry from './SystemRegistry';

export type EntityBinder = (entity: Entity) => Entity;

const createEntityBinder = (registry: SystemRegistry): EntityBinder => (entity: Entity): Entity => {
    for (const component of entity.components) {
        const system = registry.get(component.constructor);

        if (system) {
            system.register(component);
        }
    }

    return entity;
};

export default createEntityBinder;
