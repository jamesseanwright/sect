// tslint:disable:max-classes-per-file

import { expect } from 'chai';
import * as sinon from 'sinon';
import { Component } from '../../components';
import System from '../../systems/System';
import { SystemRegistry } from '../../systems/systemRegistry';
import { createEntityWithRegistry } from '../createEntity';

describe('createEntity', function () {
    const createSystem = <T extends Component>() => new (class extends System<T> {
        protected next(...args): void {}
    })();

    it('should register each component with its associated system', function () {
        class Component1 extends Component {}
        class Component2 extends Component {}
        const system1 = createSystem<Component1>();
        const system2 = createSystem<Component2>();
        const component1 = new Component1();
        const component2 = new Component2();

        const systemRegistry = new SystemRegistry([
            [Component1, system1],
            [Component2, system2],
        ]);

        /* a void function that invokes systems isn't the most
         * intuitive pattern. I will replace this with a more
         * natural contract when figure out the best way to
         * structure the required dependencies.
         */
        createEntityWithRegistry(
            systemRegistry,
            component1,
            component2,
        );

        throw new Error('Awaiting assertions');
    });
});
