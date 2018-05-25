// tslint:disable:max-classes-per-file

import { expect } from 'chai';
import * as sinon from 'sinon';
import Component from '../Component';
import createSystem, { System } from '../createSystem';

describe('createSystem', function () {
    const nextStub = sinon.stub();
    let system: System<MyComponent>;

    class MyComponent extends Component {}

    beforeEach(function () {
        system = createSystem('mySystem', (...args) => nextStub(...args));
    });

    afterEach(function () {
        nextStub.resetHistory();
    });

    describe('register', function () {
        it('should register a component with the system', function () {
            const component = new MyComponent();
            const timestamp = 0;

            system.register(component);
            system.update(timestamp);

            expect(nextStub.calledOnce).to.be.true;
            expect(nextStub.calledWith(timestamp, component)).to.be.true;
        });
    });

    describe('deregister', function () {
        it('should deregister a component from the system', function () {
            const component = new MyComponent();
            const timestamp = 0;

            system.register(component);
            system.deregister(component);
            system.update(timestamp);

            expect(nextStub.called).to.be.false;
        });
    });

    describe('next', function () {
        it('should be called when system is updated, with the correct arguments', function () {
            const components = [new MyComponent(), new MyComponent(), new MyComponent()];
            const [nextComponent] = components;
            const otherComponents = components.filter(c => c !== nextComponent);
            const timestamp = 0;

            components.forEach(c => system.register(c));

            system.update(timestamp);

            expect(nextStub.firstCall.calledWith(timestamp, nextComponent, ...otherComponents)).to.be.true;
        });
    });
});
