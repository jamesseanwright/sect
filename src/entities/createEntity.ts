import { Component } from '../components';
import System from '../systems/System';
import systemRegistry from '../systems/systemRegistry';

const createEntity = (...components: Component[]) => {
    for (const component of components) {
        const system = systemRegistry.get(component.constructor);
        system.register(component);
    }
};

export default createEntity;
