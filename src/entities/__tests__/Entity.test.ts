import { expect } from 'chai';
import { Component } from '../../components';
import Entity from '../Entity';

describe('Entity', function () {
    describe('getComponent<T>', function () {
        class MyComponent extends Component {
            get name() {
                return "MyComponent";
            }
        }

        it('should return a component instance by its name', function () {
            const expectedComponent = new MyComponent();
            const entity = Entity.create(expectedComponent);
            const actualComponent = e
        });
    });
});
