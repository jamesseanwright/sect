// tslint:disable:max-classes-per-file

import { expect } from 'chai';
import * as sinon from 'sinon';
import { Component } from '../../components';
import System from '../System';

describe('System', function () {
    class MySystem extends System<Component> {
        public stub = sinon.stub();

        public next(component: Component, timestamp: number) {
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
