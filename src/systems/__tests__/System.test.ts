import { expect } from 'chai';
import * as sinon from 'sinon';
import System from '../System';
import { Component } from '../../components';

describe('System', function () {
    class MySystem extends System {
        stub = sinon.stub();

        next(component: Component, timestamp: number) {
            this.stub(component, timestamp);
        }
    }

    class MyComponent extends Component {}

    describe('register', function () {
        it('should register a component with the system', function () {
            const system = new MySystem();
            const component = new MyComponent();
            const timestamp = 0;

            system.register(component);
            system.update(timestamp);

            expect(system.stub.calledOnce).to.be.true;
            expect(system.stub.calledWith(component, timestamp)).to.be.true;
        });
    });

    describe('deregister', function () {
        it('should deregister a component from the system', function () {
            const system = new MySystem();
            const component = new MyComponent();
            const timestamp = 0;

            system.register(component);
            system.deregister(component);
            system.update(timestamp);

            expect(system.stub.called).to.be.false;
        });
    });
});
