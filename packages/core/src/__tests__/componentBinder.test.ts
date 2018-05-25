// tslint:disable:max-classes-per-file

import { expect } from 'chai';
import * as sinon from 'sinon';
import createComponentBinder, { ComponentBinder } from '../componentBinder';
import Component from '../Component';
import createSystem, { System } from '../createSystem';
import SystemRegistry from '../SystemRegistry';

describe('componentBinder', function () {
    class Component1 extends Component {}
    class Component2 extends Component {}
    class OrphanedComponent extends Component {}

    const mockSystem = sinon.mock(System.prototype);
    let component1: Component;
    let component2: Component;
    let orphanedComponent: Component;
    let systemRegistry: SystemRegistry;
    let bindComponents: ComponentBinder;

    beforeEach(function () {
        const system1 = createSystem<Component1>('system1', (...args) => undefined);
        const system2 = createSystem<Component2>('system2', (...args) => undefined);
        component1 = new Component1();
        component2 = new Component2();
        orphanedComponent = new OrphanedComponent(); // e.g. Positionable

        systemRegistry = new SystemRegistry([
            [Component1, system1],
            [Component2, system2],
        ]);

        bindComponents = createComponentBinder(systemRegistry);
    });

    afterEach(function () {
        mockSystem.restore();
    });

    it('should register each component of an entity with its associated system', function () {
        const components = [component1, component2, orphanedComponent];

        const expectation = mockSystem.expects('register')
            .twice();

        const boundComponents = bindComponents(...components);

        const [ firstComponent ] = expectation.getCall(0).args;
        const [ secondComponent ] = expectation.getCall(1).args;

        // TODO: mixing of assertion styles is a bit weird
        expect(firstComponent).to.equal(component1);
        expect(secondComponent).to.equal(component2);
        expect(boundComponents).to.deep.equal(components);
        mockSystem.verify();
    });
});
