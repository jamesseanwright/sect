// tslint:disable:max-classes-per-file

import { expect } from 'chai';
import * as sinon from 'sinon';
import { Component } from '../../components';
import System from '../../systems/System';
import { SystemRegistry } from '../../systems/systemRegistry';
import { bindComponentsWithRegistry } from '../bindComponents';

describe('bindComponents', function () {
    const createSystem = <T extends Component>(label: string) => new (class extends System<T> {
        public label = label;
        protected next(...args): void {}
    })();

    class Component1 extends Component {}
    class Component2 extends Component {}

    let mockSystem1: sinon.SinonMock;
    let mockSystem2: sinon.SinonMock;
    let component1: Component;
    let component2: Component;
    let systemRegistry: SystemRegistry;
    let bindComponents: (...components: Component[]) => void;

    beforeEach(function () {
        const system1 = createSystem<Component1>('1');
        const system2 = createSystem<Component2>('2');
        mockSystem1 = sinon.mock(system1);
        mockSystem2 = sinon.mock(system2);
        component1 = new Component1();
        component2 = new Component2();

        systemRegistry = new SystemRegistry([
            [Component1, system1],
            [Component2, system2],
        ]);

        bindComponents = bindComponentsWithRegistry(systemRegistry);
    });

    afterEach(function () {
        mockSystem1.restore();
        mockSystem2.restore();
    });

    it('should register each component with its associated system', function () {
        mockSystem1.expects('register')
            .once()
            .withArgs(component1);

        mockSystem2.expects('register')
            .once()
            .withArgs(component2);

        bindComponents(component1, component2);

        mockSystem1.verify();
        mockSystem2.verify();
    });
});
