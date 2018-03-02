import { expect } from 'chai';
import { Component } from '../../components';
import Entity from '../Entity';

describe('Entity', function () {
    describe('getComponent<T>', function () {
        class MyComponent extends Component {}

        it('should return a component instance by its constructor`s name', function () {
            const expectedComponent = new MyComponent();
            const entity = Entity.create(expectedComponent);
            const actualComponent = entity.getComponent<MyComponent>(MyComponent);

            expect(actualComponent).to.equal(expectedComponent);
        });

        it('should throw an error if the component is not associated with the entity', function () {
            const expectedComponent = new MyComponent();
            const entity = Entity.create();

            expect(() => entity.getComponent<MyComponent>(MyComponent)).to.throw(
                "Component MyComponent is not implemented by this entity"
            );
        });
    });
});
